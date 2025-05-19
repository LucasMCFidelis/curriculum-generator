import z from "zod";
import { userIdSchema } from "./userSchemas";

export const skillIdSchema = z.object({
  skillId: z.string().uuid("skillId deve ser um id válido no padrão uuid"),
});

export const createSkillSchema = z.object({
  skillTitle: z
    .string()
    .min(1, "O título é obrigatório.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  skillDescription: z
    .string()
    .max(250, "A descrição deve ter no máximo 250 caracteres.")
    .optional(),
  skillType: z
    .string()
    .min(1, "O tipo é obrigatório.")
    .max(100, "O tipo deve ter no máximo 100 caracteres."),
});

export const findSkillSchema = z.object({
  userId: userIdSchema.shape.userId.optional(),
  skillId: skillIdSchema.shape.skillId.optional(),
  skillType: z.string().optional(),
  titleContains: z.string().optional(),
});


export type SkillIdDTO = z.infer<typeof skillIdSchema>;
export type CreateSkillDTO = z.infer<typeof createSkillSchema>;
export type FindSkillDTO = z.infer<typeof findSkillSchema>
