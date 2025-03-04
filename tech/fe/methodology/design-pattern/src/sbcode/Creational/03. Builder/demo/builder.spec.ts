import IglooDirector from "./iglooDirector";
import CastleDirector from "./castleDirector";
import HouseBoatDirector from "./houseBoatDirector";

const igLoo = IglooDirector.construct();
const castle = CastleDirector.construct();
const houseBoat = HouseBoatDirector.construct();

console.log(igLoo.construction());
console.log(castle.construction());
console.log(houseBoat.construction());
