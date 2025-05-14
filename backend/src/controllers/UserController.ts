import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService";
import { CreateUserDTO } from "../schemas/userSchemas";
import { errorHandler } from "../utils/errorHandler";

const userService = new UserService();

export class UserController {
  private parseRelationsFlags = (obj: Record<string, any>): UserRelations => {
    return {
      userProjects: obj.userProjects === "true",
      userSkills: obj.userSkills === "true",
      userWorkExperiences: obj.userWorkExperiences === "true",
      userCurriculums: obj.userCurriculums === "true",
    };
  };

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

  async get(
    request: FastifyRequest<{
      Querystring: { userId?: string; userEmail?: string } & UserRelations;
    }>,
    reply: FastifyReply
  ) {
    try {
      const { userId, userEmail, ...rawInclude } = request.query;
      const include = this.parseRelationsFlags(rawInclude);

      const user = await userService.getUserByIdOrEmail(
        userId,
        userEmail,
        include
      );
      return reply.status(200).send(user);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }
}
