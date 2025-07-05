import { SkillsSection } from "@/components/skills/SkillsSection";
import { WorkExperienceSection } from "@/components/workExperiences/WorkExperienceSection";
import { SkillProvider } from "@/contexts/SkillContext";
import { WorkExperienceProvider } from "@/contexts/WorkExperienceContext";
import type { ReactNode } from "react";

type Section = {
  label: string;
  id: string;
  href: string;
  element?: ReactNode;
};

export const SectionsList: Record<string, Section> = {
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
    element: undefined,
  },
  curriculums: {
    label: "Currículos",
    id: "curriculumSection",
    href: "curriculums",
    element: undefined,
  },
};
