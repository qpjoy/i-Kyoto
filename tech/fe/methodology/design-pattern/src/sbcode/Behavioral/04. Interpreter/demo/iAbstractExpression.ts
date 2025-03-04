export default interface IAbstractExpression {
  value?: number;
  left?: IAbstractExpression;
  right?: IAbstractExpression;
  interpret(): number;
}
