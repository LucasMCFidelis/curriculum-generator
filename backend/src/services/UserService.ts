import { prisma } from "../lib/prisma";
import {
  CreateUserDTO,
  createUserSchema,
  LoginUserDTO,
  loginUserSchema,
  UpdateUserDTO,
  updateUserSchema,
  userEmailSchema,
  userIdSchema,
} from "../schemas/userSchemas";
import { comparePassword } from "../utils/comparePassword";
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

  async getUserByIdOrEmail(
    userId?: string,
    userEmail?: string,
    include?: UserRelations
  ) {
    if (userId) {
      await userIdSchema.parseAsync({ userId });
    } else if (userEmail) {
      userEmail = userEmail.toLowerCase();
      await userEmailSchema.parseAsync({ userEmail });
    } else {
      throw {
        status: 400,
        error: "Erro de validação",
        message: "Informe um userId ou userEmail para a busca",
      };
    }

    let user;
    try {
      user = await prisma.user.findFirst({
        where: { OR: [{ userId }, { userEmail }] },
        include,
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

  async deleteUser(userId: string) {
    const userDeleted = await this.getUserByIdOrEmail(userId);

    try {
      await prisma.user.delete({ where: { userId: userDeleted.userId } });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao deletar usuário",
      };
    }

    return userDeleted;
  }

  async updateUser(userId: string, data: UpdateUserDTO) {
    const userForUpdate = await this.getUserByIdOrEmail(userId);
    await updateUserSchema.parseAsync(data);

    if (data.userEmail && data.userEmail !== userForUpdate.userEmail) {
      data.userEmail = data.userEmail.toLowerCase();
      await this.checkExistingUser(data.userEmail);
    }

    let userUpdated;
    try {
      userUpdated = await prisma.user.update({
        where: { userId },
        data: {
          ...(data.userName && { userName: data.userName }),
          ...(data.userEmail &&
            data.userEmail !== userForUpdate.userEmail && {
              userEmail: data.userEmail,
            }),
          ...(data.userCity && { userCity: data.userCity }),
          ...(data.userPortfolio && { userPortfolio: data.userPortfolio }),
          ...(data.userGitHub && { userGitHub: data.userGitHub }),
          ...(data.userLinkedIn && { userLinkedIn: data.userLinkedIn }),
          ...(data.userResume && { userResume: data.userResume }),
        },
      });
    } catch (error) {
      throw {
        status: 500,
        error: "Erro no servidor",
        message: "Erro ao atualizar usuário",
      };
    }

    return userUpdated;
  }

  async loginUser(data: LoginUserDTO) {
    const [,user ] = await Promise.all([
      loginUserSchema.parseAsync(data),
      this.getUserByIdOrEmail(undefined, data.userEmail)
    ]);

    await comparePassword(data.userPassword, user.userPassword);

    return {
      userId: user.userId,
      userEmail: user.userEmail,
      userName: user.userName,
    };
  }
}
