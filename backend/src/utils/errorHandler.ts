import { FastifyReply } from "fastify";
import { ZodError } from "zod";

type CustomError = {
  status?: number;
  error?: string;
  message?: string;
};

export function errorHandler(error: unknown, reply: FastifyReply) {
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return reply.status(400).send({
      error: "Erro de validação",
      fields: formattedErrors,
    });
  }
  
  if (typeof error === "object" && error !== null && "status" in error) {
    const typedError = error as CustomError;

    return reply.status(typedError.status ?? 500).send({
      error: typedError.error ?? "Erro desconhecido",
      message: typedError.message ?? "Algo deu errado",
    });
  }

  // Fallback para erro inesperado
  return reply.status(500).send({
    error: "Erro interno do servidor",
    message: "Ocorreu um erro inesperado",
  });
}
