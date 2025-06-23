import { api } from "@/api";
import LoadingSpin from "@/components/LoadingSpin";
import { Button } from "@/components/ui/button";
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
  skillsTypes?: string[];
};

const SkillContext = createContext({} as SkillContextType);

export function SkillProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);

  const {
    data: skillsUser,
    isLoading,
    isError,
    refetch,
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
      value={{ currentSkill, setCurrentSkill, skillsUser, skillsTypes }}
    >
      {children}
      {isError && (
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-destructive">Erro</p>
          <Button className="w-full sm:w-fit" onClick={() => refetch()}>
            Recarregar Habilidades
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="flex gap-3 items-center justify-center">
          <p>Carregando Habilidades</p>
          <LoadingSpin />
        </div>
      )}
    </SkillContext.Provider>
  );
}

export const useSkills = () => useContext(SkillContext);
