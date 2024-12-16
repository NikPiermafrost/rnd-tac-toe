export interface PlayerJoined {
  gameId: string;
  playerName: string;
  randomChance: number;
}

export interface Move {
  gameId: string;
  position: number;
  symbol: string;
}