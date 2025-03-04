class ObjectContext {
  request(strategy: IStrategyConstructor) {
    return new strategy();
  }
}

interface IStrategyConstructor {
  new (): IStrategy;
}

interface IStrategy {
  method(): string;
}

class ConcreteStrategyA implements IStrategy {
  method() {
    return "I am ConcreteStrategyA";
  }
}

class ConcreteStrategyB implements IStrategy {
  method() {
    return "I am ConcreteStrategyB";
  }
}

class ConcreteStrategyC implements IStrategy {
  method(): string {
    return "I am ConcreteStrategyC";
  }
}

const objectContext = new ObjectContext();

console.log(objectContext.request(ConcreteStrategyA).method());
console.log(objectContext.request(ConcreteStrategyB).method());
console.log(objectContext.request(ConcreteStrategyC).method());
