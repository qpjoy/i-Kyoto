import axios from 'axios';
import config from '../../../../config';
import { Client } from 'es7';
import { FuncHelper } from '../../../utils/commonLang/helper';

const client = new Client({
  nodes: [config.esConfig.esUrl || 'http://127.0.0.1:9200'],
});

const _config_ = {
  baseUrl: config.esConfig.esUrl,
  contentType: 'application/json',
  index: 'lili-api-history',
  mappings: {},
};

export class ILM {
  instance: any;
  config: any;
  constructor({ instance, config }: any = {}) {
    const _config = Object.assign({}, _config_, config);
    axios.defaults.baseURL = _config.baseUrl;
    axios.defaults.headers.post['Content-Type'] = _config.contentType;
    instance = axios.create();
    this.instance = instance;
    this.config = _config;
  }

  async upsertPolicy() {
    const { instance, config } = this;
    try {
      const policyRes = await instance.put(
        `/_ilm/policy/${config.index}-policy?pretty`,
        {
          policy: {
            phases: {
              hot: {
                actions: {
                  rollover: {
                    max_size: '50GB',
                    max_age: '30d',
                  },
                },
              },
              delete: {
                min_age: '90d',
                actions: {
                  delete: {},
                },
              },
            },
          },
        },
      );
      if (policyRes.status === 200) {
        console.log(`[Policy index]: created!`);
      } else {
        console.log(`[Policy index]: other codes!`, policyRes.code);
      }
    } catch (e) {
      console.log(`[Policy error]: `, e);
    }
  }

  async upsertTemplate() {
    const { instance, config } = this;
    const templateConf = Object.assign(
      {},
      {
        index_patterns: [`${config.index}-*`],
        aliases: {
          [config.index]: {},
        },
        settings: {
          number_of_shards: 3,
          number_of_replicas: 5,
          'index.lifecycle.name': `${config.index}-policy`,
          'index.lifecycle.rollover_alias': `${config.index}`,
          analysis: {
            analyzer: {
              hanlpAnalyzer: {
                type: 'hanlp',
                tokenizer: 'han_tokenizer',
                algorithm: 'viterbi',
                enableIndexMode: 'true',
                enableCustomDictionary: 'true',
                customDictionaryPath: '',
                enableCustomDictionaryForcing: 'false',
                enableStopWord: 'true',
                stopWordDictionaryPath: '',
                enableNumberQuantifierRecognize: 'true',
                enableNameRecognize: 'true',
                enableTranslatedNameRecognize: 'true',
                enableJapaneseNameRecognize: 'true',
                enableOrganizationRecognize: 'true',
                enablePlaceRecognize: 'true',
                enableTraditionalChineseMode: 'false',
              },
              // searchHtml: {
              //   type: 'custom',
              //   tokenizer: 'ik_smart',
              //   char_filter: ['html_strip', 'camelFlatten'],
              //   // "max_token_length": 5,
              //   // "filter": ["1_10_edgegrams", "snowball"]
              //   // "filter": ["1_10_edgegrams"]
              // },
              // filterHtml: {
              //   type: 'custom',
              //   tokenizer: 'ik_max_word',
              //   char_filter: ['html_strip', 'camelFlatten'],
              //   // "max_token_length": 5,
              //   // "filter": ["1_10_edgegrams"]
              // },
              // searchName: {
              //   type: 'custom',
              //   tokenizer: 'ik_smart',
              //   char_filter: ['html_strip', 'camelFlatten'],
              //   filter: ['3_10_edgegrams'],
              // },
              // searchTitle: {
              //   type: 'custom',
              //   tokenizer: 'ik_smart',
              //   char_filter: ['html_strip', 'camelFlatten'],
              //   // "filter": ["3_10_edgegrams"]
              // },
            },
            tokenizer: {
              han_tokenizer: {
                type: 'hanlp',
                enable_stop_dictionary: true,
                enable_custom_config: true,
              },
            },
            filter: {
              '1_10_edgegrams': {
                type: 'edge_ngram',
                min_gram: 1,
                max_gram: 10,
                // "token_chars": ["letter", "digit"]
              },
              '2_10_edgegrams': {
                type: 'edge_ngram',
                min_gram: 2,
                max_gram: 10,
                token_chars: ['letter', 'digit'],
              },
              '3_10_edgegrams': {
                type: 'edge_ngram',
                min_gram: 3,
                max_gram: 10,
                token_chars: ['letter', 'digit'],
              },
            },
            char_filter: {
              camelFlatten: {
                type: 'pattern_replace',
                pattern: '(?<=\\p{Lower})(?=\\p{Upper})',
                replacement: ' ',
              },
            },
          },
        },
      },
      config.mappings || {},
    );

    try {
      const templateRes = await instance.put(
        `/_template/${config.index}-template`,
        templateConf,
      );
      if (templateRes.status === 200) {
        console.log(`[Template index]: created!`);
      } else {
        console.log(`[Template index]: other codes!`, templateRes.code);
      }
    } catch (e) {
      console.log(`[Template error]: `, e.toJSON());
    }
  }

  async isIndexExists() {
    const { config } = this;
    const { body } = await client.indices.exists({
      index: config.index,
    });
    return body;
  }

  async initIlmIndex({ ...conf } = {}) {
    const { instance, config } = this;

    try {
      const initIndexRes = await instance.put(`/${config.index}-00001?pretty`, {
        aliases: {
          [`${config.index}`]: {
            is_write_index: true,
          },
        },
      });
      if (initIndexRes.status === 200) {
        console.log(`[Ilm index]: created!`);
      } else {
        console.log(`[Ilm index]: other codes!`, initIndexRes.code);
      }
    } catch (e) {
      console.log(`[Ilm error]: `, e);
    }
  }

  async indexDeleteAlias({ ...conf } = {}) {
    const { instance, config } = this;
    try {
      const idaRes = await client.indices.deleteAlias(
        Object.assign(
          {},
          {
            index: config.index,
            name: '*',
          },
          conf,
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

  async catTemplates() {
    const h = ['name', 'index_patterns'];
    try {
      const templates = await client.cat.templates({
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

  async deleteTemplates({ name }: any = {}) {
    const { instance, config } = this;
    const _name = name || `${config.index}-template`;
    try {
      const delTpl = await client.indices.deleteTemplate({
        name: `${_name}`,
        // ignore_unavailable: true
        // timeout: string,
        // master_timeout: string
      });
      if (delTpl && delTpl.statusCode === 200) {
        console.log(`[Templates]: deleted!`, delTpl.body);
      } else {
        console.log(`[Templates]: other codes!`, delTpl.body);
      }
    } catch (e) {
      console.log(`[Templates]: delete error!`, e);
    }
  }

  async mappingStatus() {
    const { instance, config } = this;
    try {
      const mappingsRes = await instance.get(
        `/${config.index}*/_mappings?pretty`,
        {},
      );
      if (mappingsRes.status === 200) {
        console.log(`[Mapping status]: get success!`, mappingsRes.data);
      } else {
        console.log(`[Mapping status]: other codes!`);
      }
    } catch (e) {
      console.log(`[Mapping status]: error!`, e);
    }
  }

  async ilmCatPolicy({ ...conf } = {}) {
    const { instance, config } = this;
    const _config = Object.assign({}, config, conf);
    try {
      const icpRes = await instance.get(
        `/_ilm/policy${_config.index ? '/' + _config.index + '*' : ''}?pretty`,
        {},
      );
      if (icpRes && icpRes.status === 200) {
        console.log(`[ILM policy]: getted!`, JSON.stringify(icpRes.data));
      } else {
        console.log(`[ILM policy]: other codes!`);
      }
    } catch (e) {
      console.log(`[ILM]: cat policy error!`, e);
    }
  }

  async ilmDeletePolicy({ name }: any = {}) {
    const { instance, config } = this;
    const _config = Object.assign({}, config);
    const _name = name || `${config.index}-policy`;
    if (!_name) {
      throw new Error('ILM policy name not provided...');
    }
    try {
      const icpRes = await instance.delete(`/_ilm/policy/${_name}?pretty`, {});
      if (icpRes && icpRes.status === 200) {
        console.log(`[ILM]: deleted!`, JSON.stringify(icpRes.data));
      } else {
        console.log(`[ILM]: other codes!`);
      }
    } catch (e) {
      console.log(`[ILM]: delete policy error!`, e);
    }
  }

  async ilmRemovePolicy({ index }: any = {}) {
    const { instance, config } = this;
    const _index = index || `${config.index}`;
    try {
      const irpRes = await client.ilm.removePolicy({
        index: _index,
      });
      if (irpRes && irpRes.statusCode === 200) {
        console.log(`[ILM]: remove policy success!`, irpRes.body);
      } else {
        console.log(`[ILM]: remove policy other codes!`, irpRes.body);
      }
    } catch (e) {
      console.log(`[ILM]: remove policy error!`, e);
    }
  }

  async deleteIndex({ index }: any = {}) {
    const { instance, config } = this;
    const _index = index || config.index;
    try {
      if (_index) {
        const deleteRes = await instance.delete(`/${_index}?pretty`, {});
        if (deleteRes && deleteRes.status === 200) {
          console.log(
            `[Index]: ${_index} deleted!`,
            JSON.stringify(deleteRes.data),
          );
        } else {
          console.log(`[Index]: ${_index} other codes!`);
        }
      } else {
        console.log(`[Index]: not specified...`);
      }
    } catch (e) {
      console.log(`[Index]: not specified...`);
    }
  }

  async clearCache({ index }: any = {}) {
    const { instance, config } = this;
    const _index = index || config.index;
    console.log(_index);
    try {
      if (_index) {
        const cacheRes = await client.indices.clearCache({
          index: _index,
          // index: string | string[],
          // fielddata: boolean,
          // fields: string | string[],
          // query: boolean,
          // ignore_unavailable: boolean,
          // allow_no_indices: boolean,
          // expand_wildcards: 'open' | 'closed' | 'none' | 'all',
          // request: boolean
        });
        if (cacheRes.statusCode === 200) {
          console.log(`[Cache]: cleared!`, cacheRes);
        } else {
          console.log(`[Cache]: other codes!`);
        }
      }
    } catch (e) {
      console.log(`[Cache]: error!`, e);
    }
  }

  async truncateAll() {
    await this.deleteIndex('_all');
  }

  async newIlmIndex({ ...conf } = {}) {
    const { instance, config } = this;
    const index = `${config.index}-tmp-000001-${FuncHelper.uuid2(16, 16)}`;
    console.log(`[Reindex]: ${index}`);
    try {
      const initIndexRes = await instance.put(`/${index}`, {
        aliases: {
          [`${config.index}`]: {
            // "is_write_index": true
          },
        },
      });
      if (initIndexRes.status === 200) {
        console.log(`[Index]: ${index}-000001 created!`);
        return index;
      } else {
        console.log(`[Index]: ${index}-000001 other codes!`, initIndexRes.code);
      }
    } catch (e) {
      console.log(`[Index]: error!`, e);
    }
  }

  async reIndex(_index) {
    const { instance, config } = this;
    const index = _index || `${config.index}-000001`;
    const newIndex = await this.newIlmIndex();
    console.log(`[Reindex]: ${config.index} ===> ${newIndex}`);
    let count = 0;
    let nodes = undefined;

    await instance.post(`/_reindex`, {
      conflicts: 'proceed',
      source: {
        index: index,
      },
      dest: {
        index: newIndex,
        version_type: 'internal',
      },
    });
    console.log(`[Reindex]: rm aliases ${index} from ${config.index}`);
    const interval = setInterval(async () => {
      if (
        (Object.prototype.toString.call(nodes) === '[object Object]' &&
          JSON.stringify(nodes) === '{}') ||
        count >= 10
      ) {
        console.log(`[Reindex]: interval terminated!`);
        clearInterval(interval);

        await instance.post(`/_aliases`, {
          actions: [
            {
              remove: {
                index: index,
                alias: config.index,
              },
            },
          ],
        });

        console.log(`[Reindex]: deleting ${index}`);
        await this.deleteIndex({ index });

        console.log(`[Reindex]: ${newIndex} === > ${index}`);
        await instance.post(`/_reindex`, {
          source: {
            index: newIndex,
          },
          dest: {
            index: index,
            version_type: 'internal',
          },
        });
        console.log(`[Reindex]: deleting ${newIndex}`);
        await this.deleteIndex({ index: newIndex });

        return;
      }
      const res = await instance.get(`_tasks?detailed=true&actions=*reindex`);
      nodes = res.data.nodes;
      console.log(`[Reindex]: `, FuncHelper.safeStringify(res.data));
      count++;
    }, 1000);
  }

  async ilmStatus() {
    const { instance, config } = this;
    try {
      const statusRes = await instance.get(
        `/${config.index}-*/_ilm/explain?pretty`,
        {},
      );
      if (statusRes.status === 200) {
        console.log(
          `[ILM STATUS]: get success!`,
          JSON.stringify(statusRes.data),
        );
      } else {
        console.log(`[ILM STATUS]: other codes`, statusRes.code);
      }
    } catch (e) {
      console.log(`[ILM STATUS]: error`, e);
    }
  }

  async catAliases() {
    const h = ['alias', 'index'];
    try {
      const aliases = await client.cat.aliases({
        h,
      });
      if (aliases && aliases.statusCode === 200) {
        const body = aliases.body;
        const bodyArr = FuncHelper.matrixToArr(body, h);
        return bodyArr;
      }
    } catch (e) {
      console.log(`[Index Aliases]: error!`, e);
    }
  }

  async ilmCreate() {
    await this.upsertPolicy();
    await this.upsertTemplate();
    const indexExists = await this.isIndexExists();
    if (indexExists) {
      console.log(`[ILM]: index exists...`, indexExists);
    } else {
      await this.initIlmIndex();
    }
    await this.ilmStatus();
    await this.mappingStatus();
  }

  async ilmFlush() {
    const { config } = this;
    const aliasMappings = await this.catAliases();
    console.log(`[Flush]: cat aliases`, aliasMappings);

    for (const { alias, index } of aliasMappings) {
      console.log(`[Flush]: outer in for `, alias, index);
      if (index.indexOf(config.index) >= 0) {
        console.log(`[Flush]: `, index, config.index, 'to be cat');
        // delete alias
        await this.indexDeleteAlias({ index, name: alias });
        // // delete index
        await this.deleteIndex({ index });

        // delete template && mappings

        const tplArr = await this.catTemplates();
        console.log(tplArr);
        for (const { name, index_patterns } of tplArr) {
          const tplName = `${config.index}-template`;
          if (name.indexOf(tplName) >= 0) {
            console.log(
              `[Flush]: `,
              name,
              index_patterns,
              '--- this is name, index_patterns',
            );
            await this.deleteTemplates({ name: tplName });

            // delete policy
            await this.ilmDeletePolicy({ name: `${config.index}-policy` });
          }
        }
      }
    }
  }

  async deleteStructureByVersion(version) {
    const { instance, config } = this;
    try {
      const statusRes = await instance.post(
        `/${config.index}/_delete_by_query`,
        {
          query: {
            match: {
              v: version,
            },
          },
        },
      );
      // console.log(`[ES Structure]: `, statusRes.data);
      if (statusRes.status === 200) {
        console.log(`[ES Structure]: delete success!`, statusRes.data);
        return statusRes.data;
      } else {
        console.log(`[ES Structure]: other codes`, statusRes.code);
        return null;
      }
    } catch (e) {
      console.log(`[ES Structure]: error`, e);
      return null;
    }
  }

  async deleteEducation(id) {
    const { instance, config } = this;
    try {
      const eduRes = await instance.post(`/${config.index}/_delete_by_query`, {
        query: {
          match: {
            _id: `education_${id}`,
          },
        },
      });
      if (eduRes.status === 200) {
        console.log(`[ES Education]: delete success!`, eduRes.data);
        return eduRes.data;
      } else {
        console.log(`[ES Education]: other codes`, eduRes.code);
        return null;
      }
    } catch (e) {
      console.log(`[ES Education]: error`, e);
      return null;
    }
  }

  async analysis(params: any) {
    const { instance, config } = this;
    try {
      const eduRes = await instance.get(`/_analyze?pretty=true`, params);
      if (eduRes.status === 200) {
        console.log(`[ES Analysis]:  success!`, eduRes.data);
        return eduRes.data;
      } else {
        console.log(`[ES Analysis]: other codes`, eduRes.code);
        return null;
      }
    } catch (e) {
      console.log(`[ES Education]: error`, e);
      return null;
    }
  }

  async catPlugins() {
    const { instance, config } = this;
    try {
      const eduRes = await instance.get(`/_cat/plugins?pretty=true`);
      if (eduRes.status === 200) {
        console.log(`[ES Analysis]:  success!`, eduRes.data);
        return eduRes.data;
      } else {
        console.log(`[ES Analysis]: other codes`, eduRes.code);
        return null;
      }
    } catch (e) {
      console.log(`[ES Education]: error`, e);
      return null;
    }
  }

  async catIndices() {
    const { instance, config } = this;
    try {
      const indexRes = await instance.get(`/_cat/indices?pretty=true`);
      if (indexRes.status === 200) {
        console.log(`[ES Analysis]:  success!`, indexRes.data);
        return indexRes.data;
      } else {
        console.log(`[ES Analysis]: other codes`, indexRes.code);
        return null;
      }
    } catch (e) {
      console.log(`[ES Education]: error`, e);
      return null;
    }
  }
}
