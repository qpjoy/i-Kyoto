interface ICommand {
  execute(): void;
}

class Invoker {
  #commands: { [id: string]: ICommand };

  constructor() {
    this.#commands = {};
  }

  register(commandName: string, command: ICommand) {
    this.#commands[commandName] = command;
  }

  execute(commandName: string) {
    if (commandName in this.#commands) {
      this.#commands[commandName].execute();
    } else {
      console.log(`Command [${commandName}] not recognised`);
    }
  }
}

class Receiver {
  runCommand1() {
    console.log("Executing Command 1");
  }

  runCommand2() {
    console.log("Executing Command 2");
  }
}

class Command1 implements ICommand {
  #receiver: Receiver;
  constructor(receiver: Receiver) {
    this.#receiver = receiver;
  }
  execute() {
    this.#receiver.runCommand1();
  }
}

class Command2 implements ICommand {
  #receiver: Receiver;

  constructor(receiver: Receiver) {
    this.#receiver = receiver;
  }

  execute() {
    this.#receiver.runCommand2();
  }
}

const receiver = new Receiver();
const command1 = new Command1(receiver);
const command2 = new Command2(receiver);

const invoker = new Invoker();
invoker.register("1", command1);
invoker.register("2", command2);

invoker.execute("1");
invoker.execute("2");
invoker.execute("1");
invoker.execute("2");
