/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Server, ServerOptions } from "socket.io";
import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";

export type FastifySocketioOptions = Partial<ServerOptions> & {
  preClose?: (done: Function) => void
}

export default fp<FastifySocketioOptions>(
  async function (fastify, opts: FastifySocketioOptions) {
    const pubClient = new Redis({
      db: 1,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      family: 4,
    });
    const subClient = pubClient.duplicate();
    opts = {
      ...opts,
      adapter: createAdapter(pubClient, subClient),
    };
    function defaultPreClose(done: Function) {
      (fastify as any).io.local.disconnectSockets(true);
      done();
    }
    fastify.decorate("io", new Server(fastify.server, opts));
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
  },
  { fastify: ">=4.x.x", name: "fastify-socket.io" },
);

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}