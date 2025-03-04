import { IBurger } from "./iBurger";
import VeggieBurger from "./veggieBurger";
import MushroomBurger from "./mushroomBurger";
import FishBurger from "./fishBurger";

export default class BurgerFactory {
  public createBurger(name: string): IBurger {
    switch (name) {
      case "Veggie Burger":
        return new VeggieBurger();
      case "Fish Burger":
        return new FishBurger();
      case "Mushroom Burger":
        return new MushroomBurger();
      default:
        throw new Error("Invalid burger name.");
    }
  }
}
