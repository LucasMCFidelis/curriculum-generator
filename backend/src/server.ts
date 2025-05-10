import fastify from "fastify";

const server = fastify();

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || "localhost";

server.get('/', async () => {
  return { message: 'Hello from Fastify + TypeScript!' };
});

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
