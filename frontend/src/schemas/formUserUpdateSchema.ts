import z from "zod";
import { formUserCadastreSchema } from "./formUserCadastreSchema";

const userCadastreShape = formUserCadastreSchema.shape;

export const formUserUpdateSchema = z.object({
  userName: userCadastreShape.userName.optional(),
  userEmail: userCadastreShape.userEmail.optional(),
  userCity: userCadastreShape.userCity,
  userPortfolio: userCadastreShape.userPortfolio,
  userGitHub: userCadastreShape.userGitHub,
  userLinkedIn: userCadastreShape.userLinkedIn,
  userResume: userCadastreShape.userResume,
});

export type formUserUpdateSchemaDTO = z.infer<typeof formUserUpdateSchema>;
