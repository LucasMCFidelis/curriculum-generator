import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import type { Project } from "@/types/Project";
import { handleAxiosFormError } from "@/utils/handleAxiosFormError";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState, type ReactNode } from "react";

type ProjectContextType = {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  projectsUser?: Project[];
  isLoadingProjects: boolean;
  isErrorProjects: boolean;
  refetchProjects: () => void;
};

export const ProjectContext = createContext({} as ProjectContextType);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    data: projectsUser,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    refetch: refetchProjects,
  } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await api.get(
          `/users?userId=${currentUser?.userId}&userProjects=true`
        );
        return response.data.userProjects;
      } catch (error) {
        handleAxiosFormError({
          error,
          setError: setErrorMessage,
          genericMessage: "Erro ao carregar projetos",
        });
      }
    },
  });

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        errorMessage,
        setErrorMessage,
        projectsUser,
        isLoadingProjects,
        isErrorProjects,
        refetchProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
