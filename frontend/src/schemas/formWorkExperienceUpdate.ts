import z from "zod";
import { formWorkExperienceCreate } from "./formWorkExperienceCreate";

export const formWorkExperienceUpdateSchema = z.object({
  workExperiencePosition:
    formWorkExperienceCreate.shape.workExperiencePosition.optional(),
  workExperienceDescription:
    formWorkExperienceCreate.shape.workExperienceDescription,
  workExperienceCompany:
    formWorkExperienceCreate.shape.workExperienceCompany.optional(),
  workExperienceFinished:
    formWorkExperienceCreate.shape.workExperienceFinished,
  workExperienceStartDate:
    formWorkExperienceCreate.shape.workExperienceStartDate.optional(),
  workExperienceEndDate: formWorkExperienceCreate.shape.workExperienceEndDate,
});

export type formWorkExperienceUpdateDTO = z.infer<
  typeof formWorkExperienceUpdateSchema
>;
