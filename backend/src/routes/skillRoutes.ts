import { FastifyInstance } from "fastify";
import { SkillController } from "../controllers/SkillController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const skillController = new SkillController();

export async function skillRoutes(server: FastifyInstance) {
  server.post(
    "/",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    skillController.create
  );
  server.get(
    "/list",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    skillController.list
  );
  server.get(
    "/",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    skillController.get
  );
  server.put(
    "/",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    skillController.update
  );
  server.delete(
    "/",
    { preHandler: AuthMiddleware.authenticateAndVerifyOwnership },
    skillController.delete
  );
}
