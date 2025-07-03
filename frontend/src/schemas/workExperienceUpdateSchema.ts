import z from "zod";
import { workExperienceCreateSchema } from "./workExperienceCreateSchema";

export const workExperienceUpdateSchema = z.object({
  workExperiencePosition:
    workExperienceCreateSchema.shape.workExperiencePosition.optional(),
  workExperienceDescription:
    workExperienceCreateSchema.shape.workExperienceDescription,
  workExperienceCompany:
    workExperienceCreateSchema.shape.workExperienceCompany.optional(),
  workExperienceFinished:
    workExperienceCreateSchema.shape.workExperienceFinished,
  workExperienceStartDate:
    workExperienceCreateSchema.shape.workExperienceStartDate.optional(),
  workExperienceEndDate: workExperienceCreateSchema.shape.workExperienceEndDate,
});

export type WorkExperienceUpdateSchemaDTO = z.infer<
  typeof workExperienceUpdateSchema
>;
