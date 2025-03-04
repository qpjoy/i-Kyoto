interface IProtoType {
  clone(): this;
}

class MyClass implements IProtoType {
  field: number[];

  constructor(field: number[]) {
    this.field = field;
  }

  clone() {
    return Object.assign({}, this);
  }
}

const object1 = new MyClass([1, 2, 3, 4]);
console.log(`Object1: ${JSON.stringify(object1)}`);

const object2 = object1.clone();
console.log(`Object2: ${JSON.stringify(object2)}`);
object2.field[1] = 101;

console.log(`Object2: ${JSON.stringify(object2)}`);
console.log(`Object1: ${JSON.stringify(object1)}`);
