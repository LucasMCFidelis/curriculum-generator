import z from "zod";

export const workExperienceCreateSchema = z.object({
  workExperiencePosition: z
    .string()
    .min(1, "O cargo é obrigatório.")
    .max(50, "O cargo deve ter no máximo 50 caracteres."),
  workExperienceDescription: z
    .string()
    .max(400, "A descrição deve ter no máximo 400 caracteres.")
    .optional(),
  workExperienceCompany: z
    .string()
    .min(1, "A empresa é obrigatória.")
    .max(50, "O nome da empresa deve ter no máximo 50 caracteres."),
  workExperienceFinished: z.boolean(),
  workExperienceStartDate: z.coerce.date({
    required_error: "A data de início é obrigatória.",
    invalid_type_error: "Data de início inválida.",
  }),
  workExperienceEndDate: z.coerce
    .date({ invalid_type_error: "Data de término inválida." })
    .optional(),
});

export type WorkExperienceCreateSchemaDTO = z.infer<
  typeof workExperienceCreateSchema
>;
