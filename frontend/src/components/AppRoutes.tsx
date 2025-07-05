import { Navigate, Route, Routes } from "react-router";
import { SectionsList } from "@/utils/SectionsList";
import { Feedback } from "./feedback";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={<Navigate to={SectionsList.home.href ?? "/home"} replace />}
      />
      {Object.values(SectionsList).map(({ id, href, element }) => (
        <Route
          key={id}
          path={href}
          element={
            element ?? (
              <Feedback.Root>
                <Feedback.Loading message="Página em construção" />
              </Feedback.Root>
            )
          }
        />
      ))}
    </Routes>
  );
}
