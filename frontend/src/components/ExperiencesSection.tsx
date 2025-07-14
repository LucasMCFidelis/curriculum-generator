import { WorkExperienceProvider } from "@/contexts/WorkExperienceContext";
import { SectionsList } from "@/utils/SectionsList";
import { WorkExperienceSection } from "./workExperiences/WorkExperienceSection";

export function ExperiencesSection() {
  return (
    <section
      id={SectionsList.experience.id}
      className="space-y-4 md:space-y-10 "
    >
      <h2>{SectionsList.experience.label}</h2>
      <WorkExperienceProvider>
        <WorkExperienceSection />
      </WorkExperienceProvider>
      <section id="academicExperienceSection" className="space-y-4">
        <h2>Experiências Acadêmicas</h2>
      </section>
    </section>
  );
}
