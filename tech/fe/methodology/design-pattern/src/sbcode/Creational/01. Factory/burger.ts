import { IBurger } from "./iBurger";

export default class Burger implements IBurger {
  name = "burger";
  prepare(): void {
    throw new Error("Method not implemented.");
  }
}
