import { FastifyRequest, FastifyReply } from "fastify";
import { BaseCrud } from "../BaseCrud";
import { errorHandler } from "../utils/errorHandler";
import { SkillService } from "../services/SkillService";
import {
  CreateSkillDTO,
  FindSkillDTO,
  UpdateSkillDTO,
} from "../schemas/skillSchemas";

const skillService = new SkillService();

export class SkillController extends BaseCrud {
  public async create(
    request: FastifyRequest<{
      Body: CreateSkillDTO;
      Querystring: { userId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const newSkill = await skillService.createSkill(
        request.body,
        request.query.userId
      );
      return reply.status(200).send(newSkill);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }

  public async list(
    request: FastifyRequest<{ Querystring: FindSkillDTO }>,
    reply: FastifyReply
  ) {
    try {
      const userSkills = await skillService.listSkills(request.query);
      return reply.status(200).send(userSkills);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }

  public async get(
    request: FastifyRequest<{
      Querystring: { userId: string; skillId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const skill = await skillService.getSkill({
        userId: request.query.userId,
        skillId: request.query.skillId,
      });
      return reply.status(200).send(skill);
    } catch (error) {
      return errorHandler(error, reply);
    }
  }

  public async update(
    request: FastifyRequest<{
      Querystring: { userId: string; skillId: string };
      Body: UpdateSkillDTO;
    }>,
    reply: FastifyReply
    ) {
      try {
        const skillUpdated = await skillService.updateSkill({
          userId: request.query.userId,
          skillId: request.query.skillId,
          dataUpdate: request.body,
        });
        return reply
          .status(201)
          .send({ message: "Habilidade atualizada com sucesso", skillUpdated });
      } catch (error) {
        return errorHandler(error, reply);
      }
    }
 
   public async delete(
    request: FastifyRequest<{
      Querystring: { userId: string; skillId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const skillDeleted = await skillService.deleteSkill(request.query);
      return reply
        .status(201)
        .send({
          message: `Habilidade ${skillDeleted.skillTitle} deletado com sucesso`,
        });
    } catch (error) {
      return errorHandler(error, reply);
    }
  }
}
