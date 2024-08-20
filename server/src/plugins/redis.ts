import fp from "fastify-plugin";
import fpRedis, { FastifyRedisPluginOptions } from "@fastify/redis";

export default fp<FastifyRedisPluginOptions>(async (fastify, opts) => {
  fastify.register(fpRedis, {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    family: 4,
    enableAutoPipelining: true,
  });
});