import { RefinementCtx, z } from "zod";
import { userIdSchema } from "./userSchemas";

function validateWorkExperience(data: any, ctx: RefinementCtx) {
  if (data.workExperienceFinished && !data.workExperienceEndDate) {
    ctx.addIssue({
      code: "custom",
      path: ["workExperienceEndDate"],
      message:
        "Data de término é obrigatória quando a experiência já foi finalizada.",
    });
  }

  if (data.workExperienceEndDate && data.workExperienceStartDate) {
    const startDate = new Date(data.workExperienceStartDate);
    const endDate = new Date(data.workExperienceEndDate);

    if (startDate > endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["workExperienceEndDate"],
        message: "Data de término não pode ser anterior à de início.",
      });
    }
  }
}

export const workExperienceIdSchema = z.object({
  workExperienceId: z
    .string()
    .uuid("workExperienceId deve ser um id válido no padrão uuid"),
});

const baseWorkExperienceSchema = z.object({
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

export const createWorkExperienceSchema = baseWorkExperienceSchema.superRefine(
  validateWorkExperience
);

export const findWorkExperienceSchema = z.object({
  userId: userIdSchema.shape.userId,
  workExperiencePosition: z.string().optional(),
  workExperienceCompany: z.string().optional(),
  workExperienceFinished: z.boolean().optional(),
});

export const updateWorkExperienceSchema = z
  .object({
    workExperiencePosition:
      baseWorkExperienceSchema.shape.workExperiencePosition.optional(),
    workExperienceDescription:
      baseWorkExperienceSchema.shape.workExperienceDescription,
    workExperienceCompany:
      baseWorkExperienceSchema.shape.workExperienceCompany.optional(),
    workExperienceFinished:
      baseWorkExperienceSchema.shape.workExperienceFinished.optional(),
    workExperienceStartDate:
      baseWorkExperienceSchema.shape.workExperienceStartDate.optional(),
    workExperienceEndDate: baseWorkExperienceSchema.shape.workExperienceEndDate,
  })
  .superRefine(validateWorkExperience);

export type CreateWorkExperienceDTO = z.infer<
  typeof createWorkExperienceSchema
>;
export type FindWorkExperienceDTO = z.infer<typeof findWorkExperienceSchema>;
