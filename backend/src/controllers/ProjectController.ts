import { FastifyRequest, FastifyReply } from "fastify";
import { BaseCrud } from "../BaseCrud";
import { ProjectService } from "../services/ProjectService";
import { CreateProjectDTO } from "../schemas/projectSchemas";
import { errorHandler } from "../utils/errorHandler";

const projectService = new ProjectService();

export class ProjectController extends BaseCrud {
  public async create(
    request: FastifyRequest<{
      Querystring: { userId: string };
      Body: Omit<CreateProjectDTO, "projectUserId">;
    }>,
    reply: FastifyReply
  ) {
    try {
      const newProject = await projectService.createProject({
        ...request.body,
        projectUserId: request.query.userId,
      });
      return reply.status(200).send(newProject);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }
}
