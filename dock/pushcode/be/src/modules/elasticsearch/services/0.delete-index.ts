// @ts-nocheck
import { ILM } from './ILM';
import config from '../../../../config';

(async () => {
  try {
    const structureIlm = new ILM({
      config: {
        index: config.esConfig.structureIndex,
        mappings: {
          mappings: {
            properties: {
              id: {
                type: 'integer',
              },
              name: {
                type: 'keyword',
              },
              desc: {
                type: 'text',
                analyzer: 'filterHtml',
                search_analyzer: 'searchHtml',
                index: 'true',
              },
              url: {
                type: 'keyword',
              },
              type: {
                type: 'keyword',
              },
              marked: {
                type: 'text',
                analyzer: 'ik_max_word',
                search_analyzer: 'ik_smart',
                index: 'true',
              },
              content: {
                type: 'text',
              },
              folders: {
                type: 'nested',
                properties: {
                  name: {
                    type: 'keyword',
                  },
                  url: {
                    type: 'keyword',
                  },
                },
              },
              files: {
                types: 'nested',
                properties: {
                  name: {
                    type: 'keyword',
                  },
                  url: {
                    type: 'keyword',
                  },
                },
              },
              chapters: {
                type: 'nested',
                properties: {
                  url: {
                    type: 'keyword',
                  },
                  anchor: {
                    type: 'keyword',
                  },
                  title: {
                    type: 'keyword',
                  },
                  chapter: {
                    type: 'text',
                    analyzer: 'ik_max_word',
                    search_analyzer: 'ik_smart',
                    index: 'true',
                  },
                },
              },
              from: {
                type: 'keyword',
              },
              v: {
                type: 'keyword',
              },
              // create_time: {
              //   type: 'date',
              //   format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis',
              // },
              // update_time: {
              //   type: 'date',
              //   format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis',
              // },
            },
          },
        },
      },
    });
    await structureIlm.ilmFlush();
  } catch (e) {
    console.log(`[ILM]: `, e);
  }
})();
