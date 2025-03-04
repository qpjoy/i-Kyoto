import { FactoryA, IProductA } from "./factoryA";
import { FactoryB, IProductB } from "./factoryB";

interface IProduct extends IProductA, IProductB {}

class AbstractFactory {
  static createObject(factory: string): IProduct | undefined {
    try {
      if (["aa", "ab", "ac"].indexOf(factory) > -1) {
        return FactoryA.getObject(factory[1]);
      }
      if (["ba", "bb", "bc"].indexOf(factory) > -1) {
        return FactoryB.getObject(factory[1]);
      }
      throw new Error("No Factory Found");
    } catch (e) {
      console.log(e);
    }
  }
}

let product = AbstractFactory.createObject("ab");
console.log(product);

product = AbstractFactory.createObject("bc");
console.log(product);
