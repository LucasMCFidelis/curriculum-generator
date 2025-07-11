import { useModal } from "@/contexts/ModalContext";

export function SectionList() {
  const { openModal } = useModal();

  return [
    {
      label: "Habilidades",
      sectionId: "skillSection",
      onCreate: () => openModal("createSkill"),
    },
    {
      label: "Experiências Profissionais",
      sectionId: "workExperienceSection",
      onCreate: () => openModal("createWorkExperience"),
    },
    {
      label: "Projetos",
      sectionId: "projectSection",
      onCreate: () => console.log("Abrir modal: cadastrar projeto"),
    },
    {
      label: "Currículos",
      sectionId: "curriculumSection",
      onCreate: () => console.log("Abrir modal: cadastrar currículo"),
    },
  ];
}
