interface ICompositeComponent {
  name: string;
  referenceToParent?: Composite;
  method(): void;
  detach(): void;
}

class Leaf implements ICompositeComponent {
  referenceToParent?: Composite = undefined;
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  method(): void {
    const parent = this.referenceToParent ? this.referenceToParent.name : "none";
    console.log(`<Leaf>\t\tname:${this.name}\tParent:\t${parent}`);
  }

  detach(): void {
    "Detaching this leaf from its parent composite";
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
    }
  }
}

class Composite implements ICompositeComponent {
  referenceToParent?: Composite;
  components: ICompositeComponent[];
  name: string;

  constructor(name: string) {
    this.name = name;
    this.components = [];
  }

  method(): void {
    const parent = this.referenceToParent ? this.referenceToParent.name : "none";
    console.log(`<Composite>\tname:${this.name}\tParent:\t${parent}\tComponents:${this.components.length}`);
    this.components.forEach((component) => {
      component.method();
    });
  }

  attach(component: ICompositeComponent): void {
    component.detach();
    component.referenceToParent = this;
    this.components.push(component);
  }

  delete(component: ICompositeComponent): void {
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  detach(): void {
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
      this.referenceToParent = undefined;
    }
  }
}

const leafA = new Leaf("leaf-a");
const leafB = new Leaf("leaf-b");
const composite1 = new Composite("comp-1");
const composite2 = new Composite("comp-2");
composite1.attach(leafA);
composite2.attach(leafA);

composite2.attach(composite1);

leafB.method();
composite2.method();
