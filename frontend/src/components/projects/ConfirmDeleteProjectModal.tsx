import { useProjects } from "@/hooks/useProjects";
import { ConfirmDeleteItemModal } from "../ConfirmDeleteItem";
import { useModal } from "@/contexts/ModalContext";

export function ConfirmDeleteProjectModal() {
  const { currentProject, deleteProjectMutation } = useProjects();
  const { currentModal } = useModal();

  return (
    <>
      {currentModal === "confirmDeleteProject" && currentProject && (
        <ConfirmDeleteItemModal
          itemId={currentProject.projectId}
          itemType="Projeto"
          itemTitle={currentProject.projectTitle}
          deleteMutation={deleteProjectMutation}
        />
      )}
    </>
  );
}
