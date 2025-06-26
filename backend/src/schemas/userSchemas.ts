import { z } from "zod";

export const userIdSchema = z.object({
  userId: z.string().uuid("userId deve ser um id válido no padrão uuid"),
});
export const userEmailSchema = z.object({
  userEmail: z
    .string()
    .email("Email inválido")
    .max(150, "Email deve conter no máximo 150 caracteres"),
});
export const userPasswordSchema = z.object({
  userPassword: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .refine((val) => /[0-9]/.test(val), {
      message: "A senha deve conter ao menos um número",
    })
    .refine((val) => /[!@#$%^&*(),.?\":{}|<>]/.test(val), {
      message: "A senha deve conter ao menos um caractere especial",
    }),
});

const optionalUrlField = (message: string) =>
  z
    .string()
    .max(255, "URL muito longa")
    .optional()
    .transform((val)=> val === undefined ? "" : val)
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message,
    });

export const createUserSchema = z.object({
  userName: z
    .string()
    .min(3, "O nome precisa ter no mínimo 3 caracteres")
    .max(150, "O nome deve ter no máximo 150 caracteres"),
  userEmail: userEmailSchema.shape.userEmail,
  userPassword: userPasswordSchema.shape.userPassword,
  userCity: z.string().optional(),
  userPortfolio: optionalUrlField("Portfolio deve ser uma url valida"),
  userGitHub: optionalUrlField("GitHub deve ser uma url valida"),
  userLinkedIn: optionalUrlField("LinkedIn deve ser uma url valida"),
  userResume: z.string().max(400, "Texto do resumo muito longo").optional(),
});

export const updateUserSchema = z.object({
  userName: createUserSchema.shape.userName.optional(),
  userEmail: userEmailSchema.shape.userEmail.optional(),
  userCity: createUserSchema.shape.userCity,
  userPortfolio: createUserSchema.shape.userPortfolio,
  userGitHub: createUserSchema.shape.userGitHub,
  userLinkedIn: createUserSchema.shape.userLinkedIn,
  userResume: createUserSchema.shape.userResume,
});

export const loginUserSchema = z.object({
  userEmail: userEmailSchema.shape.userEmail,
  userPassword: userPasswordSchema.shape.userPassword,
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;
