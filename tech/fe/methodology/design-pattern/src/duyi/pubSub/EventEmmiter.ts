const eventName = ["API:UN_AUTH", "API:INVALID"];
type EventNames = (typeof eventName)[number];

class EventEmitter {
  private listeners: Record<string, Set<Function>> = {
    "API:UN_AUTH": new Set(),
    "API:INVALID": new Set()
  };

  on(eventName: EventNames, listener: Function) {
    this.listeners[eventName].add(listener);
  }

  emit(eventName: EventNames, args: any[]) {
    this.listeners[eventName].forEach((listener) => listener(...args));
  }
}

export default new EventEmitter();

// import emitter from './EventEmitter';
// emitter.on('API:UN_AUTH', () => {
//   console.log('API:UN_AUTH');
// });
