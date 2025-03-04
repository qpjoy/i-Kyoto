export default class LeaderBoard {
  static instance: LeaderBoard;
  #table: { [id: number]: string } = {};
  $table: any;
  private table: any;

  constructor() {
    if (LeaderBoard.instance) {
      return LeaderBoard.instance;
    }
    LeaderBoard.instance = this;
  }

  public addWinner(position: number, name: string): void {
    this.#table[position] = name;
  }

  public print(): void {
    console.log("---------Leaderboard---------");
    for (const key in this.#table) {
      console.log(`|\t${key}\t|\t${this.#table[key]}\t|`);
    }
    console.log();
  }
}
