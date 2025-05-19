import { prisma } from "../lib/prisma";
import {
  CreateSkillDTO,
  createSkillSchema,
  FindSkillDTO,
  findSkillSchema,
  skillIdSchema,
} from "../schemas/skillSchemas";
import { UserService } from "./UserService";

const userService = new UserService();

export class SkillService {
  async createSkill(data: CreateSkillDTO, userId: string) {
    const validatedData = await createSkillSchema.parseAsync(data);
    const userRequest = await userService.getUserByIdOrEmail(userId);

    return await prisma.skill.create({
      data: { ...validatedData, skillUserId: userId },
    });
  }

  async listSkills({
    userId,
    skillId,
    skillType,
    titleContains,
  }: FindSkillDTO) {
    await Promise.all([
      userService.getUserByIdOrEmail(userId),
      findSkillSchema.parseAsync({ userId, skillId, skillType, titleContains }),
    ]);

    let skills;
    try {
      skills = await prisma.skill.findMany({
        where: {
          ...(userId && { skillUserId: userId }),
          ...(skillId && { skillId }),
          ...(skillType && { skillType }),
          ...(titleContains && {
            skillTitle: {
              contains: titleContains,
              mode: "insensitive",
            },
          }),
        },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao buscar habilidade",
      };
    }

    if (skills.length === 0) {
      throw {
        status: 404,
        error: "Erro Not Found",
        message: "Nenhuma habilidade encontrada com as informações fornecidas",
      };
    }

    return skills;
  }

  async getSkill({ userId, skillId }: { userId: string; skillId: string }) {
    await Promise.all([
      userService.getUserByIdOrEmail(userId),
      skillIdSchema.parseAsync({ skillId }),
    ]);

    let skill;
    try {
      skill = await prisma.skill.findUnique({ where: { skillId } });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro interno ao realizar busca de habilidade",
      };
    }

    if (!skill) {
      throw {
        status: 404,
        error: "Erro Not Found",
        message: "Nenhuma habilidade encontrada com a skillId fornecida",
      };
    }

    return skill;
  }
}
