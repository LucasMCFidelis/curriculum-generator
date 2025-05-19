import { prisma } from "../lib/prisma";
import { CreateSkillDTO, createSkillSchema } from "../schemas/skillSchemas";
import { UserService } from "./UserService";

const userService = new UserService()

export class SkillService {
    async createSkill(data: CreateSkillDTO, userId: string){
        const validatedData = await createSkillSchema.parseAsync(data)
        const userRequest = await userService.getUserByIdOrEmail(userId)

        return await prisma.skill.create({data: {...validatedData, skillUserId: userId} })
    }
}
