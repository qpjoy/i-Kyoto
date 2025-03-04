import IShapeImplementer from "./iShapeImplementer";

export default class SquareImplementer implements IShapeImplementer {
  drawImplementation(): void {
    console.log("**************");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("**************");
  }
}
