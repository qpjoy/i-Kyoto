import CareTaker from "./caretaker";
import GameCharacter from "./gameCharacter";

const gameCharacter = new GameCharacter();
const caretaker = new CareTaker(gameCharacter);

gameCharacter.registerKill();
gameCharacter.moveForward(1);
gameCharacter.addInventory("sword");
gameCharacter.registerKill();
gameCharacter.addInventory("rifle");
gameCharacter.moveForward(1);
console.log(gameCharacter.status());

caretaker.save();

gameCharacter.registerKill();
gameCharacter.moveForward(1);
gameCharacter.progressToNextLevel();
gameCharacter.registerKill();
gameCharacter.addInventory("motorbike");
gameCharacter.moveForward(10);
gameCharacter.registerKill();
console.log(gameCharacter.status());

caretaker.save();
gameCharacter.moveForward(1);
gameCharacter.progressToNextLevel();
gameCharacter.registerKill();
console.log(gameCharacter.status());

caretaker.restore(0);
console.log(gameCharacter.status());

gameCharacter.registerKill();
