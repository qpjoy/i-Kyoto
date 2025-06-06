import { IDataModel } from "./dataModel";

export interface IDataController {
  subscribe(observer: IDataModel): void;
  unsubscribe(observer: IDataModel): void;
  notify(data: number[]): void;
}

export class DataController implements IDataController {
  static instance: DataController;
  $observers: Set<IDataModel> = new Set();

  constructor() {
    if (DataController.instance) {
      return DataController.instance;
    }
    DataController.instance = this;
  }

  subscribe(observer: IDataModel): void {
    this.$observers.add(observer);
  }

  unsubscribe(observer: IDataModel): void {
    this.$observers.delete(observer);
  }

  notify(data: number[]): void {
    this.$observers.forEach((observer) => {
      observer.notify(data);
    });
  }
}
