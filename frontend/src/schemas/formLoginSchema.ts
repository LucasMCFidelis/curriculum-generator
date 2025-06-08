import { z } from "zod";

export const formLoginSchema = z.object({
  userEmail: z
    .string()
    .email("Email inválido")
    .max(150, "Email deve conter no máximo 150 caracteres"),
  userPassword: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .refine((val) => /[0-9]/.test(val), {
      message: "A senha deve conter ao menos um número",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "A senha deve conter ao menos um caractere especial",
    }),
});
