import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import type { formWorkExperienceCreateDTO } from "@/schemas/formWorkExperienceCreate";
import type { WorkExperience } from "@/types/WorkExperience";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { createContext, useState, type ReactNode } from "react";
import { useModal } from "./ModalContext";
import type { formWorkExperienceUpdateDTO } from "@/schemas/formWorkExperienceUpdate";
import { handleAxiosFormError } from "@/utils/handleAxiosFormError";

type WorkExperienceContextType = {
  currentWorkExperience: WorkExperience | null;
  setCurrentWorkExperience: (workExperience: WorkExperience | null) => void;
  workExperiencesUser?: WorkExperience[];
  isLoadingWorkExperiencesUser: boolean;
  isErrorWorkExperiencesUser: boolean;
  refetchWorkExperiencesUser: () => void;
  cadastreWorkExperience: UseMutationResult<
    WorkExperience,
    Error,
    formWorkExperienceCreateDTO
  >;
  deleteWorkExperienceMutation: UseMutationResult<void, Error, string>;
  updateWorkExperienceMutation: UseMutationResult<
    WorkExperience,
    Error,
    formWorkExperienceUpdateDTO
  >;
  errorMessage: string;
  setErrorMessage: (value: string) => void;
};

export const WorkExperienceContext = createContext(
  {} as WorkExperienceContextType
);

export function WorkExperienceProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const { closeModal } = useModal();
  const [currentWorkExperience, setCurrentWorkExperience] =
    useState<WorkExperience | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const {
    data: workExperiencesUser,
    isLoading: isLoadingWorkExperiencesUser,
    isError: isErrorWorkExperiencesUser,
    refetch: refetchWorkExperiencesUser,
  } = useQuery<WorkExperience[], Error>({
    queryKey: ["workExperiences"],
    queryFn: async () => {
      try {
        setErrorMessage("");
        const response = await api.get(
          `/work-experience/list?userId=${currentUser?.userId}`
        );
        return response.data;
      } catch (error) {
        handleAxiosFormError({
          error,
          setError: setErrorMessage,
          genericMessage: "Erro ao carregar Experiências profissionais",
        });
      }
    },
  });

  const cadastreWorkExperience = useMutation<
    WorkExperience,
    Error,
    formWorkExperienceCreateDTO
  >({
    mutationFn: async (data: formWorkExperienceCreateDTO) => {
      const workExperienceResponse = await api.post(
        `/work-experience?userId=${currentUser?.userId}`,
        data
      );
      return workExperienceResponse.data;
    },
    onSuccess: (newWorkExperience) => {
      queryClient.setQueryData<WorkExperience[]>(
        ["workExperiences"],
        (oldWorkExperiences) => [
          ...(oldWorkExperiences || []),
          newWorkExperience,
        ]
      );
      closeModal();
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage:
          "Erro ao criar experiência profissional, tente novamente!",
      });
    },
  });

  const deleteWorkExperienceMutation = useMutation({
    mutationFn: async (workExperienceId: string) => {
      await api.delete(
        `/work-experience?userId=${currentUser?.userId}&workExperienceId=${workExperienceId}`
      );
    },
    onSuccess: (_, workExperienceId) => {
      queryClient.setQueryData<WorkExperience[]>(
        ["workExperiences"],
        (oldWorkExperiences) => {
          return (
            oldWorkExperiences?.filter(
              (workExperience) =>
                workExperience.workExperienceId !== workExperienceId
            ) || []
          );
        }
      );
      closeModal();
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage:
          "Erro ao deletar experiência profissional, tente novamente!",
      });
    },
  });

  const updateWorkExperienceMutation = useMutation<
    WorkExperience,
    Error,
    formWorkExperienceUpdateDTO
  >({
    mutationFn: async (data: formWorkExperienceUpdateDTO) => {
      const updateResponse = await api.put(
        `/work-experience?userId=${currentUser?.userId}&workExperienceId=${currentWorkExperience?.workExperienceId}`,
        data
      );
      console.log(updateResponse.data);

      return updateResponse.data.workExperienceUpdated;
    },
    onSuccess: (updatedWorkExperience) => {
      queryClient.setQueryData<WorkExperience[]>(
        ["workExperiences"],
        (oldWorkExperiences) => {
          return (
            oldWorkExperiences?.map((workExperience) =>
              workExperience.workExperienceId ===
              updatedWorkExperience.workExperienceId
                ? updatedWorkExperience
                : workExperience
            ) || []
          );
        }
      );
      closeModal();
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage:
          "Erro ao atualizar experiência profissional, tente novamente!",
      });
    },
  });

  return (
    <WorkExperienceContext.Provider
      value={{
        currentWorkExperience,
        setCurrentWorkExperience,
        workExperiencesUser,
        isLoadingWorkExperiencesUser,
        isErrorWorkExperiencesUser,
        refetchWorkExperiencesUser,
        errorMessage,
        setErrorMessage,
        cadastreWorkExperience,
        deleteWorkExperienceMutation,
        updateWorkExperienceMutation,
      }}
    >
      {children}
    </WorkExperienceContext.Provider>
  );
}
