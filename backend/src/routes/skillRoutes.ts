import { FastifyInstance } from "fastify";
import { SkillController } from "../controllers/SkillController";

const skillController = new SkillController();

export async function skillRoutes(server: FastifyInstance) {}
