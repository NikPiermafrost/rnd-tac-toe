import { Room } from '../models/room.model';
import redis from '../utils/redis';
import { db } from '../utils/postgres';
import { rooms } from '../schema/schema';
import { eq } from 'drizzle-orm';

const getLobby = async (): Promise<Room[]> => {
  const result = await db.select().from(rooms);
  return result.map((x) => ({
    gameId: x.gameId,
    playerName: x.playerName
  }));
};

const getLobbyDetail = async (gameId: string): Promise<Room | null> => {
  const room = await db.query.rooms.findFirst({
    where: eq(rooms.gameId, gameId)
  });
  
  return room ? {
    gameId: room.gameId,
    playerName: room.playerName
  } : null;
};

const createNewRoom = async (room: Room): Promise<void> => {
  const lobby = await getLobby();

  if (lobby.find((x) => x.gameId === room.gameId)) {
    throw new Error('Session already exists');
  }

  if (lobby?.length > 50) {
    throw new Error('Lobby is full, please wait to create another game');
  }

  await db.insert(rooms).values({
    gameId: room.gameId,
    playerName: room.playerName
  });
};

const deleteRoom = async (gameId: string): Promise<void> => {
  await db.delete(rooms).where(eq(rooms.gameId, gameId));
};

export default {
  getLobby,
  getLobbyDetail,
  createNewRoom,
  deleteRoom
};