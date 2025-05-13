import { prisma } from "../lib/prisma";
import { CreateUserDTO, createUserSchema } from "../schemas/userSchemas";
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
}
