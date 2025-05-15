import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

export async function userRoutes(server: FastifyInstance) {
    server.post("/", userController.create)
    server.get("/", userController.get.bind(userController))
    server.delete("/", userController.delete)
    server.put("/", userController.update)
    server.post("/login", userController.login)
}
