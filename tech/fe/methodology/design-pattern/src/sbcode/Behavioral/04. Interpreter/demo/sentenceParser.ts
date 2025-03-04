import IAbstractExpression from "./iAbstractExpression";
import Add from "./add";
import Numeral from "./numeral";
import RomanNumeral from "./romanNumeral";
import Subtract from "./subtract";

export default class Parser {
  static parse(sentence: string): IAbstractExpression | undefined {
    const tokens = sentence.split(" ");
    const tree: IAbstractExpression[] = [];
    while (tokens.length > 1) {
      const leftExpression = Parser.decideLeftExpression(tree, tokens);
      const operator = tokens.shift();
      const right = tokens[0];

      if (!Number(right)) {
        tree.push(new RomanNumeral(right));
        if (operator === "-") {
          tree.push(new Subtract(leftExpression, tree[tree.length - 1]));
        }
        if (operator === "+") {
          tree.push(new Add(leftExpression, tree[tree.length - 1]));
        }
      } else {
        const rightExpression = new Numeral(right);
        if (!tree.length) {
          if (operator === "-") {
            tree.push(new Subtract(leftExpression, rightExpression));
          }
          if (operator === "+") {
            tree.push(new Add(leftExpression, rightExpression));
          }
        } else {
          if (operator === "-") {
            tree.push(new Subtract(tree[tree.length - 1], rightExpression));
          }
          if (operator === "+") {
            tree.push(new Add(tree[tree.length - 1], rightExpression));
          }
        }
      }
    }
    return tree.pop();
  }

  static decideLeftExpression(tree: IAbstractExpression[], tokens: string[]): IAbstractExpression {
    const left = tokens.shift();
    let leftExpression: IAbstractExpression;
    if (!tree.length) {
      if (!Number(left)) {
        tree = [];
        tree.push(new RomanNumeral(left as string));
        leftExpression = tree[tree.length - 1] as IAbstractExpression;
      } else {
        leftExpression = new Numeral(left as string);
      }
      return leftExpression;
    } else {
      leftExpression = tree[tree.length - 1] as IAbstractExpression;
      return leftExpression;
    }
  }
}
