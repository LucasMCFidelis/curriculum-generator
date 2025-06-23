import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import type { Skill } from "@/types/Skill";
import { useQuery } from "@tanstack/react-query";
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
};

const SkillContext = createContext({} as SkillContextType);

export function SkillProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);

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
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export const useSkills = () => useContext(SkillContext);
