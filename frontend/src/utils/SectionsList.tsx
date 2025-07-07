import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { WorkExperienceSection } from "@/components/workExperiences/WorkExperienceSection";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { SkillProvider } from "@/contexts/SkillContext";
import { WorkExperienceProvider } from "@/contexts/WorkExperienceContext";
import type { ReactNode } from "react";

type Section = {
  label: string;
  id: string;
  href: string;
  element?: ReactNode;
};

type SectionKey = "home" | "skills" | "experience" | "projects" | "curriculums";

export const SectionsList: Record<SectionKey, Section> = {
  home: {
    label: "Início",
    id: "homeSection",
    href: "home",
    element: undefined,
  },
  skills: {
    label: "Habilidades",
    id: "skillSection",
    href: "skills",
    element: (
      <SkillProvider>
        <SkillsSection />
      </SkillProvider>
    ),
  },
  experience: {
    label: "Experiências",
    id: "experienceSection",
    href: "experiences",
    element: (
      <WorkExperienceProvider>
        <WorkExperienceSection />
      </WorkExperienceProvider>
    ),
  },
  projects: {
    label: "Projetos",
    id: "projectSection",
    href: "projects",
    element: (
      <ProjectProvider>
        <ProjectsSection />
      </ProjectProvider>
    ),
  },
  curriculums: {
    label: "Currículos",
    id: "curriculumSection",
    href: "curriculums",
    element: undefined,
  },
};
