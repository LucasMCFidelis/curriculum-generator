import { FastifyReply } from "fastify";

type CustomError = {
  status?: number;
  error?: string;
  message?: string;
};

export function errorHandler(error: unknown, reply: FastifyReply) {
  console.error(error);
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
