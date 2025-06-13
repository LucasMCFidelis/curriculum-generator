import z from "zod";

export const formUserUpdateSchema = z.object({
  userName: z
    .string()
    .min(3, "O nome precisa ter no mínimo 3 caracteres")
    .max(150, "O nome deve ter no máximo 150 caracteres")
    .optional(),
  userEmail: z
    .string()
    .email("Email inválido")
    .max(150, "Email deve conter no máximo 150 caracteres")
    .optional(),
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
});

export type formUserUpdateSchemaDTO = z.infer<typeof formUserUpdateSchema>