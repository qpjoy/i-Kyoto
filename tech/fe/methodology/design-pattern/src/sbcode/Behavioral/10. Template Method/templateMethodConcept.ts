abstract class AbstractClass {
  stepOne(): void {}

  abstract stepTwo(): void;

  stepThree(): void {
    console.log(`Step Three is a hook that prints this line by default.`);
  }

  templateMethod() {
    this.stepOne();
    this.stepTwo();
    this.stepThree();
  }
}

class ConcreteClassA extends AbstractClass {
  stepTwo() {
    console.log(`Class_A : Step Two (overridden)`);
  }
}

class ConcreteClassB extends AbstractClass {
  stepOne(): void {
    console.log("Class_B: Step One (overridden)");
  }
  stepTwo(): void {
    console.log("Class_B: Step Two (overridden)");
  }
  stepThree(): void {
    console.log("Class_B: Step Three (overridden)");
  }
}

const Class_A = new ConcreteClassA();
Class_A.templateMethod();

const Class_B = new ConcreteClassB();
Class_B.templateMethod();
