import { z } from "zod";
import { formUserCadastreSchema } from "./formUserCadastreSchema";

const userCadastreShape = formUserCadastreSchema.shape;

export const formLoginSchema = z.object({
  userEmail: userCadastreShape.userEmail,
  userPassword: userCadastreShape.userPassword,
});

export type formLoginDTO = z.infer<typeof formLoginSchema>;
