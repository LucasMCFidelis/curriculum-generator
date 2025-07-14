import { ErrorCustomer } from "../ErrorCustomer";
import { prisma } from "../lib/prisma";
import {
  CreateProjectDTO,
  createProjectSchema,
  FindProjectsDTO,
  projectIdSchema,
  UpdateProjectDTO,
  updateProjectSchema,
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
      throw new ErrorCustomer(500, "Erro no servidor", "Erro ao criar projeto");
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
      projectIdSchema.parseAsync({ projectId }),

      userService.getUserByIdOrEmail(userId),
    ]);

    let projectFind;
    try {
      projectFind = await prisma.project.findUnique({
        where: { projectUserId: userId, projectId },
      });
    } catch (error) {
      throw new ErrorCustomer(
        500,
        "Erro no servidor",
        "Erro ao buscar projeto"
      );
    }

    if (!projectFind) {
      throw new ErrorCustomer(
        404,
        "Erro Not Found",
        "Nenhum projeto encontrado com o id informado"
      );
    }

    return projectFind;
  }

  async listProjects({
    userId,
    projectTextContains,
  }: { userId: string } & FindProjectsDTO) {
    await Promise.all([userService.getUserByIdOrEmail(userId)]);

    let projects;
    try {
      projects = await prisma.project.findMany({
        where: {
          projectUserId: userId,
          ...(projectTextContains && {
            OR: [
              {
                projectTitle: {
                  contains: projectTextContains,
                  mode: "insensitive",
                },
              },
              {
                projectDescription: {
                  contains: projectTextContains,
                  mode: "insensitive",
                },
              },
            ],
          }),
        },
      });
    } catch (error) {
      throw new ErrorCustomer(
        500,
        "Erro no servidor",
        "Erro ao buscar projetos"
      );
    }

    if (projects.length === 0) {
      throw new ErrorCustomer(
        404,
        "Erro Not Found",
        "Nenhum Projeto encontrado com as informações fornecidas"
      );
    }

    return projects;
  }

  async deleteProject({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) {
    await this.getProject({ userId, projectId });

    let projectDeleted;
    try {
      projectDeleted = await prisma.project.delete({ where: { projectId } });
    } catch (error) {
      throw new ErrorCustomer(
        500,
        "Erro no servidor",
        "Erro ao deletar projeto"
      );
    }

    return projectDeleted;
  }

  async updateProject({
    userId,
    projectId,
    data,
  }: {
    userId: string;
    projectId: string;
    data: UpdateProjectDTO;
  }) {
    const project = await this.getProject({ userId, projectId });
    const dataValidated = await updateProjectSchema.parseAsync({
      ...project,
      ...data,
      ...(!data.projectFinished && { projectEndDate: undefined }),
    });

    let projectUpdated;
    try {
      projectUpdated = await prisma.project.update({
        where: { projectId },
        data: {
          ...dataValidated,
          projectEndDate: dataValidated.projectFinished
            ? dataValidated.projectEndDate
            : null,
        },
      });
    } catch (error) {
      console.log(error);

      throw new ErrorCustomer(
        500,
        "Erro no servidor",
        "Erro ao atualizar projeto"
      );
    }

    return projectUpdated;
  }
}
