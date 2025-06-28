import { prisma } from "../lib/prisma";
import {
  CreateProjectDTO,
  createProjectSchema,
  projectIdSchema,
} from "../schemas/projectSchemas";
import { UserService } from "./UserService";

const userService = new UserService();

export class ProjectService {
  async createProject(data: CreateProjectDTO) {
    const [dataValidated, _] = await Promise.all([
      createProjectSchema.parseAsync(data),
      userService.getUserByIdOrEmail(data.projectUserId),
    ]);

    let newProject;
    try {
      newProject = await prisma.project.create({ data: dataValidated });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao criar projeto",
      };
    }

    return newProject;
  }

  async getProject({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) {
    await Promise.all([
      projectIdSchema.parseAsync({projectId}),
      
      userService.getUserByIdOrEmail(userId),
    ]);

    let projectFind;
    try {
      projectFind = await prisma.project.findUnique({
        where: { projectUserId: userId, projectId },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao buscar projeto",
      };
    }

    if (!projectFind) {
      throw {
        status: 404,
        error: "Erro Not Found",
        message: "Nenhum projeto encontrado com o id informado",
      };
    }

    return projectFind;
  }
}
