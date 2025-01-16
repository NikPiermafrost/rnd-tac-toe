import { FastifyPluginAsync } from "fastify";

const healtzRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/api/healthz", async (request, reply) => {
    return reply.status(204).send();
  });
};

export default healtzRoutes;