const uuid = require('uuid');
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
const res = uuid.v5(
  `解析：【Quiz】认为，设桃子总数为x，有4+(x-4)÷10=8+[x-8-4-(x-4)÷10]÷10，解得x=324。第一只猴子分到4+(324-4)÷
10=36个桃子，每只猴子分到的桃子同样多，所以总共有324÷36=9只猴子。
4. 《中国共产党章程(修正案)》经党的第二十次全国代表大会审议通过后，要进行发布，以便要求党的各级组织和全党
同志学习党章、遵守党章、贯彻党章、维护党章。这时应该选择的文种是( )`,
  MY_NAMESPACE,
);
console.log(res);
