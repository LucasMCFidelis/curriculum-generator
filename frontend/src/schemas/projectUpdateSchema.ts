import z from "zod";
import { projectCreateSchema } from "./projectCreateSchema";

export const projectUpdateSchema = z.object({
  projectTitle: projectCreateSchema.shape.projectTitle.optional(),
  projectDescription: projectCreateSchema.shape.projectDescription,
  projectRepository: projectCreateSchema.shape.projectRepository,
  projectDeploy: projectCreateSchema.shape.projectDeploy,
  projectFinished: projectCreateSchema.shape.projectFinished,
  projectStartDate: projectCreateSchema.shape.projectStartDate.optional(),
  projectEndDate: projectCreateSchema.shape.projectEndDate,
});

export type ProjectUpdateSchemaDTO = z.infer<typeof projectUpdateSchema>;
