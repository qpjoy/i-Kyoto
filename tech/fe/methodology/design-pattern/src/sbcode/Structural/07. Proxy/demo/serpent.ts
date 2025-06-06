import IProteus from "./iProteus";
import Leopard from "./leopard";
import Lion from "./lion";

export default class Serpent implements IProteus {
  name = "Serpent";

  tellMeTheFuture(): void {
    if (Math.floor(Math.random() * 2)) {
      Object.assign(this, new Leopard());
      this.tellMeTheFuture = Leopard.prototype.tellMeTheFuture;
      this.tellMeYourForm = Leopard.prototype.tellMeYourForm;
    } else {
      Object.assign(this, new Lion());
      this.tellMeTheFuture = Lion.prototype.tellMeTheFuture;
      this.tellMeYourForm = Lion.prototype.tellMeYourForm;
    }
  }

  tellMeYourForm(): void {
    console.log(`I am the form of ${this.name}`);
  }
}
