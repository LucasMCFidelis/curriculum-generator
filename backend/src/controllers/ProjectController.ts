import { FastifyRequest, FastifyReply } from "fastify";
import { BaseCrud } from "../BaseCrud";
import { ProjectService } from "../services/ProjectService";
import {
  CreateProjectDTO,
  FindProjectsDTO,
  UpdateProjectDTO,
} from "../schemas/projectSchemas";
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

  public async get(
    request: FastifyRequest<{
      Querystring: { userId: string; projectId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const projectFind = await projectService.getProject({
        userId: request.query.userId,
        projectId: request.query.projectId,
      });
      return reply.status(200).send(projectFind);
    } catch (error) {
      errorHandler(error, reply);
    }
  }

  public async list(
    request: FastifyRequest<{
      Querystring: { userId: string } & FindProjectsDTO;
    }>,
    reply: FastifyReply
  ) {
    try {
      const projects = await projectService.listProjects({
        userId: request.query.userId,
        projectTextContains: request.query.projectTextContains,
      });
      return reply.status(200).send(projects);
    } catch (error) {
      errorHandler(error, reply);
    }
  }

  public async delete(
    request: FastifyRequest<{
      Querystring: { userId: string; projectId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const projectDeleted = await projectService.deleteProject({
        userId: request.query.userId,
        projectId: request.query.projectId,
      });
      return reply.status(200).send({
        message: `Projeto ${projectDeleted.projectTitle} deletado com sucesso`,
      });
    } catch (error) {
      errorHandler(error, reply);
    }
  }

  public async update(
    request: FastifyRequest<{
      Querystring: { userId: string; projectId: string };
      Body: UpdateProjectDTO;
    }>,
    reply: FastifyReply
  ) {
    try {
      const projectUpdated = await projectService.updateProject({
        userId: request.query.userId,
        projectId: request.query.projectId,
        data: request.body,
      });
      return reply.status(200).send({
        message: `Projeto ${projectUpdated.projectTitle} deletado com sucesso`,
        projectUpdated,
      });
    } catch (error) {
      errorHandler(error, reply);
    }
  }
}
