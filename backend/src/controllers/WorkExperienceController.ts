import { BaseCrud } from "../BaseCrud";
import { WorkExperienceService } from "../services/WorkExperienceService";

const workExperienceService = new WorkExperienceService();

export class WorkExperienceController extends BaseCrud {}
