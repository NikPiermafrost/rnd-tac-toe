export interface RoomModel {
  gameId: string;
  playerName: string;
}

export interface RoomResponseModel {
  isCreated: boolean;
  reason?: string;
}
