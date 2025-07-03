import { z } from "zod";
import { userCadastreSchema } from "./userCadastreSchema";

const userCadastreShape = userCadastreSchema.shape;

export const loginSchema = z.object({
  userEmail: userCadastreShape.userEmail,
  userPassword: userCadastreShape.userPassword,
});

export type LoginSchemaDTO = z.infer<typeof loginSchema>;
