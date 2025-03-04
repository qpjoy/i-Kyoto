import IAbstractExpression from "./iAbstractExpression";
import Parser from "./sentenceParser";

const sentence = "5 + IV - 3 + VII - 2";
console.log(sentence);

const astRoot = Parser.parse(sentence);

console.log((astRoot as IAbstractExpression).interpret());

console.dir(astRoot, { depth: null });
