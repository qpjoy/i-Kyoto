import IShapeImplementor from "./iShapeImplementer";

export default class CircleImplementer implements IShapeImplementor {
  drawImplementation(): void {
    console.log("    ******");
    console.log("  **      **");
    console.log(" *          *");
    console.log("*            *");
    console.log("*            *");
    console.log(" *          *");
    console.log("  **      **");
    console.log("    ******");
  }
}
