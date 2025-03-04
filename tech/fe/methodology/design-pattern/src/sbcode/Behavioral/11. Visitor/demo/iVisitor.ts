import AbstractCarPart from "./abstractCarPart";

export default interface IVisitor {
  visit(abstractCarPart: AbstractCarPart): void;
}
