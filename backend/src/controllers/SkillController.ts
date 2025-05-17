import { FastifyRequest, FastifyReply } from "fastify";
import { BaseCrud } from "../BaseCrud";
import { UserService } from "../services/UserService";

const userService = new UserService()

export class SkillController extends BaseCrud {}
