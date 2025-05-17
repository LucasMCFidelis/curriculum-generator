import { FastifyRequest, FastifyReply } from "fastify";

export abstract class BaseCrud {
  public abstract create(request: FastifyRequest, reply: FastifyReply): {};
  public abstract get(request: FastifyRequest, reply: FastifyReply): {};
  public abstract update(request: FastifyRequest, reply: FastifyReply): {};
  public abstract delete(request: FastifyRequest, reply: FastifyReply): {};
  public async list(request: FastifyRequest, reply: FastifyReply) {}
}
