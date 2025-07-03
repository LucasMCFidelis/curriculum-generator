import z from "zod";
import { skillCreateSchema } from "./skillCreateSchema";

export const skillUpdateSchema = z.object({
  skillTitle: skillCreateSchema.shape.skillTitle.optional(),
  skillDescription: skillCreateSchema.shape.skillDescription,
  skillType: skillCreateSchema.shape.skillType.optional(),
  skillTypeCustom: skillCreateSchema.shape.skillTypeCustom,
});

export type SkillUpdateSchemaDTO = z.infer<typeof skillUpdateSchema>;
