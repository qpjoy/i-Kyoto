import LeaderBoard from "./leaderBoard";
import Game from "./iGame";

export class Game2 implements Game {
  leaderBoard: LeaderBoard;

  constructor() {
    this.leaderBoard = new LeaderBoard();
  }

  addWinner(position: number, name: string): void {
    this.leaderBoard.addWinner(position, name);
  }
}
