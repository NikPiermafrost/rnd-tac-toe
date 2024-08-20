import { FastifyPluginAsync } from "fastify";
import { RoomResponse, Room, NewRoomRequest, NewRoomResponse } from "../types/room";

const newRoomSchema = {
  type: "object",
  properties: {
    playerName: { type: "string" },
    gameId: { type: "string" }
  },
  required: [ "playerName", "gameId" ],
  additionalProperties: false,
};

const roomExistsSchema = {
  type: "object",
  properties: {
    gameId: { type: "string" }
  },
  required: [ "gameId" ],
  additionalProperties: false,
};

const lobby: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { redis } = fastify;
  await redis.del("lobby");

  fastify.get("/api/lobby", async function (request, reply) {

    const currentLobby = await redis.get("lobby");

    if (!currentLobby) {
      return reply.send([]);
    }

    const lobby: Room[] = JSON.parse(currentLobby);

    const parsed = lobby.map(({ playerName: players, gameId }) => ({ playerName: players, gameId } as RoomResponse));

    return reply.send(parsed);
  });

  fastify.get("/api/lobby/:gameId/exists", {
    schema: {
      params: roomExistsSchema
    },
  }, async function (request, reply) {
    const { gameId } = request.params as { gameId: string; };

    const currentLobby = await redis.get("lobby");

    const lobby: Room[] = currentLobby ? JSON.parse(currentLobby) : [];

    const room = lobby.find((room) => room.gameId === gameId);

    return reply.send(!!room);
  });

  fastify.post("/api/lobby", {
    schema: {
      body: newRoomSchema
    },
  }, async function (request, reply) {
    const body = request.body as NewRoomRequest;

    const currentLobby = await redis.get("lobby");
    const lobby: Room[] = currentLobby ? JSON.parse(currentLobby) : [];

    if (lobby.length >= 50) {
      return reply.status(400).send({ error: "Lobby is full" });
    }

    lobby.push({ playerName: body.playerName, gameId: body.gameId });

    await redis.set("lobby", JSON.stringify(lobby));

    return reply.send({
      gameId: body.gameId,
    } as NewRoomResponse);
  });
};

export default lobby;