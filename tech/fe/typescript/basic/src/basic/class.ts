class Fruit {
  name?: string;
  mass?: number;
  color?: string;
  static createBanana(): Fruit {
    return { name: "banana", color: "yellow", mass: 183 };
  }
}

const valueTest = Fruit;
valueTest.createBanana;

let typeTest: Fruit = {} as any;
typeTest.color;

const someClass = class<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");

class Point {
  createdAt: number;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.createdAt = Date.now();
    this.x = x;
    this.y = y;
  }
}
type PointInstance = InstanceType<typeof Point>;

function moveRight(point: PointInstance) {
  point.x += 5;
}

const point = new Point(3, 4);
moveRight(point);
point.x; // => 8
