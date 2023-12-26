// export interface GameCommand<T> {
//   boardState: string[][];
//   data: T
// }

export enum GameCommandType {
  JoinGame = 'join-game',
  PlayerJoined = 'player-joined',
  HasExited = 'has-exited',
  Move = 'move',
  Won = 'won',
  Lost = 'lost'
}