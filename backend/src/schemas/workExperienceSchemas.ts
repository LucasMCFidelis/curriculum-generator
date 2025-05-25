import { z } from "zod";
import { userIdSchema } from "./userSchemas";

export const workExperienceIdSchema = z.object({
  workExperienceId: z.string().uuid("workExperienceId deve ser um id válido no padrão uuid"),
});

export const createWorkExperienceSchema = z.object({
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
  workExperienceFinished: z.boolean().default(false),
  workExperienceStartDate: z.coerce.date({
    required_error: "A data de início é obrigatória.",
    invalid_type_error: "Data de início inválida.",
  }),
  workExperienceEndDate: z.coerce
    .date({ invalid_type_error: "Data de término inválida." })
    .optional(),
  workExperienceUserId: userIdSchema.shape.userId,
});

export const findWorkExperienceSchema = z.object({
  userId: userIdSchema.shape.userId,
  workExperiencePosition: z.string().optional(),
  workExperienceCompany: z.string().optional(),
  workExperienceFinished: z.boolean().optional(),
});

export type CreateWorkExperienceDTO = z.infer<
  typeof createWorkExperienceSchema
>;
export type FindWorkExperienceDTO = z.infer<typeof findWorkExperienceSchema>;
