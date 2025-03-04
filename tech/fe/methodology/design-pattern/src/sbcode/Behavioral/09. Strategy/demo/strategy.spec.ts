class GameCharacter {
  $position: [number, number] = [0, 0];

  move(movementStyle: IMoveConstructor) {
    new movementStyle().move(this.$position);
  }
}

interface IMoveConstructor {
  new (): IMove;
}

interface IMove {
  move(position: [number, number]): void;
}

class Walking implements IMove {
  move(position: [number, number]) {
    position[0] += 1;
    console.log(`I am Walking, New position = ${position}`);
  }
}

class Sprinting implements IMove {
  move(position: [number, number]) {
    position[0] += 2;
    console.log(`I am Running. New position = ${position}`);
  }
}

class Crawling implements IMove {
  move(position: [number, number]) {
    position[0] += 0.5;
    console.log(`I am Crawling. New position = ${position}`);
  }
}

const gameCharacter = new GameCharacter();

gameCharacter.move(Walking);
gameCharacter.move(Sprinting);
gameCharacter.move(Crawling);
