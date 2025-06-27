import { FastifyRequest, FastifyReply } from "fastify";
import { BaseCrud } from "../BaseCrud";
import { WorkExperienceService } from "../services/WorkExperienceService";
import { errorHandler } from "../utils/errorHandler";
import {
  CreateWorkExperienceDTO,
  FindWorkExperienceDTO,
} from "../schemas/workExperienceSchemas";

const workExperienceService = new WorkExperienceService();

export class WorkExperienceController extends BaseCrud {
  public async create(
    request: FastifyRequest<{
      Querystring: { userId: string };
      Body: CreateWorkExperienceDTO;
    }>,
    reply: FastifyReply
  ) {
    try {
      const newWorkExperience =
        await workExperienceService.createWorkExperience({
          ...request.body,
          workExperienceUserId: request.query.userId,
        });
      return reply.status(200).send(newWorkExperience);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }

  public async list(
    request: FastifyRequest<{ Querystring: FindWorkExperienceDTO }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const workExperiences = await workExperienceService.listWorkExperiences(
        request.query
      );
      return reply.status(200).send(workExperiences);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }

  public async get(
    request: FastifyRequest<{
      Querystring: { userId: string; workExperienceId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const workExperience = await workExperienceService.getWorkExperience(
        request.query.userId,
        request.query.workExperienceId
      );
      return reply.status(200).send(workExperience);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }

  public async delete(
    request: FastifyRequest<{
      Querystring: { userId: string; workExperienceId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const workExperienceDeleted =
        await workExperienceService.deleteWorkExperience(
          request.query.userId,
          request.query.workExperienceId
        );
      return reply
        .status(201)
        .send({
          message: "Experiencia profissional deletada com sucesso",
          workExperienceDeleted,
        });
    } catch (error) {
      return errorHandler(error, reply);
    }
  }

  public async update(
    request: FastifyRequest<{
      Querystring: { userId: string; workExperienceId: string };
      Body: Partial<CreateWorkExperienceDTO>;
    }>,
    reply: FastifyReply
  ) {
    try {
      const workExperienceUpdated =
        await workExperienceService.updateWorkExperience(
          request.query.userId,
          request.query.workExperienceId,
          request.body
        );
      return reply
        .status(201)
        .send({
          message: "Experiencia profissional atualizada com sucesso",
          workExperienceUpdated,
        });
    } catch (error) {
      return errorHandler(error, reply);
    }
  }
}
