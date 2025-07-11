import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { LoginUserDTO } from "../schemas/userSchemas";
import { ErrorCustomer } from "../ErrorCustomer";

export default fp(async function (fastify: FastifyInstance) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error(
      "A variável ambiente JWT_SECRET deve obrigatoriamente ser definida"
    );
    return;
  }

  fastify.register(jwt, {
    secret: JWT_SECRET,
    sign: { expiresIn: "1h" },
  });

  fastify.decorate("generateToken", function (payload: TokenPayload) {
    return this.jwt.sign(payload);
  });

  fastify.decorate("validateToken", async function (token: string) {
    try {
      const decoded = this.jwt.verify(token);
      if (typeof decoded !== "object" || decoded === null) {
        throw new ErrorCustomer(
          400,
          "Erro de validação",
          "Token decodificado não é um objeto válido"
        );
      }
      return { valid: true, decoded };
    } catch (error) {
      console.error(error);
      throw new ErrorCustomer(
        401,
        "Erro de autenticação",
        "Token inválido ou expirado"
      );
    }
  });
});

declare module "fastify" {
  interface FastifyInstance {
    generateToken: (payload: TokenPayload) => string;
    validateToken: (
      token: string
    ) => Promise<{ valid: boolean; decoded?: object; message?: string }>;
  }
}
