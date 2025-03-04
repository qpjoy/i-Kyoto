import FurnitureFactory from "./furnitureFactory";

let furniture = FurnitureFactory.getFurniture("SmallChair");
console.log(furniture?.name);
console.log(furniture?.getDimensions());

furniture = FurnitureFactory.getFurniture("MediumTable");
console.log(furniture?.name);
console.log(furniture?.getDimensions());
