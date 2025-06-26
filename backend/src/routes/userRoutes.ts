import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const userController = new UserController();

export async function userRoutes(server: FastifyInstance) {
  server.post("/", userController.create);
  server.get(
    "/",
    { preHandler: [AuthMiddleware.authenticateAndVerifyOwnership] },
    userController.get.bind(userController)
  );
  server.delete(
    "/",
    { preHandler: [AuthMiddleware.authenticateAndVerifyOwnership] },
    userController.delete
  );
  server.put(
    "/",
    { preHandler: [AuthMiddleware.authenticateAndVerifyOwnership] },
    userController.update
  );
  server.post("/login", userController.login);
}
