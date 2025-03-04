// named imports
// import { strawberry, raspberry } from "./berries";
// import kiwi from "./kiwi";
// export function makeFruitSalad() {}
// export default class FruitBasket {}
// export { lemon, lime } from "./citrus";

// // namespace import
// import * as allBerries from './berries'
// // using the namespace
// allBerries.strawberry
// allBerries.blueberry
// allBerries.raspberry
// export * from './berries'

// // namespace re-export
// export * as berries from './berries'
// const banana = createBanana();

// function createBanana() {
//   return { name: "banana", color: "yellow", mass: 183 };
// }

// export = createBanana;
// import * as createBanana from './fruits'

// esModuleInterop
// allowSyntheticDefaultImports

// import non-ts thing

declare module "*.png" {
  const imgUrl: string;
  export default imgUrl;
}
