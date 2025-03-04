import { v4 as uuidv4 } from 'uuid';

// const testAnswerArr = [
//   '21.某单位男女员工的人数之比是15:13。按人数之比5:7:8分为甲、乙、丙三个科室，其中甲科室男女员工的人数之',
//   '比为4:3，乙科室为5:2。则丙科室男女员工人数之比为:()',
//   'c A.1:2',
//   'C B.2:3',
//   'cC.5:9',
//   'C D.5:8',
//   '正确答案:C',
//   '解析:',
//   '15+13=28,5+7+8=20,28和20的最小公倍数为140,设单位员工总人数为',
//   'w.etest8.com',
//   '140人,各部分的人数情况如下表所示。',
//   '甲(4:3)',
//   '乙(5:2)',
//   '丙',
//   '总数',
//   '男员工',
//   '35÷(4+3)x4=20',
//   '49÷(5+2)x5=35',
//   '75-20-35=20',
//   '140÷28x15=75',
//   '女员工',
//   '56-20=36',
//   '总数',
//   '140÷20x5=35',
//   '140÷20x7=49',
//   '140÷20x8=56',
//   '所以,丙科室男女员工人数之比为20:36=5:9。故本题选C。',
//   '另解,15+13=28,4+3=5+2=7,可知,总人数、甲科室的人数、乙科室的人数均能被7整除,则丙',
//   '科室的人数也能被7整除,选项中只有5+9=14能被7整除,故本题选C。',
//   '二',
//   '22.下列句子有歧义的一项是:()',
//   'A.新一季的玉米种子已种进了田里，等待雨水灌溉而发芽生长',
//   ' B. 辛巴人目前主要居住在纳米比亚西北部的库内内地区，距离安拉边境只有一百公里左右，人口不足两万',
//   'C.昆山市委书记、市长和其他市领导同志出席了第八届国际发明展的开幕式',
//   'D. 杨柳是乡下极其常见的一种树种，具有强大的生命力，折取一枝纵横倒顺插之，皆能够正常生长',
//   '正确答案:C',
//   '解析:易老师分析，C项“其他市领导”既可以理解为“其他城市来的领导”，也可以理解为“昆山市除了市委书记和市长的其他',
//   '领导”，存在歧义。A、B、D三项均无歧义。故本题选C。',
//   '23.中国共产党是领导我们事业的核心力量，()是实现中华民族伟大复兴的根本保证。',
//   'C A.马克思主义',
//   'B. 党的领导',
//   'CC.依法治国',
//   'CD.人民当家做主',
//   '正确答案:B',
//   '解析:易老师解析，中国共产党是领导我们事业的核心力量，党的领导是实现中华民族伟大复兴的根本保证。大会同意把',
//   '党是最高政治领导力量，坚持和加强党的全面领导等内容写入党章。这有利于充分发挥党总揽全局、协调各方的领导核心',
//   '作用，把党的领导落实到党和国家事业各领域各方面各环节。',
//   '24.患者如何正确地服用秋水仙碱?秋水仙碱的治疗剂量与中毒剂量十分接近，服用药物时必须得十二分小心。不过，',
//   '秋水仙碱毒性虽大，但痛风患者也不必()，只要按照医嘱正确服用，肝功能受损的概率还是很低的。填入括号部分',
//   '最恰当的一项是:',
//   'C A.讳疾忌医',
//   'CB.矫枉过正',
//   'C.舍本逐末',
//   'C D.因噎废食',
//   'ww.etest8.com',
//   '正确答案:D',
//   '解析:小易分析，句意为秋水仙碱毒性虽大，但痛风患者也不要因为害怕中毒而不去治疗。“讳疾忌医”指的是怕人知道有',
//   '病而不肯医治，比喻掩饰缺点，不愿改正;“矫枉过正”指的是纠正偏差过了头;“舍本逐末”指的是舍弃事物根本的、主要的',
//   '部分，而去追求细枝末节，指轻重倒置;“因噎废食”指的是因为吃饭噎住过，索性连饭也不吃了，比喻因为怕出问题，索',
//   '性不干。只有“因噎废食”能够体现出怕中毒而不去医治的意思，符合句意。故本题选D。',
//   '25.党的十九大报告明确，要把社会主义核心价值观融入社会发展各方面，转化为人们的()和()。',
//   'CA.情感认同;行为习惯',
//   'B. 情感共鸣;行为习惯',
//   'CC. 情感认同;行为规范',
//   '以',
//   'D.情感共鸣;行为规范',
//   '正确答案:A',
// ];

class QAQ {
  question: string;
  answer: any;
  testAnswers: any;

  static recordProcess(testAnswerArr) {
    // 找出题干
    // 换行
    // append
    // 碰到选项
    // 碰到答案
    // 解析

    // 1. 判断目前在哪个阶段
    // 2. 写入question

    const res = testAnswerArr.reduce((acc, cur, idx): any => {
      // 1. 判断目前在哪个阶段
      let processQuestion;
      if (!acc.length) {
        console.log(`[acc]: `, acc);
        processQuestion = {
          id: uuidv4() + 'lol1' || '',
          // 1. 题目序号：1，2，3
          serial: 0,
          // 2. 序号后面跟的题目换行后，
          question: '',
          // 3. 查找到选项
          options: [],
          // 3-4 答案string
          answer: '',
          // 4. 正确答案
          answers: [],
          // 5. 解析
          analysis: '',
          // 6. process进度，第几步
          flag: 0,
        };
      } else {
        processQuestion = acc[acc.length - 1];
      }

      const lastFlag = processQuestion.flag;
      console.log(`[last flag]: `, lastFlag);
      let _flag = processQuestion.flag;
      // 1.1 stop word; 比如大标题。一 二

      // [1]、在题目阶段
      cur = cur.trim();
      const serialIndex = cur.indexOf('.');
      const _firstPart = cur.substring(0, serialIndex);
      const _secondPart = cur.substring(serialIndex + 1, cur.length).trim();
      let firstPart;
      try {
        firstPart = parseInt(_firstPart);
      } catch (e) {
        console.log(e);
        return;
      }
      // _firstPart.length <= 5 && _secondPart?.length && /A-F/.test(_firstPart);

      // console.log(`[parts]: `, firstPart);
      if (!isNaN(firstPart) && firstPart <= 1000 && _secondPart) {
        _flag = 1;
      }

      // [2]、选项
      const optionRegex = /^[C广O2”]?\s{0,3}([A-F])\.?(.+)/;

      if (
        // _firstPart.length <= 5 &&
        // _secondPart?.length &&
        // /[A-F]/.test(_firstPart)
        optionRegex.test(cur)
      ) {
        _flag = 2;
      }

      // [3] 答案
      // const _answer = cur.indexOf('正确答案:');
      // const _answerArr = cur.split('正确答案:');
      const answerRegex = /^正确答案[:|：]?(.+)/;
      const isAnswer: any = answerRegex.test(cur);
      const answerMatches = answerRegex.exec(cur);
      // const answerString = answerMatches?.[1];

      if (isAnswer) {
        _flag = 3;
      }
      // [3] 解析
      // const _analysis = cur.indexOf('解析:');
      // const _analysisArr = cur.split('解析:');

      const analysisRegex = /^解析[:|：]?(.*)/;
      const isAnalysis = analysisRegex.test(cur);
      const analysisMatches = analysisRegex.exec(cur);
      // const serialChar = isAnalysisMatches?.[1];

      if (isAnalysis) {
        _flag = 4;
      }

      processQuestion.flag = _flag;

      if (_flag === 1) {
        // 设置processQuestion
        // 1. 是否存在标题
        console.log(`[flag 1]: `, _flag);
        const serial = firstPart;

        if (serial) {
          // new question
          const newQuestion = {
            id: uuidv4() + 'lol2' || '',
            // 1. 题目序号：1，2，3
            serial: 0,
            // 2. 序号后面跟的题目换行后，
            question: '',
            // 3. 查找到选项
            options: [],
            // 4. 正确答案
            answers: [],
            // 5. 解析
            analysis: '',
            // 6. process进度，第几步
            flag: 0,
          };
          newQuestion.serial = serial;
          newQuestion.question += _secondPart;
          newQuestion.flag = _flag;
          acc.push(newQuestion);
          console.log(`[processQuestion]: 4`, processQuestion);
          return acc;
        } else {
          // 是否题目一开始有serial
          console.log(`[processQuestion]: 3`, processQuestion);
          processQuestion.question += cur;
          if (!processQuestion.serial) {
            processQuestion.serial = 'NOT_SURE?';
          }
        }

        // // 如果没有序号
        // if (!processQuestion.serial) {
        //   console.log(`[processQuestion]: 2`, processQuestion);
        //   // 是否是新录入内容
        //   processQuestion.serial = _firstPart;
        //   processQuestion.question += _secondPart;
        //   acc.push(processQuestion);
        //   return acc;
        // } else {
        //   // 如果有序号
        //   console.log(`[processQuestion]: 1`, processQuestion);
        //   processQuestion.question += cur;
        //   // acc[acc.length - 1] = processQuestion;
        // }
      } else if (_flag === 2) {
        // _firstPart.length <= 5 && _secondPart.length && /A-F/.test(_firstPart);

        // const _option = _firstPart.trim().toUpperCase();
        const regex = optionRegex;
        const matches = regex.exec(cur);
        const serialChar = matches?.[1];
        const textChar = matches?.[2];

        console.log(`[flag 2]: `, serialChar, matches);

        // 2.1 获取最后一个option
        const options = processQuestion.options;
        const processOption = options.length
          ? options[options.length - 1]
          : {
              id: uuidv4() + 'lol3' || '',
              serial: '',
              text: '',
            };

        // 2.1.1 如果原来没有option
        // processOption;

        // 2..1 选项有序号 和 题干
        if (serialChar) {
          // new option
          const newOption = {
            id: uuidv4() + 'lol4' || '',
            serial: serialChar,
            // text: _secondPart,
            text: textChar,
          };
          options.push(newOption);
        }
        // 2..2 选项有题干，没有序号
        else {
          processOption.text += cur;
          if (options.length) {
            options[options.length - 1] = processOption;
          } else {
            processOption.serial = 'NOT_SURE';
            options.push(processOption);
          }
        }
        processQuestion.options = options;
      } else if (_flag === 3) {
        const answerRight = answerMatches?.[1];
        let answer = processQuestion.answer || '';
        console.log(`[Flag 3]: `, answer, answerRight);
        if (answerRight) {
          answer += answerRight;
        } else {
          answer += cur;
        }
        processQuestion.answer = answer;
        const matches = processQuestion?.answer.match(/([A-F对错])/g);
        processQuestion.answers = matches;
      } else if (_flag === 4) {
        const analysisRight = analysisMatches?.[1];
        console.log(`[Flag 4]: `, analysisMatches);
        if (analysisRight || typeof analysisRight === 'string') {
          processQuestion.analysis += analysisRight;
        } else {
          processQuestion.analysis += cur;
        }
      } else if (_flag === 0) {
        return acc;
      }
      acc[acc.length - 1] = processQuestion;
      return acc;
    }, []);
    return res;
  }
}

export default QAQ;
