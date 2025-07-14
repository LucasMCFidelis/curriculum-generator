import { useModal } from "@/contexts/ModalContext";
import { ConfirmDeleteItemModal } from "../ConfirmDeleteItem";
import { useWorkExperiences } from "@/hooks/useWorkExperiences";

export function ConfirmDeleteWorkExperienceModal() {
  const { currentModal } = useModal();
  const { currentWorkExperience, deleteWorkExperienceMutation, errorMessage } =
    useWorkExperiences();

  return (
    <>
      {currentModal === "confirmDeleteWorkExperience" &&
        currentWorkExperience && (
          <ConfirmDeleteItemModal
            itemType="Experiência profissional"
            itemTitle={`${currentWorkExperience.workExperiencePosition} em ${currentWorkExperience.workExperienceCompany}`}
            itemId={currentWorkExperience.workExperienceId}
            deleteMutation={deleteWorkExperienceMutation}
            errorMessage={errorMessage}
          />
        )}
    </>
  );
}
