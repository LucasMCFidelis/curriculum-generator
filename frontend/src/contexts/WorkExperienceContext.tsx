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
import { isAxiosError } from "axios";
import { createContext, useState, type ReactNode } from "react";
import { useModal } from "./ModalContext";

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
        if (isAxiosError(error)) {
          setErrorMessage(error.response?.data.message);
        } else {
          setErrorMessage("Erro ao carregar Experiências profissionais");
        }
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
      console.log(error);

      if (isAxiosError(error)) {
        const fields = error.response?.data.fields;
        if (fields && Array.isArray(fields)) {
          const messages = fields.map((f) => f.message).join("\n");
          setErrorMessage(messages);
        } else {
          setErrorMessage(error.response?.data.message);
        }
      } else {
        setErrorMessage(
          "Erro ao criar experiência profissional, tente novamente!"
        );
      }
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
      }}
    >
      {children}
    </WorkExperienceContext.Provider>
  );
}
