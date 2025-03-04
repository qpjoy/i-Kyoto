class Memento {
  state: string;
  constructor(state: string) {
    this.state = state;
  }
}

class Originator {
  #state: string;

  constructor() {
    this.#state = "";
  }

  public get state(): string {
    return this.#state;
  }

  public set state(value: string) {
    this.#state = value;
    console.log(`Originator: Set state to '${value}'`);
  }

  public get memento(): Memento {
    console.log(`Originator: Providing Memento of state to caretaker.`);
    return new Memento(this.#state);
  }

  public set memento(value: Memento) {
    this.#state = value.state;
    console.log(
      `
            Originator: State after restoring from Memento: '${this.#state}'`
    );
  }
}

class CareTaker {
  #originator: Originator;
  #mementos: Memento[];

  constructor(originator: Originator) {
    this.#originator = originator;
    this.#mementos = [];
  }

  create() {
    console.log("CareTaker: Getting a copy of Originators current state");
    const memento = this.#originator.memento;
    this.#mementos.push(memento);
  }

  restore(index: number) {
    console.log(`CareTaker: Restoring Originators state from Memento`);
    const memento = this.#mementos[index];
    this.#originator.memento = memento;
  }
}

const originator = new Originator();
const caretaker = new CareTaker(originator);

originator.state = "State #1";
originator.state = "State #2";

caretaker.create();

originator.state = "State #3";
caretaker.create();

originator.state = "State #4";
console.log(originator.state);

caretaker.restore(0);
console.log(originator.state);

caretaker.restore(1);
console.log(originator.state);
