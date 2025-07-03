import { FastifyRequest, FastifyReply } from "fastify";
import { errorHandler } from "../utils/errorHandler";
import { ErrorCustomer } from "../ErrorCustomer";

export class AuthMiddleware {
  static async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      throw new ErrorCustomer(400, "Erro de validação", "Token não Fornecido");
    }

    const userToken = authorizationHeader.replace(/^Bearer\s+/i, "");

    try {
      const { valid, decoded } = await request.server.validateToken(userToken);

      if (!valid || !decoded) {
        throw new ErrorCustomer(
          401,
          "Erro de autenticação",
          "Token inválido ou expirado"
        );
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

  static async authenticateAndVerifyOwnership(
    request: FastifyRequest<{ Querystring: { userId: string } }>,
    reply: FastifyReply
  ) {
    await AuthMiddleware.authenticate(request, reply);
    await AuthMiddleware.verifyOwnership(request, reply);
  }
}
