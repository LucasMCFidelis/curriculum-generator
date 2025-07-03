import z from "zod";

const optionalUrlField = (message: string) =>
  z
    .string()
    .max(255, "URL muito longa")
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message,
    });

export const userCadastreSchema = z.object({
  userName: z
    .string()
    .min(3, "O nome precisa ter no mínimo 3 caracteres")
    .max(150, "O nome deve ter no máximo 150 caracteres"),
  userEmail: z
    .string()
    .email("Email inválido")
    .max(150, "Email deve conter no máximo 150 caracteres"),
  userCity: z
    .string()
    .max(50, "A cidade deve ter no máximo 50 caracteres")
    .optional(),
  userPortfolio: optionalUrlField("Portfolio deve ser uma url valida"),
  userGitHub: optionalUrlField("GitHub deve ser uma url valida"),
  userLinkedIn: optionalUrlField("LinkedIn deve ser uma url valida"),
  userResume: z.string().max(400, "Texto do resumo muito longo").optional(),
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

export type UserCadastreSchemaDTO = z.infer<typeof userCadastreSchema>;
