import fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import authPlugin from "./plugin/auth";
import { skillRoutes } from "./routes/skillRoutes";
import cors from "@fastify/cors";

const server = fastify();

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
});

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || "localhost";

server.get("/", async () => {
  return { message: "Hello from Fastify + TypeScript!" };
});
server.register(authPlugin);
server.register(userRoutes, { prefix: "/users" });
server.register(skillRoutes, { prefix: "/skills" });

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
