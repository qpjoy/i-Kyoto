// @ts-nocheck
import { ILM } from './ILM';
import config from '../../../../config';

(async () => {
  try {
    const structureIlm = new ILM();
    const ik_smart_analyzed = await structureIlm.analysis({
      data: {
        analyzer: 'ik_smart',
        text: '特朗普5日接受采访时表示取消佛罗里达州的议程，他可能在白宫接受共和党总统候选人提名并发表演讲。',
      },
    });
    console.log(`[analyzed]: `, ik_smart_analyzed);

    const hanlp_analyzed = await structureIlm.analysis({
      data: {
        //   index: 'qp-api-structure-local',
        text: '特朗普5日接受采访时表示取消佛罗里达州的议程，他可能在白宫接受共和党总统候选人提名并发表演讲。',
        tokenizer: 'hanlp',
      },
    });
    console.log(`[analyzed]: `, hanlp_analyzed);

    // const analyzed1 = await structureIlm.analysis({
    //     analyzer: 'ik_smart',
    //     text: '特朗普5日接受采访时表示取消佛罗里达州的议程，他可能在白宫接受共和党总统候选人提名并发表演讲。',
    //   });
    //   console.log(`[analyzed]: `, analyzed1);
  } catch (e) {
    console.log(`[ILM]: create error`, e);
  }
})();
