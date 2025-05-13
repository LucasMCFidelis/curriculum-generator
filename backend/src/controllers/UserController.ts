import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {}
