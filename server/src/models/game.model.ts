export interface JoinGame {
  gameId: string,
  whoWon: string
}

export interface PlayerData {
  gameId: string,
  userName: string,
  randomChance: number
}