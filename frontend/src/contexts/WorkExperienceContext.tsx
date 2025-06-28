import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import type { WorkExperience } from "@/types/WorkExperience";
import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode } from "react";

type WorkExperienceContextType = {
  workExperiencesUser?: WorkExperience[];
  isLoadingWorkExperiencesUser: boolean;
  isErrorWorkExperiencesUser: boolean;
  refetchWorkExperiencesUser: () => void;
};

export const WorkExperienceContext = createContext(
  {} as WorkExperienceContextType
);

export function WorkExperienceProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const {
    data: workExperiencesUser,
    isLoading: isLoadingWorkExperiencesUser,
    isError: isErrorWorkExperiencesUser,
    refetch: refetchWorkExperiencesUser,
  } = useQuery<WorkExperience[], Error>({
    queryKey: ["workExperiences"],
    queryFn: async () => {
      const response = await api.get(
        `/work-experience/list?userId=${currentUser?.userId}`
      );

      return response.data;
    },
  });

  return (
    <WorkExperienceContext.Provider
      value={{
        workExperiencesUser,
        isLoadingWorkExperiencesUser,
        isErrorWorkExperiencesUser,
        refetchWorkExperiencesUser,
      }}
    >
      {children}
    </WorkExperienceContext.Provider>
  );
}
