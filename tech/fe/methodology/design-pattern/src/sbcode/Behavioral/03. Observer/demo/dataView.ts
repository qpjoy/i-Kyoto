import { IDataModel } from "./dataModel";

export interface IDataView {
  notify(data: number[]): void;
  draw(data: number[]): void;
  delete(): void;
}

export class BarGraphView implements IDataView {
  #observable: IDataModel;
  #id: number;

  constructor(observable: IDataModel) {
    this.#observable = observable;
    this.#id = this.#observable.subscribe(this);
  }

  notify(data: number[]): void {
    console.log(`BarGraph, id: ${this.#id}`);
    this.draw(data);
  }

  draw(data: number[]): void {
    console.log(`Drawing a Bar graph using data: ${JSON.stringify(data)}`);
  }

  delete(): void {
    this.#observable.unsubscribe(this.#id);
  }
}

export class PieGraphView implements IDataView {
  #observable: IDataModel;
  #id: number;
  constructor(observable: IDataModel) {
    this.#observable = observable;
    this.#id = this.#observable.subscribe(this);
  }

  notify(data: number[]): void {
    console.log(`PieGraph, id: ${this.#id}`);
    this.draw(data);
  }

  draw(data: number[]): void {
    console.log(`Drawing a Pie graph using data: ${data}`);
  }

  delete(): void {
    this.#observable.unsubscribe(this.#id);
  }
}

export class TableView implements IDataView {
  #observable: IDataModel;
  #id: number;

  constructor(observable: IDataModel) {
    this.#observable = observable;
    this.#id = this.#observable.subscribe(this);
  }

  notify(data: number[]): void {
    console.log(`TableView, id:${this.#id}`);
    this.draw(data);
  }

  draw(data: number[]): void {
    console.log(`Drawing a Table using data: ${JSON.stringify(data)}`);
  }

  delete(): void {
    this.#observable.unsubscribe(this.#id);
  }
}
