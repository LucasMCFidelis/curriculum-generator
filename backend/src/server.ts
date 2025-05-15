import fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import authPlugin from "./plugin/auth";

const server = fastify();

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || "localhost";

server.get("/", async () => {
  return { message: "Hello from Fastify + TypeScript!" };
});
server.register(authPlugin)
server.register(userRoutes, { prefix: "/users" });

server
  .listen({ port: PORT, host: HOST })
  .then(() =>
    console.log(`
        Servidor rodando em http://${HOST}:${PORT}
        `)
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
