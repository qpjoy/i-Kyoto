import IVisitor from "./iVisitor";

export default interface IVisitable {
  accept(visitor: IVisitor): void;
}
