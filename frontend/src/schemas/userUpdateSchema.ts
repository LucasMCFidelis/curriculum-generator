import z from "zod";
import { userCadastreSchema } from "./userCadastreSchema";

const userCadastreShape = userCadastreSchema.shape;

export const userUpdateSchema = z.object({
  userName: userCadastreShape.userName.optional(),
  userEmail: userCadastreShape.userEmail.optional(),
  userCity: userCadastreShape.userCity,
  userPortfolio: userCadastreShape.userPortfolio,
  userGitHub: userCadastreShape.userGitHub,
  userLinkedIn: userCadastreShape.userLinkedIn,
  userResume: userCadastreShape.userResume,
});

export type UserUpdateSchemaDTO = z.infer<typeof userUpdateSchema>;
