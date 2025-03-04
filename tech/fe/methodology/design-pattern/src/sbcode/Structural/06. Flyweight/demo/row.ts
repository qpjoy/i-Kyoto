import Column from "./column";

export default class Row {
  columns: Column[];
  constructor(column_count: number) {
    this.columns = [];
    for (let i = 0; i < column_count; i++) {
      this.columns.push(new Column());
    }
  }
  getData(): string {
    let ret = "";
    this.columns.forEach((column) => {
      ret = `${ret}${column.getData()}|`;
    });
    return ret;
  }
}
