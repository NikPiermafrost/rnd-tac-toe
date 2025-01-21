import fp from "fastify-plugin";
import fpRedis, { FastifyRedisPluginOptions } from "@fastify/redis";

export default fp<FastifyRedisPluginOptions>(async (fastify, opts) => {
  fastify.register(fpRedis, {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || "0", 10),
    family: 4,
    enableAutoPipelining: true,
  });
});