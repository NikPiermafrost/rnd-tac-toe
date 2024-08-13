import { FastifyPluginAsync } from "fastify";
import { Room } from "../types/room";
import { PlayerJoined } from "../types/game-info";

const schema = {
  params: {
    type: "object",
    properties: {
      playerName: { type: "string" },
    },
    required: [ "playerName" ],
  },
  body: {
    type: "object",
    properties: {
      playerName: { type: "string" },
    },
    required: [ "playerName" ],
  },
};

const gameHub: FastifyPluginAsync = async (fastify, opts) => {
  const { io, redis } = fastify;

  // Parametric route to handle socket connections for a specific gameId
  fastify.put("/api/game/:gameId", { schema }, async (request, reply) => {
    const { gameId } = request.params as { gameId: string; };
    const { playerName } = request.body as { playerName: string; };

    const savedLobby = await redis.get("lobby");

    const lobby: Room[] = savedLobby ? JSON.parse(savedLobby) : [];

    const room = lobby.find((room) => room.gameId === gameId);

    if (!room || room.playerName.length == 2) {
      return reply.status(404).send();
    }

    if (playerName === room.playerName[0]) {
      return reply.status(409).send({ message: "Player name already in use" });
    }

    lobby.splice(lobby.indexOf(room), 1);

    await redis.set("lobby", JSON.stringify(lobby));

    // Listen for socket connections
    io.on("connection", (socket) => {
      console.log(`A user connected to game ${gameId}`);
      socket.join(gameId);

      socket.on("game-joined", (playerInfo: PlayerJoined) => {
        console.log(`Game ${gameId} joined by ${playerInfo.playerName}`);
        io.to(gameId).emit("message", `${playerName} has joined the game`);
      });

      // Listen for custom events
      socket.on("message", (msg) => {
        console.log(`Message received in game ${gameId}: ${msg}`);
        // Broadcast the message to other clients in the same room
        io.to(gameId).emit("message", msg);
      });

      // Handle disconnection
      socket.on("disconnect", async () => {
        console.log(`A user disconnected from game ${gameId}`);
        io.to(gameId).emit("message", `${playerName} has left the game`);
        socket.leave(gameId);
      });
    });

    return reply.status(204).send();
  });
};

export default gameHub;