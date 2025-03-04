const symid = Symbol("stockno");
interface Product {
  name: string;
  price: number;
  account: number;
  [x: string]: any;
  buy(): string;
  [symid]: number;
}

let p: Product = {
  name: "product",
  price: 100,
  account: 10,
  [Symbol("stockno")]: 1000,
  100: "Ok"
};

type A = Product["buy"];
type B = Product["price" | "name"];
type S = Product[typeof symid];

// 列不出Symbol
type PKeys = keyof Product; // "name" | "price" | "account" | "buy" | "100"

type AllKeys<T> = T extends any ? T : never;
type Pkeys2 = AllKeys<keyof Product>;

interface Car {
  make: string;
  model: string;
  year: number;
  color: {
    red: string;
    green: string;
    blue: string;
  };
}
let carColor: Car["color"];
let carColorREdComponent: Car["color"]["red"];
let carProperty: Car["color" | "year"];
