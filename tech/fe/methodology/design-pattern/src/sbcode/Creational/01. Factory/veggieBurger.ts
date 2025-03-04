import Burger from "./burger";

export default class VeggieBurger extends Burger {
  name = "Veggie Burger";
  prepare(): void {
    console.log("Veggie burger is preparing ...");
  }
}
