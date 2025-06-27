import { FastifyInstance } from "fastify";
import { ProjectController } from "../controllers/ProjectController";

const projectController = new ProjectController();

export async function projectRoutes(server: FastifyInstance) {}
