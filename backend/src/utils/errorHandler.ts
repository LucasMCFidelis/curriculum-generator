import { FastifyReply } from "fastify";
import { ZodError } from "zod";
import { ErrorCustomer } from "../ErrorCustomer";

export function errorHandler(error: unknown | ErrorCustomer, reply: FastifyReply) {
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
  
  if (error instanceof ErrorCustomer) {
    return reply.status(error.status).send({
      error: error.error ?? "Erro desconhecido",
      message: error.message ?? "Algo deu errado",
    });
  }

  // Fallback para erro inesperado
  return reply.status(500).send({
    error: "Erro interno do servidor",
    message: "Ocorreu um erro inesperado",
  });
}
