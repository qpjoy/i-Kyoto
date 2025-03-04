import { Client } from 'es7';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import * as path from 'path';
import { flatMap } from 'lodash';
import { FuncHelper } from '../commonLang/helper';
import config from '../../../config';
// var XLSX = require("xlsx");

const client = new Client({
  //  nodes: 'http://localhost:9200',
  nodes: 'http://124.221.135.239:3105',
}); // Init

const workbook = XLSX.readFile(
  path.join(
    __dirname,
    // '../../../data/quiz/政治理论素养、电力与能源、一般能力.xls',
    '../../../data/quiz/输配电及用电工程.xls',
  ),
);

const s1 = workbook.SheetNames[0];
const ws = workbook;
const sheet1 = ws.Sheets[s1];

const data: any = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
const columns = data[3];
const rows = data.slice(4);

// const properties = [];
// 修改key
const cols = columns.map((col) => {
  if (col.indexOf('题干') >= 0) {
    col = 'question';
  } else if (col.indexOf('题型') >= 0) {
    col = 'type';
  } else if (col.indexOf('选择') >= 0) {
    const optionRegex = /^选择项(.+)/;
    // const isoption: any = optionRegex.test(col);
    const optionMatches = optionRegex.exec(col);
    const optionSerial: any = optionMatches?.[1];
    if (!optionSerial) {
      return col;
    }
    if (optionSerial == 1) {
      col = 'A';
    } else if (optionSerial == 2) {
      col = 'B';
    } else if (optionSerial == 3) {
      col = 'C';
    } else if (optionSerial == 4) {
      col = 'D';
    } else if (optionSerial == 5) {
      col = 'E';
    } else if (optionSerial == 6) {
      col = 'F';
    } else if (optionSerial == 7) {
      col = 'G';
    }
  } else if (col.indexOf('解析') >= 0) {
    col = 'analysis';
  } else if (col.indexOf('答案') >= 0) {
    col = 'answer';
  } else if (col.indexOf('得分') >= 0) {
    col = 'score';
  }
  return col;
});
console.log(`[cols]: `, cols);

const mapReduced = rows.map((row) => {
  const currentItem = cols.reduce((acc, cur, idx) => {
    acc.id = uuidv4();
    if ('ABCDEFG'.indexOf(cur) >= 0) {
      if (!row[idx]) {
        return acc;
      }
      const item = {
        id: uuidv4(),
        serial: cur,
        text: row[idx],
      };
      if (acc['options']?.length) {
        acc['options'].push(item);
      } else {
        acc['options'] = [item];
      }
    } else if (cur === 'answer') {
      acc['answer'] = row[idx];
      acc['answers'] = row[idx].split('');
    } else {
      acc[cur] = row[idx]?.trim() || '';
    }
    acc.create_time = Date.now();
    return acc;
  }, {});

  return currentItem;
});

const _index: any = config.esConfig.quizIndex || 'test-quiz';

const quizData = flatMap(mapReduced, (doc) => [
  { index: { _index, _id: FuncHelper.uuidByString(doc.question) } },
  doc,
]);
console.log(`[qaqRes]:`, quizData);

(async () => {
  const addXLSXQuiz = await client.bulk({ refresh: true, body: quizData });
  console.log(`[ES]: add XLSX`, addXLSXQuiz);
})();
