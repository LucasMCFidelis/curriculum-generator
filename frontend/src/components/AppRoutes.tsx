import { Navigate, Route, Routes } from "react-router";
import { SkillsSection } from "./skills/SkillsSection";
import { WorkExperienceSection } from "./workExperiences/WorkExperienceSection";
import { LoadingSpin } from "./LoadingSpin";
import { sectionsList } from "@/utils/sectionsList";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={<Navigate to={sectionsList.home.href ?? "/home"} replace />}
      />
      <Route path={sectionsList.home.href} element={<LoadingSpin />} />
      <Route path={sectionsList.skills.href} element={<SkillsSection />} />
      <Route
        path={sectionsList.experience.href}
        element={<WorkExperienceSection />}
      />
    </Routes>
  );
}
