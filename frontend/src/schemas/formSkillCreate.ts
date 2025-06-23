import z from "zod";

export const formSkillCreate = z.object({
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

export type formSkillCreateDTO = z.infer<typeof formSkillCreate>;
