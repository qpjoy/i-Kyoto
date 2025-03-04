interface IObservable {
  subscribe(observer: IObservable): void;

  unsubscribe(observer: IObservable): void;

  notify(...args: unknown[]): void;
}

class Subject implements IObservable {
  #observers: Set<IObserver>;
  constructor() {
    this.#observers = new Set();
  }

  subscribe(observer: IObservable): void {
    this.#observers.add(observer);
  }

  unsubscribe(observer: IObservable): void {
    this.#observers.delete(observer);
  }

  notify(...args: unknown[]): void {
    this.#observers.forEach((observer) => {
      observer.notify(...args);
    });
  }
}

interface IObserver {
  notify(...args: unknown[]): void;
}

class Observer implements IObserver {
  $id: number;
  constructor(observable: IObservable) {
    this.$id = COUNTER++;
    observable.subscribe(this as any);
  }

  notify(...args: unknown[]) {
    console.log(`OBSERVER_${this.$id} received ${JSON.stringify(args)}`);
  }
}

let COUNTER = 1;
const subject = new Subject();
const observer1 = new Observer(subject);
const observer2 = new Observer(subject);

subject.notify("First Notification", [1, 2, 3]);
subject.unsubscribe(observer2 as any);

subject.notify("Second Notification", { A: 1, B: 2, C: 3 });
