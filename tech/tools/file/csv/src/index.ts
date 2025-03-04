import { appendFileSync } from "fs";

export class CSVWriter<T> {
  constructor(private columns: (keyof T)[]) {
    this.csv = this.columns.join(",") + "\n";
  }

  private csv: string;

  save(filePath: string): void {
    appendFileSync(filePath, this.csv);
    this.csv = `\n`;
    console.log(`[csv]: File saved to ${filePath}`);
  }

  addRows(values: T[]): void {
    let rows = values.map((row) => this.formatRow(row));
    this.csv += rows.join("\n");
    console.log(`[csv]: Added \n ${this.csv}`);
  }

  private formatRow(value: T): string {
    return this.columns.map((column) => value[column]).join(",");
  }
}
