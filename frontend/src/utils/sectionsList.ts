type Section = {
  label: string;
  id: string;
  href: string;
};

export const sectionsList: Record<string, Section> = {
  home: {
    label: "Início",
    id: "homeSection",
    href: "home",
  },
  skills: {
    label: "Habilidades",
    id: "skillSection",
    href: "skills",
  },
  experience: {
    label: "Experiências",
    id: "experienceSection",
    href: "experiences",
  },
  projects: {
    label: "Projetos",
    id: "projectSection",
    href: "projects",
  },
  curriculums: {
    label: "Currículos",
    id: "curriculumSection",
    href: "curriculums",
  },
};
