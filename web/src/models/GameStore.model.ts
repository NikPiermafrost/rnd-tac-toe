import { Player } from './Player.model';

export interface GameStore {
  currentPlayer: Player | null;
  opponent: Player | null;
  setCurrentPlayer: (playerInfo: Player) => void;
  setOpponent: (playerInfo: Player) => void;
}
