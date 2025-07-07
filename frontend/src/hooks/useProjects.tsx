import { ProjectContext } from "@/contexts/ProjectContext";
import { useContext } from "react";

export const useProjects = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects deve ser usado dentro de um ProjectProvider");
  }

  return context
};
