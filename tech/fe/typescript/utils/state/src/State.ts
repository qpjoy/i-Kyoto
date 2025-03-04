import { EventEmitter } from "./EventEmitter";

export class State<T extends Record<string, any>> {
  state: T;
  readonly name: string;
  readonly initialState: T;
  private readonly Emitter = new EventEmitter<{ update: T }>();
  constructor(name: string, initialState: T) {
    this.name = name;
    this.initialState = initialState;
    this.state = { ...initialState };
  }

  public update(callback: (state: T) => void | Promise<void>) {
    const result = callback(this.state);
    if (result instanceof Promise) {
      void result.then(() => {
        this.Emitter.emit("update", this.state);
        // this.state = { ...this.state };
      });
      return;
    }
    this.Emitter.emit("update", this.state);
    // dispatch changes to our consumers
  }

  public subscribe(callback: (state: T) => void | Promise<void>) {
    return this.Emitter.on("update", callback);
  }

  public unsubscribe(ID: string) {
    return this.Emitter.off("update", ID);
  }
}

// type IMyState = {
//   toggle: boolean;
//   data: number[];
// };

// const MyState = new State<IMyState>("My State", {
//   toggle: false,
//   data: [1, 2, 3]
// });

// MyState.subscribe((state) => {
//   console.log("UPDATE", { ...state });
// });

// for (let i = 0; i < 5; i++) {
//   MyState.update((state) => {
//     state.toggle = !state.toggle;
//     state.data.push(i);
//   });
// }
