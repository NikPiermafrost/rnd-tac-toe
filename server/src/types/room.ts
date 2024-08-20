export interface Room {
  gameId: string;
  playerName: string;
}

export interface RoomResponse {
  playerName: string;
  gameId: string;
}

export interface NewRoomRequest {
  playerName: string;
  gameId: string;
}

export interface NewRoomResponse {
  gameId: string;
}