import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import type { formSkillCreateDTO } from "@/schemas/formSkillCreate";
import type { Skill } from "@/types/Skill";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SkillContextType = {
  currentSkill: Skill | null;
  setCurrentSkill: (skill: Skill | null) => void;
  skillsUser?: Skill[];
  isLoadingSkills: boolean;
  isErrorSkills: boolean;
  refetchSkills: () => void;
  skillsTypes: string[];
  cadastreSkillMutation: UseMutationResult<Skill, Error, formSkillCreateDTO>;
  deleteSkillMutation: UseMutationResult<void, Error, string>;
  errorMessage: string;
};

const SkillContext = createContext({} as SkillContextType);

export function SkillProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
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
      const response = await api.get(
        `/users?userId=${currentUser?.userId}&userSkills=true`
      );

      return response.data.userSkills;
    },
  });

  const skillsTypes = useMemo(() => {
    return [...new Set(skillsUser?.map((skill) => skill.skillType))];
  }, [skillsUser]);

  const cadastreSkillMutation = useMutation<Skill, Error, formSkillCreateDTO>({
    mutationFn: async (data: formSkillCreateDTO) => {
      const skillResponse = await api.post(
        `/skills?userId=${currentUser?.userId}`,
        data.skillTypeCustom
          ? {
              skillTitle: data.skillTitle,
              skillDescription: data.skillDescription,
              skillType: data.skillTypeCustom,
            }
          : data
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
      console.error(error);
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage("Erro ao criar habilidade, tente novamente!");
      }
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
    },
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage("Erro ao deletar habilidade, tente novamente!");
      }
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
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export const useSkills = () => useContext(SkillContext);
