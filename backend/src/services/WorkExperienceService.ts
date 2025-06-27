import { prisma } from "../lib/prisma";
import {
  CreateWorkExperienceDTO,
  createWorkExperienceSchema,
  FindWorkExperienceDTO,
  findWorkExperienceSchema,
  updateWorkExperienceSchema,
  workExperienceIdSchema,
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

    return newWorkExperience;
  }

  async listWorkExperiences(filters: FindWorkExperienceDTO) {
    const [filtersValidated, _] = await Promise.all([
      findWorkExperienceSchema.parseAsync(filters),
      userService.getUserByIdOrEmail(filters.userId),
    ]);

    const {
      userId,
      workExperienceCompany,
      workExperienceFinished,
      workExperiencePosition,
    } = filtersValidated;

    let workExperiences;
    try {
      workExperiences = await prisma.workExperience.findMany({
        where: {
          ...(userId && { workExperienceUserId: userId }),
          ...(workExperienceCompany && {
            workExperienceCompany: {
              contains: workExperienceCompany,
              mode: "insensitive",
            },
          }),
          ...(workExperienceFinished && { workExperienceFinished }),
          ...(workExperiencePosition && {
            workExperiencePosition: {
              contains: workExperiencePosition,
              mode: "insensitive",
            },
          }),
        },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao listar work experiences",
      };
    }

    if (workExperiences.length === 0) {
      throw {
        status: 404,
        error: "Erro Not Found",
        message: "Nenhuma work experience encontrada com os filtros informados",
      };
    }

    return workExperiences;
  }

  async getWorkExperience(userId: string, workExperienceId: string) {
    await Promise.all([
      workExperienceIdSchema.parseAsync({ workExperienceId }),
      userService.getUserByIdOrEmail(userId),
    ]);

    let workExperience;
    try {
      workExperience = await prisma.workExperience.findUnique({
        where: { workExperienceUserId: userId, workExperienceId },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao buscar work experience",
      };
    }

    if (!workExperience) {
      throw {
        status: 404,
        error: "Erro Not Found",
        message: "Nenhuma work experience encontrada com o id informado",
      };
    }

    return workExperience;
  }

  async deleteWorkExperience(userId: string, workExperienceId: string) {
    await this.getWorkExperience(userId, workExperienceId);

    let workExperienceDeleted;
    try {
      workExperienceDeleted = prisma.workExperience.delete({
        where: { workExperienceUserId: userId, workExperienceId },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao deletar work experience",
      };
    }

    return workExperienceDeleted;
  }

  async updateWorkExperience(
    userId: string,
    workExperienceId: string,
    data: Partial<CreateWorkExperienceDTO>
  ) {
    const [dataValidated, _] = await Promise.all([
      updateWorkExperienceSchema.parseAsync(data),
      this.getWorkExperience(userId, workExperienceId),
    ]);

    let workExperienceUpdated;
    try {
      workExperienceUpdated = await prisma.workExperience.update({
        where: { workExperienceUserId: userId, workExperienceId },
        data: dataValidated,
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao atualizar work experience",
      };
    }

    return workExperienceUpdated;
  }
}
