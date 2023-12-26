import { Server } from 'socket.io';
import { GameCommandType } from '../models/action.model';
import { JoinGame } from '../models/game.model';
import redis from '../utils/redis';

export const handleGameMessages = (io: Server) => {
  io.on('connection', async (socket): Promise<void> => {
    console.log('a user connected');
    socket.on(GameCommandType.JoinGame, async (data: JoinGame): Promise<void> => {
      socket.join(data.gameId);

      const randomChance = calculateRandomChance(data.userName);

      await redis.set(`${data.gameId}:${data.userName}`, randomChance);

      const playerData = {
        gameId: data.gameId,
        userName: data.userName
      };

      socket.to(data.gameId).emit(GameCommandType.PlayerJoined, playerData);
    });

    // socket.on(GameCommandType.HasExited, async (): Promise<void> => {

    // });
  });
};

const calculateRandomChance = (userName: string) => {
  const initialValue = Math.floor(Math.random() * 80) + 20;
  const seconds = new Date().getSeconds();
  if (seconds % 2 === 0) {
    return initialValue - userName.length;
  } else {
    return initialValue + userName.length;
  }
};