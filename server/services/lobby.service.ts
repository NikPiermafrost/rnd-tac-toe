import { Room } from '../models/room.model';
import redis from '../utils/redis';

const getLobby = async (): Promise<Room[]> => {
  const lobby = await redis.get('lobby');
  return lobby ? (JSON.parse(lobby) as Room[]) : [];
};

const getLobbyDetail = async (gameId: string): Promise<Room | null> => {
  const lobby = await getLobby();
  return lobby.find((room) => room.gameId === gameId) ?? null;
};

const createNewRoom = async (room: Room): Promise<void> => {
  let lobby = await getLobby();

  if (!lobby?.length) {
    lobby = [];
  }

  if (lobby.find((x) => x.gameId === room.gameId)) {
    throw new Error('Session already exists');
  }

  if (lobby?.length > 50) {
    throw new Error('Lobby is full, please wait to create another game');
  }

  lobby.push(room);

  await redis.set('lobby', JSON.stringify(lobby));
};

export default {
  getLobby,
  getLobbyDetail,
  createNewRoom
};