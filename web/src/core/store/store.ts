import { Player } from './../../models/Player.model';
import create, { SetState } from 'zustand';
import { GameStore } from '../../models/GameStore.model';

const useStore = create<GameStore>((set: SetState<GameStore>) => ({
  currentPlayer: null,
  opponent: null,
  setCurrentPlayer: (playerInfo: Player) => set({ currentPlayer: playerInfo}),
  setOpponent: (playerInfo: Player) => set({ opponent: playerInfo}),
}));

export default useStore;
