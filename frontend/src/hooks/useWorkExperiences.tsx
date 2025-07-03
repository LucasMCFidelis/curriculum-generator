import { WorkExperienceContext } from "@/contexts/WorkExperienceContext";
import { useContext } from "react";

export const useWorkExperiences = () => {
  const context = useContext(WorkExperienceContext);

  if (!context) {
    throw new Error(
      "useWorkExperience deve ser usado dentro de um WorkExperienceProvider"
    );
  }

  return context;
};
