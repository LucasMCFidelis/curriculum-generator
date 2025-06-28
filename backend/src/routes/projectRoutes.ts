import { FastifyInstance } from "fastify";
import { ProjectController } from "../controllers/ProjectController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const projectController = new ProjectController();

export async function projectRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    projectController.create
  );
}
