import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import type { ProjectCreateSchemaDTO } from "@/schemas/projectCreateSchema";
import type { Project } from "@/types/Project";
import { handleAxiosFormError } from "@/utils/handleAxiosFormError";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { createContext, useState, type ReactNode } from "react";
import { useModal } from "./ModalContext";
import type { ProjectUpdateSchemaDTO } from "@/schemas/projectUpdateSchema";

type ProjectContextType = {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  projectsUser?: Project[];
  isLoadingProjects: boolean;
  isErrorProjects: boolean;
  refetchProjects: () => void;
  cadastreProjectMutation: UseMutationResult<
    Project,
    Error,
    ProjectCreateSchemaDTO
  >;
  deleteProjectMutation: UseMutationResult<void, Error, string>;
  updateProjectMutation: UseMutationResult<
    Project,
    Error,
    ProjectUpdateSchemaDTO
  >;
};

export const ProjectContext = createContext({} as ProjectContextType);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const { closeModal } = useModal();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const queryClient = useQueryClient();

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

  const cadastreProjectMutation = useMutation<
    Project,
    Error,
    ProjectCreateSchemaDTO
  >({
    mutationFn: async (data: ProjectCreateSchemaDTO) => {
      const projectResponse = await api.post(
        `/projects?userId=${currentUser?.userId}`,
        data
      );
      return projectResponse.data;
    },
    onSuccess: (newProject) => {
      queryClient.setQueryData<Project[]>(["projects"], (oldProjects) => [
        ...(oldProjects || []),
        newProject,
      ]);
      closeModal();
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage: "Erro ao cadastrar projeto, tente novamente!",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      await api.delete(
        `/projects?userId=${currentUser?.userId}&projectId=${projectId}`
      );
    },
    onSuccess: (_, projectId) => {
      queryClient.setQueryData<Project[]>(["projects"], (oldProjects) => {
        return (
          oldProjects?.filter((project) => project.projectId !== projectId) ||
          []
        );
      });
      closeModal();
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage: "Erro ao deletar projeto, tente novamente!",
      });
    },
  });

  const updateProjectMutation = useMutation<
    Project,
    Error,
    ProjectUpdateSchemaDTO
  >({
    mutationFn: async (data: ProjectUpdateSchemaDTO) => {
      const projectResponse = await api.put(
        `/projects?userId=${currentUser?.userId}&projectId=${currentProject?.projectId}`,
        data
      );

      return projectResponse.data.projectUpdated;
    },
    onSuccess: (projectUpdated) => {
      queryClient.setQueryData<Project[]>(["projects"], (oldProjects) => {
        return (
          oldProjects?.map((project) =>
            project.projectId === projectUpdated.projectId
              ? projectUpdated
              : project
          ) || []
        );
      });
      closeModal()
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage: "Erro ao atualizar projeto, tente novamente!",
      });
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
        cadastreProjectMutation,
        deleteProjectMutation,
        updateProjectMutation,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
