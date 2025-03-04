interface IAbstraction {
  method(value: string[]): void;
}

class RefinedAbstractionA implements IAbstraction {
  #implementer: IImplementer;

  constructor(implementer: IImplementer) {
    this.#implementer = implementer;
  }

  method(value: string[]) {
    this.#implementer.method(value);
  }
}

class RefinedAbstractionB implements IAbstraction {
  #implementer: IImplementer;

  constructor(implementer: IImplementer) {
    this.#implementer = implementer;
  }

  method(value: string[]) {
    this.#implementer.method(value);
  }
}

interface IImplementer {
  method(value: string[]): void;
}

class ConcreteImplementerA implements IImplementer {
  method(value: string[]) {
    console.log(value);
  }
}

class ConcreteImplementerB implements IImplementer {
  method(value: string[]) {
    value.forEach((v) => console.log(v));
  }
}

const values = ["a", "b", "c"];
const refinedAbstractionA = new RefinedAbstractionA(new ConcreteImplementerA());
refinedAbstractionA.method(values);

const refinedAbstractionB = new RefinedAbstractionB(new ConcreteImplementerB());
refinedAbstractionB.method(values);
