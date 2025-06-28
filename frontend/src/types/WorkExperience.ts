export type WorkExperience = {
  workExperienceId: string;
  workExperiencePosition: string;
  workExperienceDescription?: string;
  workExperienceCompany: string;
  workExperienceFinished?: boolean;
  workExperienceStartDate: Date;
  workExperienceEndDate?: Date;
  workExperienceCreatedAt: Date;

  workExperienceUserId: string;
};
