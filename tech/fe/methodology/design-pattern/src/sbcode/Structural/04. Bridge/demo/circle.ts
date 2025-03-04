import IShape from "./iShape";
import IShapeImplementor from "./iShapeImplementer";

export default class Circle implements IShape {
  #implementer: IShapeImplementor;

  constructor(implementer: IShapeImplementor) {
    this.#implementer = implementer;
  }

  draw(): void {
    this.#implementer.drawImplementation();
  }
}
