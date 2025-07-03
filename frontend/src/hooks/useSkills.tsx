import { SkillContext } from "@/contexts/SkillContext";
import { useContext } from "react";

export const useSkills = () => {
  const context = useContext(SkillContext);

  if (!context) {
    throw new Error("useSkills deve ser usado dentro de um SkillProvider");
  }

  return context;
};
