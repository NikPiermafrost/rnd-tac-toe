import fp from "fastify-plugin";
import fpHelmet from "@fastify/helmet";

export default fp(async (fastify) => {
  fastify.register(fpHelmet);
});