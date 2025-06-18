import z from "zod";

export const formUserCadastreSchema = z.object({
  userName: z
    .string()
    .min(3, "O nome precisa ter no mínimo 3 caracteres")
    .max(150, "O nome deve ter no máximo 150 caracteres"),
  userEmail: z
    .string()
    .email("Email inválido")
    .max(150, "Email deve conter no máximo 150 caracteres"),
  userCity: z.string().optional(),
  userPortfolio: z
    .string()
    .url("Portfolio deve ser uma url valida")
    .max(255, "URL do portfólio muito longa")
    .optional(),
  userGitHub: z
    .string()
    .url("GitHub deve ser uma url valida")
    .max(255, "URL do GitHub muito longa")
    .optional(),
  userLinkedIn: z
    .string()
    .url("LinkedIn deve ser uma url valida")
    .max(255, "URL do LinkedIn muito longa")
    .optional(),
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

export type formUserCadastreSchemaDTO = z.infer<typeof formUserCadastreSchema>;
