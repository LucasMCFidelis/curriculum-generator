import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";

import type { Skill } from "@/types/Skill";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { createContext, useMemo, useState, type ReactNode } from "react";
import { useModal } from "./ModalContext";
import { handleAxiosFormError } from "@/utils/handleAxiosFormError";
import type { SkillCreateSchemaDTO, SkillUpdateSchemaDTO } from "@/schemas/skillSchemas";
import { stripDiscriminator } from "@/utils/stripDiscriminator";

type SkillContextType = {
  currentSkill: Skill | null;
  setCurrentSkill: (skill: Skill | null) => void;
  skillsUser?: Skill[];
  isLoadingSkills: boolean;
  isErrorSkills: boolean;
  refetchSkills: () => void;
  skillsTypes: string[];
  cadastreSkillMutation: UseMutationResult<Skill, Error, SkillCreateSchemaDTO>;
  deleteSkillMutation: UseMutationResult<void, Error, string>;
  updateSkillMutation: UseMutationResult<Skill, Error, SkillUpdateSchemaDTO>;
  errorMessage: string;
};

export const SkillContext = createContext({} as SkillContextType);

export function SkillProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const { closeModal } = useModal();
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const {
    data: skillsUser,
    isLoading: isLoadingSkills,
    isError: isErrorSkills,
    refetch: refetchSkills,
  } = useQuery<Skill[], Error>({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        const response = await api.get(
          `/users?userId=${currentUser?.userId}&userSkills=true`
        );
        return response.data.userSkills;
      } catch (error) {
        handleAxiosFormError({
          error,
          setError: setErrorMessage,
          genericMessage: "Erro ao carregar Habilidades",
        });
      }
    },
  });

  const skillsTypes = useMemo(() => {
    return [...new Set(skillsUser?.map((skill) => skill.skillType))];
  }, [skillsUser]);

  const cadastreSkillMutation = useMutation<Skill, Error, SkillCreateSchemaDTO>({
    mutationFn: async (data: SkillCreateSchemaDTO) => {
      const skillResponse = await api.post(
        `/skills?userId=${currentUser?.userId}`,
        data.skillTypeCustom
          ? {
              skillTitle: data.skillTitle,
              skillDescription: data.skillDescription,
              skillType: data.skillTypeCustom,
            }
          : stripDiscriminator(data, "type")
      );
      return skillResponse.data;
    },
    onSuccess: (newSkill) => {
      queryClient.setQueryData<Skill[]>(["skills"], (oldSkills) => [
        ...(oldSkills || []),
        newSkill,
      ]);
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage: "Erro ao criar habilidade, tente novamente!",
      });
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      await api.delete(
        `/skills?userId=${currentUser?.userId}&skillId=${skillId}`
      );
    },
    onSuccess: (_, skillId) => {
      queryClient.setQueryData<Skill[]>(["skills"], (oldSkills) => {
        return oldSkills?.filter((skill) => skill.skillId !== skillId) || [];
      });
      closeModal();
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage: "Erro ao deletar habilidade, tente novamente!",
      });
    },
  });

  const updateSkillMutation = useMutation<Skill, Error, SkillUpdateSchemaDTO>({
    mutationFn: async (data: SkillUpdateSchemaDTO) => {
      console.log(data);
      
      const skillResponse = await api.put(
        `/skills?userId=${currentUser?.userId}&skillId=${currentSkill?.skillId}`,
        data.skillTypeCustom
          ? {
              skillTitle: data.skillTitle,
              skillDescription: data.skillDescription,
              skillType: data.skillTypeCustom,
            }
          : stripDiscriminator(data, "type")
      );
      return skillResponse.data.skillUpdated;
    },
    onSuccess: (updatedSkill) => {
      queryClient.setQueryData<Skill[]>(["skills"], (oldSkills) => {
        return (
          oldSkills?.map((skill) =>
            skill.skillId === updatedSkill.skillId ? updatedSkill : skill
          ) || []
        );
      });
    },
    onError: (error) => {
      handleAxiosFormError({
        error,
        setError: setErrorMessage,
        genericMessage: "Erro ao atualizar habilidade, tente novamente!",
      });
    },
    onSettled: () => {
      setCurrentSkill(null);
      closeModal();
    },
  });

  return (
    <SkillContext.Provider
      value={{
        currentSkill,
        setCurrentSkill,
        skillsUser,
        isLoadingSkills,
        isErrorSkills,
        refetchSkills,
        skillsTypes,
        errorMessage,
        cadastreSkillMutation,
        deleteSkillMutation,
        updateSkillMutation,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}
