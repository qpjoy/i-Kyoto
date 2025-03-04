class FruitStand {
  constructor(fruitNames: string[]) {}
}

type ConstructorArg<C> = C extends {
  new (arg: infer A, ...args: any[]): any;
}
  ? A
  : never;

type ConstructorArg1<C> = C extends {
  new (arg: infer A): any;
}
  ? A
  : never;

let fruits: ConstructorArg<typeof FruitStand>;
