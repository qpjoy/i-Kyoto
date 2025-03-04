import CircleImplementer from "./circleImplementer";
import SquareImplementer from "./squareImplementer";
import Circle from "./circle";
import Square from "./square";

const circle = new Circle(new CircleImplementer());
circle.draw();

const square = new Square(new SquareImplementer());
square.draw();
