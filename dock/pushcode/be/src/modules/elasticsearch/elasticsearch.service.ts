import { Inject, Injectable, Module } from '@nestjs/common';
import { Client } from 'es7';
import * as fs from 'fs';
import * as path from 'path';
import { flatMap } from 'lodash';

import { FuncHelper } from '../../utils/commonLang/helper';
import config from 'config';
import { ILM } from './services/ILM';
import QAQ from 'src/utils/data/QAQ';
// import { AiService } from '../ai/ai.service';

@Injectable()
export class ElasticsearchService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      //  nodes: 'http://localhost:9200',
      nodes: 'http://124.221.135.239:3105',
    }); // Initialize the Elasticsearch client
  }

  // Implement methods to interact with Elasticsearch, e.g., search, index, delete, etc.

  async templates() {
    const h = ['name', 'index_patterns'];
    try {
      const templates = await this.client.cat.templates({
        name: '',
        h,
      });
      if (templates && templates.statusCode === 200) {
        const body = templates.body;
        const bodyArr = FuncHelper.matrixToArr(body, h);
        return bodyArr;
      } else {
        return [];
      }
    } catch (e) {
      console.log(`[Templates]: cat error!`, e);
    }
  }

  async aliases() {
    const h = ['alias', 'index'];
    try {
      const aliases = await this.client.cat.aliases({
        h,
      });
      if (aliases && aliases.statusCode === 200) {
        const body = aliases.body;
        const bodyArr = FuncHelper.matrixToArr(body, h);
        return bodyArr;
      }
    } catch (e) {
      console.log(`[Index aliases]: error`, e);
    }
  }

  async isIndexExists(index) {
    const { body } = await this.client.indices.exists({
      index,
    });
    return body;
  }

  async indexDeleteAlias(index) {
    try {
      const idaRes = await this.client.indices.deleteAlias(
        Object.assign(
          {},
          {
            index,
            name: '*',
          },
        ),
      );
      if (idaRes && idaRes.statusCode === 200) {
        console.log(`[Index delete alias]: deleted!`, idaRes.body);
      } else {
        console.log(`[Index delete alias]: other codes!`, idaRes.body);
      }
    } catch (e) {
      console.log(`[Index delete alias]: error!`, e);
    }
  }

  async addQuiz({ index, category = '' }) {
    const mappings = {
      mappings: {
        properties: {
          id: {
            type: 'keyword',
          },
          serial: {
            type: 'keyword',
          },
          question: {
            type: 'text',
            analyzer: 'han_analyzer',
            search_analyzer: 'han_analyzer',
            index: 'true',
          },
          options: {
            type: 'nested',
            properties: {
              id: {
                type: 'keyword',
              },
              serial: {
                type: 'keyword',
              },
              text: {
                type: 'text',
                analyzer: 'han_analyzer',
              },
            },
          },
          answers: {
            type: 'object',
            enabled: false,
          },
          analysis: {
            type: 'text',
          },
          answer: {
            type: 'keyword',
          },
          desc: {
            type: 'keyword',
          },
          category: {
            type: 'keyword',
          },
          from: {
            type: 'keyword',
          },
          v: {
            type: 'keyword',
          },
          create_time: {
            type: 'date',
            format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis',
          },
          update_time: {
            type: 'date',
            format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis',
          },
        },
      },
    };
    const _index = index || config.esConfig.quizIndex;
    const quizIlm = new ILM({
      config: {
        index: _index,
        mappings,
      },
    });
    await quizIlm.ilmCreate();

    // const qaq = new QAQ();
    const generalText = await fs.readFileSync(
      path.join(__dirname, '../../../../data/quiz/4.12通用能力1-10_ABCD.txt'),
      // path.join(__dirname, '../../../../data/quiz/4.12.test.txt'),
      'utf-8',
    );
    const generalTextArr = generalText.split('\n');
    const qaqRes = QAQ.recordProcess(generalTextArr);
    const qaqMapped = qaqRes.map((qaq) => {
      return {
        ...qaq,
        category,
        create_time: Date.now(),
      };
    });

    const quizData = flatMap(qaqMapped, (doc) => [
      { index: { _index, _id: FuncHelper.uuidByString(doc.question) } },
      doc,
    ]);
    console.log(`[qaqRes]:`, qaqRes, quizData);

    const res = await this.client.bulk({ refresh: true, body: quizData });

    return res;
  }

  async deleteQuiz({ index }) {
    const _index = index || config.esConfig.quizIndex;
    const quizIlm = new ILM({
      config: {
        index: _index,
        mappings: {},
      },
    });
    await quizIlm.ilmFlush();
    return {
      code: 0,
      message: 'ilm flushed',
    };
  }

  async searchQuiz({ text = [], index, type, userId }: any) {
    if (!text.length) {
      return [];
    }
    let question;
    if (type === 'question') {
      // const qaq = new QAQ();
      // const quizProcessed = qaq.recordProcess(text);
      // question = quizProcessed.question;
      // if (!question) {
      //   return [];
      // }
      question = text;
    } else if (type === 'text') {
      question = text;
    }
    console.log(`[Quiz search]: `, text, index, question);

    const body_base = {
      track_total_hits: true,
      from: 0,
      size: 1,
    };
    const body = Object.assign(body_base, {
      query: {
        bool: {
          should: [
            {
              match: {
                question: {
                  query: question,
                  // fuzziness: 'AUTO',
                  minimum_should_match: '90%',
                },
              },
            },
          ],
          // filter: {
          //   range: {
          //     _score: {
          //       gte: 0.8,
          //     },
          //   },
          // },
        },
      },
      _source: [
        'question',
        'id',
        'options.id',
        'options.serial',
        'options.text',
        'answer',
        'answers',
        'analysis',
        'category',
        'create_time',
      ],
      highlight: {
        fields: {
          question: { type: 'plain' },
        },
      },
    });

    const result: any = await this.client
      .search(
        {
          index: config.esConfig.quizIndex,
          // from: config.esConfig.skipLen,
          // size: config.esConfig.limitLen,
          body,
        },
        {
          ignore: [404],
          maxRetries: 3,
        },
      )
      .catch((err) => console.log(`[Quiz]: search =>`, err.meta.body.error));

    console.log(`[elasticsearch result]: `, result.body.hits);
    if (result?.body?.hits?.hits?.length) {
      const returnValue: any = result.body.hits.hits.map((hit) => {
        return {
          ...hit._source,
          highlight: hit.highlight.question.join(''),
        };
      });
      return {
        rows: returnValue,
        total: result.body.hits.total,
      };
    } else {
      try {
        // this.aiService.askBaiduAi({
        //   content: text,
        //   userId,
        // });
      } catch (e) {
        console.log(`[AI Baidu]: `, e);
        // 60% like from 题库
        const body_base = {
          track_total_hits: true,
          from: 0,
          size: 5,
        };
        const body = Object.assign(body_base, {
          query: {
            bool: {
              should: [
                {
                  match: {
                    question: {
                      query: question,
                      minimum_should_match: '60%',
                    },
                  },
                },
              ],
            },
          },
          _source: [
            'question',
            'id',
            'options.id',
            'options.serial',
            'options.text',
            'answer',
            'answers',
            'analysis',
            'category',
            'create_time',
          ],
          highlight: {
            fields: {
              question: { type: 'plain' },
            },
          },
        });

        const result: any = await this.client
          .search(
            {
              index: config.esConfig.quizIndex,
              // from: config.esConfig.skipLen,
              // size: config.esConfig.limitLen,
              body,
            },
            {
              ignore: [404],
              maxRetries: 3,
            },
          )
          .catch((err) =>
            console.log(`[Quiz]: search else =>`, err.meta.body.error),
          );
        if (result?.body?.hits) {
          const returnValue: any = result.body.hits.hits.map((hit) => {
            return {
              ...hit._source,
              highlight: hit.highlight.question.join(''),
            };
          });
          return {
            rows: returnValue,
            total: result.body.hits.total,
          };
        }

        return [];
      }
    }
  }
}
