import { Injectable } from '@angular/core';
import {TicTacToeCellModel} from '../models/tic-tac-toe-cell.model';

@Injectable({
  providedIn: 'root'
})
export class GameHelperService {

  private readonly _conditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  storedUserName!: string;
  storedRandomFactor!: number;
  hasStarted: boolean = false;

  constructor() { }

  setRandomnessValue(username: string): void {
    const initialValue = Math.floor(Math.random() * 80) + 20;
    const today = new Date().getDay();
    if (initialValue % 2 === 0) {
      this.storedRandomFactor = initialValue - username.length;
    } else {
      this.storedRandomFactor = initialValue + username.length;
    }
  }

  setGameHasStarted(hasStarted: boolean): void {
    this.hasStarted = hasStarted;
  }

  getHasStartedStatus(): boolean {
    return this.hasStarted;
  }

  setCurrentUsername(username: string): void {
    this.storedUserName = username;
  }

  getCurrentRandomness(): number {
    return this.storedRandomFactor;
  }

  hasSomeoneWon(grid: TicTacToeCellModel[]): boolean {

    for (let condition of this._conditions) {
      const result = grid[condition[0]].storedChar === grid[condition[1]].storedChar
        && grid[condition[1]].storedChar === grid[condition[2]].storedChar;

      const validStringValue = grid[condition[0]].storedChar;
      if (result && (validStringValue || validStringValue.length)) {
        return true;
      }
    }
    return false;
  }
}
