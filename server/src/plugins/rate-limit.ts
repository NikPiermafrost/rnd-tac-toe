import fp from "fastify-plugin";
import fsRateLimit, { FastifyRateLimitOptions } from "@fastify/rate-limit";

export default fp<FastifyRateLimitOptions>(async (fastify, opts) => {
  fastify.register(fsRateLimit, {
    global: true,
    allowList: ["127.0.0.1"],
    max: 10000,
    timeWindow: 1000,
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
      "retry-after": true
    }
  });
});