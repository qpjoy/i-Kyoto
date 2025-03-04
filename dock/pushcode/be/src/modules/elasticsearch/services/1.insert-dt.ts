// @ts-nocheck
import { Client } from 'es7';
import config from '../../../../config';

const client = new Client({ nodes: 'http://localhost:9200' });

const insertDT = [
  {
    index: {
      _index: config.esConfig.structureIndex,
    },
  },
  {
    name: 'folder.name',
    desc: 'dddeeesssccc',
    url: 'folder.currentPath',
    parentUrl: 'folder.parentPath',
    type: 'folder',
    marked: '111file我是中国人',
    content: null,
    folders: [
      {
        name: '1111',
        url: '111111',
      },
      {
        name: '2222',
        url: '222222',
      },
    ],
    files: [
      {
        name: '111file我是中国人',
        url: '1111file1111',
      },
      {
        name: '2222file',
        url: '2222file2222',
      },
    ],
    from: 'API',
    v: 'version1',
    create_time: Math.floor(new Date().getTime() / 1000),
  },
];

(async () => {
  const res = await client.bulk({ refresh: true, body: insertDT });
  console.log(`[Insert DT]: `, res);
})();
