import type { Project } from "@/types/Project";
import { createContext, useState, type ReactNode } from "react";

type ProjectContextType = {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
};

export const ProjectContext = createContext({} as ProjectContextType);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
