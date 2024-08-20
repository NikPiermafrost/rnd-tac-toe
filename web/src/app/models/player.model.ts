export interface PlayerModel {
  playerName: string;
  randomChance: number;
}

export interface PlayerJoined {
  gameId: string;
  playerName: string;
  randomChance: number;
}