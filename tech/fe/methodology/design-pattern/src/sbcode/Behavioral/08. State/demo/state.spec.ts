enum ExampleState {
  Initializing = "Initializing",
  Started = "Started",
  Running = "Running",
  Finished = "Finished"
}

interface IExampleState {
  request(): void;
}

class StateContext implements IExampleState {
  $state: ExampleState;

  constructor() {
    this.$state = ExampleState.Initializing;
  }

  public get state() {
    return this.$state;
  }

  public set state(value: ExampleState) {
    switch (value) {
      case ExampleState.Started:
        this.request = Started.prototype.request;
        break;
      case ExampleState.Running:
        this.request = Running.prototype.request;
        break;
      case ExampleState.Finished:
        this.request = Finished.prototype.request;
        break;
    }
    this.$state = value;
  }

  request(): void {}
}

class Started implements IExampleState {
  request(): void {
    console.log(`I am now Started`);
  }
}

class Running implements IExampleState {
  request(): void {
    console.log(`I am now Running`);
  }
}

class Finished implements IExampleState {
  request(): void {
    console.log(`I am now Finished`);
  }
}

const stateContext = new StateContext();
console.log(`STATE_CONTEXT = ` + stateContext.state);
stateContext.state = ExampleState.Started;
stateContext.request();
stateContext.state = ExampleState.Running;
stateContext.request();
stateContext.state = ExampleState.Finished;
stateContext.request();
stateContext.state = ExampleState.Started;
stateContext.request();
stateContext.state = ExampleState.Running;
stateContext.request();
stateContext.state = ExampleState.Finished;
stateContext.request();
