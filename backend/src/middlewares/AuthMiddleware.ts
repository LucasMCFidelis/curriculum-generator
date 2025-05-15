import { FastifyRequest, FastifyReply } from "fastify";
import { errorHandler } from "../utils/errorHandler";

export class AuthMiddleware {
  static async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      throw {
        status: 400,
        error: "Erro de validação",
        message: "Token não Fornecido",
      };
    }

    try {
      const { valid, decoded } = await request.server.validateToken(
        authorizationHeader
      );

      if (!valid || !decoded) {
        throw {
          status: 401,
          error: "Erro de autenticação",
          message: "Token inválido ou expirado",
        };
      }

      request.user = decoded as TokenPayload;
    } catch (error) {
      errorHandler(error, reply);
    }
  }

  static async verifyOwnership(
    request: FastifyRequest<{ Querystring: { userId: string } }>,
    reply: FastifyReply
  ) {
    const loggedUser = request.user;
    const requestedUserId = request.query.userId;

    if (loggedUser?.userId !== requestedUserId) {
      return reply.status(403).send({
        message: "Você não tem permissão para acessar este recurso",
        error: "Forbidden",
      });
    }
  }

  static async authenticateAndVerifyOwnership(request: FastifyRequest<{ Querystring: { userId: string } }>,
    reply: FastifyReply){
      await AuthMiddleware.authenticate(request, reply)
      await AuthMiddleware.verifyOwnership(request, reply)
  }
}
