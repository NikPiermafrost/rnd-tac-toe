import fp from "fastify-plugin";
import fsCompress from "@fastify/compress";

export default fp(async (fastify) => {
  fastify.register(fsCompress, {
    global: true,
    encodings: ["br", "gzip", "deflate"],
  });
});