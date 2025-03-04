import Burger from "./burger";

export default class FishBurger extends Burger {
  name = "Fish Burger";
  prepare(): void {
    console.log("Fish burger is preparing ...");
  }
}
