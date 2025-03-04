import GameCharacter from "./gameCharacter";
import Memento from "./memento";

export default class CareTaker {
  $originator: GameCharacter;
  $mementos: Memento[];

  constructor(originator: GameCharacter) {
    this.$originator = originator;
    this.$mementos = [];
  }

  save(): void {
    console.log(`CareTaker: Game Save`);
    const memento = this.$originator.memento;
    this.$mementos.push(memento);
  }

  restore(index: number): void {
    console.log(`CareTaker: Restoring Characters attributes from Memento`);
    const memento = this.$mementos[index];
    this.$originator.memento = memento;
  }
}
