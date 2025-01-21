/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Server, ServerOptions } from "socket.io";
import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { Move, PlayerJoined } from "../types/game-info";
import { Room } from "../types/room";

export type FastifySocketioOptions = Partial<ServerOptions> & {
  preClose?: (done: Function) => void;
};

export default fp<FastifySocketioOptions>(
  async function (fastify, opts: FastifySocketioOptions) {
    const pubClient = new Redis({
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || "0", 10),
      family: 4,
    });
    const subClient = pubClient.duplicate();
    opts = {
      ...opts,
      adapter: createAdapter(pubClient, subClient),
    };
    const io = new Server(fastify.server, opts);
    function defaultPreClose(done: Function) {
      (fastify as any).io.local.disconnectSockets(true);
      console.log("Socket.io connections closed");
      done();
    }

    fastify.addHook("preClose", (done) => {
      if (opts.preClose) {
        return opts.preClose(done);
      }
      return defaultPreClose(done);
    });
    fastify.addHook("onClose", (fastify: FastifyInstance, done) => {
      (fastify as any).io.close();
      done();
    });

    fastify.decorate("io", io);

    const { redis } = fastify;

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("OnUserConnect", async (playerInfo: PlayerJoined) => {
        try {
          const gameDetail = await redis.get(socket.id);

          const lobbyFromDb = await redis.get("lobby");

          const lobby: Room[] = lobbyFromDb ? JSON.parse(lobbyFromDb) : [];

          const room = lobby.find((room) => room.gameId === playerInfo.gameId);

          if (!!gameDetail && !!room) {
            lobby.splice(lobby.indexOf(room), 1);
            await redis.set("lobby", JSON.stringify(lobby));
          }

          socket.join(playerInfo.gameId);

          await redis.set(socket.id, playerInfo.gameId, "EX", 60 * 60 * 24);

          io.to(playerInfo.gameId).emit("ReceiveOpponent", playerInfo);
        } catch (error) {
          console.error(error);
        }
      });

      socket.on("RemoveFromGroup", (gameId: string) => {
        socket.leave(gameId);
        io.to(gameId).emit("HasExited", "Your opponent has left the game");
      });

      socket.on("MoveSelected", (move: Move) => {
        io.to(move.gameId).emit("Move", move);
      });

      socket.on("Rematch", (gameId: string) => {
        io.to(gameId).emit("RestartMatch");
      });

      // Handle disconnection
      socket.on("disconnect", async (info) => {
        console.log(info);
        const gameId = await redis.get(socket.id);
        if (gameId) {
          const lobbyFromDb = await redis.get("lobby");

          const lobby: Room[] = lobbyFromDb ? JSON.parse(lobbyFromDb) : [];

          const room = lobby.find((room) => room.gameId === gameId);

          if (room) {
            lobby.splice(lobby.indexOf(room), 1);
            await redis.set("lobby", JSON.stringify(lobby));
          }

          const keys = await redis.keys("*");
          for (const key of keys) {
            const value = await redis.get(key);
            if (value === gameId) {
              await redis.del(key);
            }
          }
          io.to(gameId).emit("HasExited", "Your opponent has left the game");
        }
      });
    });
  },
  { fastify: ">=4.x.x", name: "fastify-socket.io" },
);

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}