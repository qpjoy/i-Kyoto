interface IAbstractExpression {
  interpret(): number;
}

class Numeral implements IAbstractExpression {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value);
  }

  interpret(): number {
    return this.value;
  }
}

class Add implements IAbstractExpression {
  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class Subtract implements IAbstractExpression {
  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

const sentence = "5 + 4 - 3 + 7 - 2";
console.log(sentence);

const tokens = sentence.split(" ");
console.log(JSON.stringify(tokens));

const ast: IAbstractExpression[] = [];
ast.push(new Add(new Numeral(tokens[0]), new Numeral(tokens[2])));
ast.push(new Subtract(ast[0], new Numeral(tokens[4])));
ast.push(new Add(ast[1], new Numeral(tokens[6])));
ast.push(new Subtract(ast[2], new Numeral(tokens[8])));

const astRoot = ast.pop();

console.log((astRoot as IAbstractExpression).interpret());
console.dir(astRoot, { depth: null });
