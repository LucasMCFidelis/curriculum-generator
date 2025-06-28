import { prisma } from "../lib/prisma";
import {
  CreateProjectDTO,
  createProjectSchema,
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
}
