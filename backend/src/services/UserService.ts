import { prisma } from "../lib/prisma";
import {
  CreateUserDTO,
  createUserSchema,
  userEmailSchema,
  userIdSchema,
} from "../schemas/userSchemas";
import { hashPassword } from "../utils/hashPassword";

export class UserService {
  private async checkExistingUser(userEmail: string) {
    userEmail = userEmail.toLowerCase();

    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { userEmail },
        select: { userEmail: true },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao verificar existência do usuário",
      };
    }

    if (existingUser) {
      throw {
        status: 409,
        error: "Erro de conflito",
        message: "Este email já está cadastrado",
      };
    }
  }

  async createUser(data: CreateUserDTO) {
    const validatedData = await createUserSchema.parseAsync(data);
    validatedData.userEmail = validatedData.userEmail.toLowerCase();

    await this.checkExistingUser(validatedData.userEmail);

    const hashedPassword = await hashPassword(data.userPassword);

    return await prisma.user.create({
      data: {
        ...validatedData,
        userPassword: hashedPassword,
      },
    });
  }

  async getUserByIdOrEmail(userId?: string, userEmail?: string) {
    if (!userId && !userEmail) {
      throw {
        status: 400,
        error: "Erro de validação",
        message: "Informe um userId ou userEmail para a busca",
      };
    }

    if (userId) {
      await userIdSchema.parseAsync({ userId });
    } else if (userEmail) {
      userEmail = userEmail.toLowerCase();
      await userEmailSchema.parseAsync({ userEmail });
    }

    let user;
    try {
      user = await prisma.user.findFirst({
        where: { OR: [{ userId }, { userEmail }] },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao buscar usuário",
      };
    }

    if (!user) {
      throw {
        status: 404,
        error: "Erro Not Found",
        message: "Nenhum usuário encontrado com o userId e userEmail fornecido",
      };
    }

    return user;
  }
}
