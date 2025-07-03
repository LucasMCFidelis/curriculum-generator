import z from "zod";

export const optionalUrlField = (message: string) =>
  z
    .string()
    .max(255, "URL muito longa")
    .optional()
    .transform((val) => (val === undefined ? "" : val))
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message,
    });
