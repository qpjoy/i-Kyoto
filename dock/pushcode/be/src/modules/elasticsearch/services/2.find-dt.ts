// @ts-nocheck
import { Client } from 'es7';
import config from '../../../../config';

const client = new Client({ nodes: 'http://localhost:9200' });

(async () => {
  const body_base = {
    track_total_hits: true,
    _source: [
      'name',
      'desc',
      'cover',
      'video',
      'badge_id',
      'from',
      'v',
      'type',
      'files',
    ],
  };

  const body = Object.assign(body_base, {
    query: {
      bool: {
        must: [
          {
            wildcard: {
              from: 'API' || '*',
            },
          },
          {
            terms: {
              v: ['version1', 'EDU'],
            },
          },
          {
            match: {
              marked: {
                query: '中国人',
                fuzziness: 'AUTO:3,6',
              },
            },
          },
          //   {
          //     nested: {
          //       path: 'files',
          //       query: {
          //         multi_match: {
          //           query: '111f',
          //           type: 'most_fields',
          //           fields: ['files.name', 'files.url'],
          //           fuzziness: 'AUTO:0,6',
          //         },
          //       },
          //     },
          //   },
          //   {
          //     nested: {
          //       path: 'files',
          //       query: {
          //         bool: {
          //           must: [
          //             {
          //               multi_match: {
          //                 query: '111',
          //                 type: 'most_fields',
          //                 fields: ['files.name', 'files.url'],
          //                 fuzziness: 'AUTO:3,6',
          //               },
          //             },
          //           ],
          //         },
          //       },
          //       //   inner_hits: {
          //       //     _source: [
          //       //       'chapters.url',
          //       //       'chapters.anchor',
          //       //       'chapters.title',
          //       //       'chapters.chapter',
          //       //       'chapters.s_chapter',
          //       //     ],
          //       //     highlight: {
          //       //       fields: {
          //       //         'chapters.chapter': {
          //       //           fragment_size: 200,
          //       //           no_match_size: 200,
          //       //           // "number_of_fragments": 0,
          //       //           // "hightlight_query": {
          //       //           //     "multi_match": {
          //       //           //         "query": keyword,
          //       //           //         "fields": ["chapters.chapter"],
          //       //           //         "fuzziness": "AUTO",
          //       //           //         "prefix_length": 2
          //       //           //     }
          //       //           // }
          //       //         },
          //       //         'chapters.s_chapter': {
          //       //           fragment_size: 200,
          //       //           no_match_size: 200,
          //       //         },
          //       //       },
          //       //     },
          //       //   },
          //     },
          //   },
        ],
      },
    },
  });

  const result: any = await client
    .search(
      {
        index: config.esConfig.structureIndex,
        // from: config.esConfig.skipLen,
        // size: config.esConfig.limitLen,
        body,
      },
      {
        ignore: [404],
        maxRetries: 3,
      },
    )
    .catch((err) => console.log(`[Chapter]: search =>`, err.meta.body.error));
  console.log(`[find dt]: `, JSON.stringify(result.body), ' - - -- ');

  const all: any = await client.search({
    track_total_hits: true,
    index: config.esConfig.structureIndex,

    body: {
      query: {
        match_all: {},
      },
    },
  });

  console.log(`[all find]: `, JSON.stringify(all.body));
})();
