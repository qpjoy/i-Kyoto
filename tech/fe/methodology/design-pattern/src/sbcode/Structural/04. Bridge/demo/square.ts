import IShape from "./iShape";
import IshapeImplementor from "./iShapeImplementer";

export default class Square implements IShape {
  #implementer: IshapeImplementor;

  constructor(implementer: IshapeImplementor) {
    this.#implementer = implementer;
  }

  draw(): void {
    this.#implementer.drawImplementation();
  }
}
