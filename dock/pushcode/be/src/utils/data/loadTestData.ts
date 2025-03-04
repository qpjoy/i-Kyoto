import * as fs from 'fs';
import * as path from 'path';
import QAQ from './QAQ';

(async () => {
  // const qaq = new QAQ();
  const generalText = await fs.readFileSync(
    // path.join(__dirname, '../../../data/quiz/4.12通用能力1-10_ABCD.txt'),
    path.join(__dirname, './4.12.test.txt'),
    'utf-8',
  );
  const generalTextArr = generalText.split('\n');

  // const generalTextArr = [
  //   '名成局',
  //   '26.大部分拖延者都喜欢"时间是幻觉',
  //   '这种概念。他们生活在主观时间和客观',
  //   '时间的严重冲突中，并一直在其中挣',
  //   '扎.当',
  //   '一件事或一个目标其时间设定在很远的',
  //   '将来，那么它就给人一种不真实的感',
  //   '觉，从而使这件事看上去没有它实际上',
  //   '那么重要。相反，一些时间很近的目标',
  //   '则看上去更清晰和紧迫。因此，即便现',
  //   '有的目标没有长期目标重要，人们往',
  //   '往去做即时的事情，而不做对未来很重',
  //   '要的事情。这被心理学家称为"未来折',
  //   '扣"。根据这段话，大部分拖延者:()',
  //   'A.总是贪图及时享乐',
  //   'B.完全没有时间观念',
  //   'C.不能客观判断事情轻重',
  //   'D.不善于设定长远的目标',
  //   '正确答案:C',
  //   '解析',
  //   '27."工匠精神"意味着精益求精、精雕细',
  //   '琢，意味着专业与敬业，更意味着对规',
  //   '则、规矩的尊重与()，对高品质产品的',
  //   '责任感与自豪感。*工匠精神"日渐成为',
  //   '热点话题，但问题的关键是,与其(),',
  //   '不如起而行之，将*工匠精神”融入平',
  //   '常的工作实践中。填入括号部分最恰当',
  //   '的一项是;',
  //   'A坚守;临渊羡鱼',
  //   'B.恪守;坐而论道',
  //   'C.信守;纸上谈兵',
  //   'D.遵守;侃侃而谈',
  // ];

  const qaqRes = QAQ.recordProcess(generalTextArr);
  // const qaqFiltered = qaqRes.filter((item) => !item.answers);

  console.log(
    `[qaq]: `,
    qaqRes,
    // JSON.stringify(qaqRes),
    // qaqFiltered,
    // qaqFiltered.length,
  );
})();
