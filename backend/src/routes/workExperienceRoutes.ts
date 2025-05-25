import { FastifyInstance } from "fastify";
import { WorkExperienceController } from "../controllers/WorkExperienceController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const workExperienceController = new WorkExperienceController();

export async function workExperienceRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    workExperienceController.create
  );
  server.get(
    "/list",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    workExperienceController.list
  );
  server.get(
    "/",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    workExperienceController.get
  );
}
