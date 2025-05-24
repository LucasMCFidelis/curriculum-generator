import { FastifyRequest, FastifyReply } from "fastify";
import { BaseCrud } from "../BaseCrud";
import { WorkExperienceService } from "../services/WorkExperienceService";
import { errorHandler } from "../utils/errorHandler";
import { CreateWorkExperienceDTO, FindWorkExperienceDTO } from "../schemas/workExperienceSchemas";

const workExperienceService = new WorkExperienceService();

export class WorkExperienceController extends BaseCrud {
    public async create(request: FastifyRequest<{Querystring: {userId: string}, Body: CreateWorkExperienceDTO}>, reply: FastifyReply) {
        try {
            const newWorkExperience = await workExperienceService.createWorkExperience({...request.body, workExperienceUserId: request.query.userId})
            return reply.status(200).send(newWorkExperience)
        } catch (error) {
            return errorHandler(error, reply)
        }
    }

    public async list(request: FastifyRequest<{Querystring: FindWorkExperienceDTO}>, reply: FastifyReply): Promise<void> {
        try {
            const workExperiences = await workExperienceService.listWorkExperiences(request.query)
            return reply.status(200).send(workExperiences)
        } catch (error) {
            return errorHandler(error, reply)
        }
    }
}
