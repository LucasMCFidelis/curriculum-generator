import { z } from "zod";

export const projectBaseSchema = z.object({
  projectTitle: z
    .string()
    .min(5, "Titulo deve conter no mínimo 5 caracteres")
    .max(100, "Titulo deve ter no máximo 100 caracteres"),
  projectDescription: z
    .string()
    .max(400, "Descrição do projeto deve ter no máximo 400 caracteres")
    .optional(),
  projectRepository: z
    .string()
    .url("Repositório deve ser uma URL válida")
    .or(z.literal(""))
    .optional(),
  projectDeploy: z
    .string()
    .url("Deploy deve ser uma URL válida")
    .or(z.literal(""))
    .optional(),
  projectStartDate: z.coerce.date({
    required_error: "A data de início é obrigatória.",
    invalid_type_error: "Data de início inválida.",
  }),
  projectEndDate: z.coerce
    .date({ invalid_type_error: "Data de término inválida." })
    .optional(),
});

export const createProjectSchema = projectBaseSchema.extend({
  type: z.literal("create"),
  projectFinished: z.boolean(),
});

export const updateProjectSchema = projectBaseSchema.partial().extend({
  type: z.literal("update"),
  projectFinished: z.boolean(),
});

export const projectFormSchema = z.discriminatedUnion("type", [
  createProjectSchema,
  updateProjectSchema,
]);


export type ProjectCreateSchemaDTO = z.infer<typeof createProjectSchema>;
export type ProjectUpdateSchemaDTO = z.infer<typeof updateProjectSchema>;
export type ProjectFormSchemaDTO = z.infer<typeof projectFormSchema>;
