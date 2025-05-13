import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService";
import { CreateUserDTO } from "../schemas/userSchemas";
import { errorHandler } from "../utils/errorHandler";

const userService = new UserService();

export class UserController {
  async create(
    request: FastifyRequest<{ Body: CreateUserDTO }>,
    reply: FastifyReply
  ) {
    try {
      const newUser = await userService.createUser(request.body);
      return reply.status(200).send(newUser);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }
}
