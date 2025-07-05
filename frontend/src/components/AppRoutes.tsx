import { Navigate, Route, Routes } from "react-router";
import { SkillsSection } from "./skills/SkillsSection";
import { WorkExperienceSection } from "./workExperiences/WorkExperienceSection";
import { LoadingSpin } from "./LoadingSpin";
import { sectionsList } from "@/utils/sectionsList";
import { SkillProvider } from "@/contexts/SkillContext";
import { WorkExperienceProvider } from "@/contexts/WorkExperienceContext";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={<Navigate to={sectionsList.home.href ?? "/home"} replace />}
      />
      <Route path={sectionsList.home.href} element={<LoadingSpin />} />
      <Route
        path={sectionsList.skills.href}
        element={
          <SkillProvider>
            <SkillsSection />
          </SkillProvider>
        }
      />
      <Route
        path={sectionsList.experience.href}
        element={
          <WorkExperienceProvider>
            <WorkExperienceSection />
          </WorkExperienceProvider>
        }
      />
    </Routes>
  );
}
