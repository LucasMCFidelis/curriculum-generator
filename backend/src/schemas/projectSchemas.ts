import z from "zod";
import { optionalUrlField } from "./optionalUrlFieldSchema";
import { userIdSchema } from "./userSchemas";
import { validateDatesZod } from "../utils/validateDatesZod";

export const projectIdSchema = z.object({
  projectId: z.string().uuid("projectId deve ser um id válido no padrão uuid"),
});

const baseProjectSchema = z.object({
  projectTitle: z
    .string()
    .min(5, "Titulo do projeto é obrigatório")
    .max(100, "Titulo deve ter no máximo 100 caracteres"),
  projectDescription: z
    .string()
    .max(400, "Descrição do projeto deve ter no máximo 400 caracteres")
    .optional(),
  projectRepository: optionalUrlField("Repositório deve ser uma url valida"),
  projectDeploy: optionalUrlField("Deploy deve ser uma url valida"),
  projectFinished: z.boolean().optional().default(false),
  projectStartDate: z.coerce.date({
    required_error: "A data de início é obrigatória.",
    invalid_type_error: "Data de início inválida.",
  }),
  projectEndDate: z.coerce
    .date({ invalid_type_error: "Data de término inválida." })
    .optional(),
  projectUserId: userIdSchema.shape.userId,
});

export const createProjectSchema = baseProjectSchema.superRefine(
  (data, ctx) => {
    validateDatesZod({
      modelValidate: "project",
      ctx,
      itemFinished: data.projectFinished,
      itemStartDate: data.projectStartDate,
      itemEndDate: data.projectEndDate,
    });
  }
);

export const updateProjectSchema = z
  .object({
    projectTitle: baseProjectSchema.shape.projectTitle.optional(),
    projectDescription: baseProjectSchema.shape.projectDescription,
    projectRepository: baseProjectSchema.shape.projectRepository,
    projectDeploy: baseProjectSchema.shape.projectDeploy,
    projectFinished: baseProjectSchema.shape.projectFinished,
    projectStartDate: baseProjectSchema.shape.projectStartDate.optional(),
    projectEndDate: baseProjectSchema.shape.projectEndDate,
  })
  .superRefine((data, ctx) => {
    validateDatesZod({
      modelValidate: "project",
      ctx,
      itemFinished: data.projectFinished,
      itemStartDate: data.projectStartDate,
      itemEndDate: data.projectEndDate,
    });
  });

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;
