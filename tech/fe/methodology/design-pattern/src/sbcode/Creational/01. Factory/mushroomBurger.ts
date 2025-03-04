import Burger from "./burger";

export default class MushroomBurger extends Burger {
  name = "Mushroom Burger";
  prepare(): void {
    console.log("Mushroom burger is preparing ...");
  }
}
