import { SectionsList } from "@/utils/SectionsList";

export function ProjectsSection() {
  return (
    <section id={SectionsList.projects.id}>
      <h2>{SectionsList.projects.label}</h2>
    </section>
  );
}
