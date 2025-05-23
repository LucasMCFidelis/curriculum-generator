import { FastifyInstance } from "fastify";
import { WorkExperienceController } from "../controllers/WorkExperienceController";

const workExperienceController = new WorkExperienceController()

export async function workExperienceRoutes(server: FastifyInstance) {}
