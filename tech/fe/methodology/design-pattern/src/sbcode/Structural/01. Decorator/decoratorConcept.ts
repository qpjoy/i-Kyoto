interface IComponent {
  method(): string;
}

class Component implements IComponent {
  method(): string {
    return "Component Method";
  }
}

class Decorator implements IComponent {
  #object: IComponent;

  constructor(object: IComponent) {
    this.#object = object;
  }

  method(): string {
    return `Decorator Method(${this.#object.method()})`;
  }
}

const component = new Component();
console.log(component.method());

const decorated = new Decorator(component);
console.log(decorated.method());

const decorated2 = new Decorator(decorated);
console.log(decorated2.method());
