import { prisma } from "../lib/prisma";
import {
  CreateWorkExperienceDTO,
  createWorkExperienceSchema,
} from "../schemas/workExperienceSchemas";
import { UserService } from "./UserService";

const userService = new UserService();

export class WorkExperienceService {
  async createWorkExperience(data: CreateWorkExperienceDTO) {
    const [dataValidated, _] = await Promise.all([
      createWorkExperienceSchema.parseAsync(data),
      userService.getUserByIdOrEmail(data.workExperienceUserId),
    ]);

    let newWorkExperience;
    try {
      newWorkExperience = await prisma.workExperience.create({
        data: dataValidated,
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao criar work experience",
      };
    }

    return newWorkExperience
  }
}
