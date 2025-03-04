import { Client } from 'es7';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import * as path from 'path';
import { flatMap } from 'lodash';
import { FuncHelper } from '../commonLang/helper';
import config from '../../../config';

const client = new Client({
  //  nodes: 'http://localhost:9200',
  nodes: 'http://124.221.135.239:3105',
}); // Init

const workbook = XLSX.readFile(
  path.join(
    __dirname,
    // '../../../data/quiz/合并试题.xls',
    '../../../data/quiz/1_2023年国网企业文化题库电子版（标注版帮助记忆）(2).xlsx',
  ),
);

(async () => {
  for (const sheetName of workbook.SheetNames) {
    console.log(`[Excuting Sheet]: ${sheetName}`);
    const sheet = workbook.Sheets[sheetName];

    const data: any = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const isSheetHeaderReg = /([单|多]选|判断)题|(题干)/;
    let isSheetHeader = false;
    let i = 0;
    while (i <= 10 && isSheetHeader === false) {
      isSheetHeader = isSheetHeaderReg.test(data[i]);
      i++;
    }
    const columns = data[i - 1];
    const rows = data.slice(i);

    console.log(`[First data]: `, columns[0], rows[0], data[0]);
    // const columns = data[3];
    // const rows = data.slice(4);

    const optionRegex = /选择?项(.+)|([a-f])/i;

    const cols = columns.map((col) => {
      if (isSheetHeaderReg.test(col)) {
        col = 'question';
      } else if (col.indexOf('题型') >= 0) {
        col = 'type';
      } else if (optionRegex.test(col)) {
        // const isoption: any = optionRegex.test(col);
        const optionMatches = optionRegex.exec(col);
        const optionSerial: any = optionMatches?.[1] || optionMatches?.[2];
        if (!optionSerial) {
          return col;
        }
        if (optionSerial == 1 || optionSerial == 'A') {
          col = 'A';
        } else if (optionSerial == 2 || optionSerial == 'B') {
          col = 'B';
        } else if (optionSerial == 3 || optionSerial == 'C') {
          col = 'C';
        } else if (optionSerial == 4 || optionSerial == 'D') {
          col = 'D';
        } else if (optionSerial == 5 || optionSerial == 'E') {
          col = 'E';
        } else if (optionSerial == 6 || optionSerial == 'F') {
          col = 'F';
        } else if (optionSerial == 7 || optionSerial == 'G') {
          col = 'G';
        }
      } else if (col.indexOf('解析') >= 0 || col.indexOf('备注') >= 0) {
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
      if (!row.length) {
        return {
          id: '000',
          serial: 'NOT_SURE',
          question: 'NOT_SURE',
          options: [],
          answer: '',
          answers: [],
        };
      }
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
          console.log(`[Acc Cur]: `, acc, cur, row, idx);
          acc[cur] = row[idx] ? row[idx]?.trim?.() : '';
        }
        acc.category = sheetName;
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
    console.log(`[qaqRes]:`, quizData.length);

    // try {
    const addXLSXQuiz = await client.bulk(
      { refresh: true, body: quizData },
      // function (err, resp: any) {
      //   if (err) {
      //     console.log(`[Bulk XLSX]: error `, err);
      //   }
      //   if (resp.errors) {
      //     console.log(`[Bulk XLSX]: issues`, JSON.stringify(resp, null, '\t'));
      //   }
      // },
    );
    // console.log(`[ES]: add XLSX`, addXLSXQuiz);
    if (addXLSXQuiz.body.errors) {
      // TODO "NOT_SURE" not in id format
      console.log(
        `[Bulk XLSX]: issues`,
        addXLSXQuiz.body.items
          .filter((item) => item.index.status !== 200)
          .map((item) => item.index),
      );
    }
    // } catch (e) {
    //   console.log(`[XLSX Quiz]: `, e);
    // }
  }
})();
