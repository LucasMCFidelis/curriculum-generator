import { z } from "zod";

const skillTypeSchema = z
  .string()
  .min(1, "O tipo é obrigatório.")
  .max(100, "O tipo deve ter no máximo 100 caracteres.");

export const skillBaseSchema = z.object({
  skillTitle: z
    .string()
    .min(1, "O título é obrigatório.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  skillDescription: z
    .string()
    .max(250, "A descrição deve ter no máximo 250 caracteres.")
    .optional(),
  skillType: skillTypeSchema,
  skillTypeCustom: skillTypeSchema.optional(),
});

export const createSkillSchema = skillBaseSchema.extend({
  type: z.literal("create"),
});

export const updateSkillSchema = skillBaseSchema.partial().extend({
  type: z.literal("update"),
});

export const skillFormSchema = z.discriminatedUnion("type", [
  createSkillSchema,
  updateSkillSchema,
]);

export type SkillCreateSchemaDTO = z.infer<typeof createSkillSchema>;
export type SkillUpdateSchemaDTO = z.infer<typeof updateSkillSchema>;
export type SkillFormSchemaDTO = z.infer<typeof skillFormSchema>;
