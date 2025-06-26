-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "userName" VARCHAR(150) NOT NULL,
    "userEmail" VARCHAR(150) NOT NULL,
    "userCity" VARCHAR(50),
    "userPassword" TEXT NOT NULL,
    "userPortfolio" VARCHAR(255),
    "userGitHub" VARCHAR(255),
    "userLinkedIn" VARCHAR(255),
    "userResume" VARCHAR(400),
    "userCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "skills" (
    "skillId" TEXT NOT NULL,
    "skillsTitle" VARCHAR(100) NOT NULL,
    "skillsDescription" VARCHAR(250),
    "skillsType" VARCHAR(100) NOT NULL,
    "skillCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skillUserId" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skillId")
);

-- CreateTable
CREATE TABLE "work_experiences" (
    "workExperienceId" TEXT NOT NULL,
    "workExperiencePosition" VARCHAR(50) NOT NULL,
    "workExperienceDescription" VARCHAR(400),
    "workExperienceCompany" VARCHAR(50) NOT NULL,
    "workExperienceFinished" BOOLEAN NOT NULL DEFAULT false,
    "workExperienceStartDate" TIMESTAMP(3) NOT NULL,
    "workExperienceEndDate" TIMESTAMP(3),
    "workExperienceCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workExperienceUserId" TEXT NOT NULL,

    CONSTRAINT "work_experiences_pkey" PRIMARY KEY ("workExperienceId")
);

-- CreateTable
CREATE TABLE "skills_on_work_experiences" (
    "skillId" TEXT NOT NULL,
    "workExperienceId" TEXT NOT NULL,

    CONSTRAINT "skills_on_work_experiences_pkey" PRIMARY KEY ("skillId","workExperienceId")
);

-- CreateTable
CREATE TABLE "projects" (
    "projectId" TEXT NOT NULL,
    "projectTitle" VARCHAR(100) NOT NULL,
    "projectDescription" VARCHAR(400),
    "projectRepository" VARCHAR(255),
    "projectDeploy" VARCHAR(255),
    "projectFinished" BOOLEAN NOT NULL DEFAULT false,
    "projectStartDate" TIMESTAMP(3) NOT NULL,
    "projectEndDate" TIMESTAMP(3),
    "projectCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectUserId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "skills_on_projects" (
    "skillId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "skills_on_projects_pkey" PRIMARY KEY ("skillId","projectId")
);

-- CreateTable
CREATE TABLE "curriculums" (
    "curriculumId" TEXT NOT NULL,
    "curriculumCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "curriculums_pkey" PRIMARY KEY ("curriculumId")
);

-- CreateTable
CREATE TABLE "skills_on_curriculum" (
    "skillId" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,

    CONSTRAINT "skills_on_curriculum_pkey" PRIMARY KEY ("skillId","curriculumId")
);

-- CreateTable
CREATE TABLE "work_experiences_on_curriculum" (
    "workExperienceId" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,

    CONSTRAINT "work_experiences_on_curriculum_pkey" PRIMARY KEY ("workExperienceId","curriculumId")
);

-- CreateTable
CREATE TABLE "projects_on_curriculum" (
    "projectId" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,

    CONSTRAINT "projects_on_curriculum_pkey" PRIMARY KEY ("projectId","curriculumId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userEmail_key" ON "users"("userEmail");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_skillUserId_fkey" FOREIGN KEY ("skillUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_experiences" ADD CONSTRAINT "work_experiences_workExperienceUserId_fkey" FOREIGN KEY ("workExperienceUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_work_experiences" ADD CONSTRAINT "skills_on_work_experiences_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("skillId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_work_experiences" ADD CONSTRAINT "skills_on_work_experiences_workExperienceId_fkey" FOREIGN KEY ("workExperienceId") REFERENCES "work_experiences"("workExperienceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_projectUserId_fkey" FOREIGN KEY ("projectUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_projects" ADD CONSTRAINT "skills_on_projects_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("skillId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_projects" ADD CONSTRAINT "skills_on_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculums" ADD CONSTRAINT "curriculums_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_curriculum" ADD CONSTRAINT "skills_on_curriculum_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("skillId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills_on_curriculum" ADD CONSTRAINT "skills_on_curriculum_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculums"("curriculumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_experiences_on_curriculum" ADD CONSTRAINT "work_experiences_on_curriculum_workExperienceId_fkey" FOREIGN KEY ("workExperienceId") REFERENCES "work_experiences"("workExperienceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_experiences_on_curriculum" ADD CONSTRAINT "work_experiences_on_curriculum_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculums"("curriculumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_on_curriculum" ADD CONSTRAINT "projects_on_curriculum_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_on_curriculum" ADD CONSTRAINT "projects_on_curriculum_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "curriculums"("curriculumId") ON DELETE CASCADE ON UPDATE CASCADE;
