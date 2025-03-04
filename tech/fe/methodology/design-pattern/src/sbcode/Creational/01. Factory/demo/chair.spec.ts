import ChairFactory from "./chairFactory";

const CHAIR = ChairFactory.getChair("SmallChair");

console.log(CHAIR.getDimensions());
