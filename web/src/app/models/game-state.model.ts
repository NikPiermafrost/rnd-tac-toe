export type GameState = {
  gameId: string;
  board: TicTacToeCellModel[];
  players: PlayerInfo[];
  whoHasWon?: string;
  isDraw: boolean;
  turn?: string;
}

export type TicTacToeCellModel = {
  cellPosition: number;
  storedChar: string;
}

export type PlayerInfo = {
  gameId: string;
  userName: string;
}

export interface Move {
  gameId: string;
  cellPosition: number;
  userName: string;
  cellCharacter: string;
}

export interface JoinGame {
  gameId: string,
  whoWon: string
}

export interface PlayerData {
  gameId: string,
  userName: string,
  randomChance: number
}