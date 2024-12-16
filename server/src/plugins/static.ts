import fp from "fastify-plugin";
import path from "node:path";
import fs from "node:fs";
import fsStatic, { FastifyStaticOptions } from "@fastify/static";

export default fp<FastifyStaticOptions>(async (fastify, opts) => {
  await fs.promises.mkdir(path.join(__dirname, "../public"), { recursive: true });
  fastify.register(fsStatic, {
    root: path.join(__dirname, "../public")
  });
});