import { BaseCrud } from "../BaseCrud";
import { ProjectService } from "../services/ProjectService";

const projectService = new ProjectService();

export class ProjectController extends BaseCrud {}
