import z from "zod";
import { formSkillCreate } from "./formSkillCreate";

export const formSkillUpdate = z.object({
  skillTitle: formSkillCreate.shape.skillTitle.optional(),
  skillDescription: formSkillCreate.shape.skillDescription,
  skillType: formSkillCreate.shape.skillType.optional(),
  skillTypeCustom: formSkillCreate.shape.skillTypeCustom,
});

export type formSkillUpdateDTO = z.infer<typeof formSkillUpdate>;
