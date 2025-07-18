import { useModal } from "@/contexts/ModalContext";
import { useProjects } from "@/hooks/useProjects";
import { Modal } from "../modal";
import { ProjectForm } from "./ProjectForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { LoadingSpin } from "../LoadingSpin";
import { Save } from "lucide-react";
import {
  projectFormSchema,
  type ProjectFormSchemaDTO,
} from "@/schemas/projectSchemas";
import { Feedback } from "../feedback";

export function UpdateProjectModal() {
  const { currentModal } = useModal();
  const { currentProject, updateProjectMutation, errorMessage } = useProjects();

  const formUpdateProject = useForm<ProjectFormSchemaDTO>({
    resolver: zodResolver(projectFormSchema),
  });

  useEffect(() => {
    if (!currentProject) return;

    formUpdateProject.reset({
      type: "update",
      projectTitle: currentProject.projectTitle,
      projectDescription: currentProject.projectDescription || "",
      projectRepository: currentProject.projectRepository,
      projectDeploy: currentProject.projectDeploy,
      projectFinished: currentProject.projectFinished,
      projectStartDate: currentProject.projectStartDate
        ? new Date(currentProject.projectStartDate)
        : undefined,
      projectEndDate: currentProject.projectEndDate
        ? new Date(currentProject.projectEndDate)
        : undefined,
    });
  }, [currentProject]);

  return (
    <>
      {currentModal === "updateProject" && currentProject && (
        <Modal.Root>
          <Modal.Header>
            <h2>Atualizar Projeto</h2>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <ProjectForm
              form={formUpdateProject}
              isEditable={updateProjectMutation.isPending}
            />

            {updateProjectMutation.isError && (
              <Feedback.Root>
                <Feedback.Error message={errorMessage} />
              </Feedback.Root>
            )}

            <Modal.Confirm
              className="mt-4"
              disabled={updateProjectMutation.isPending}
              confirmAction={formUpdateProject.handleSubmit((data) => {
                if (data.type === "update") {
                  updateProjectMutation.mutate(data);
                }
              })}
            >
              {updateProjectMutation.isPending ? (
                <>
                  Salvando alterações <LoadingSpin />
                </>
              ) : (
                <>
                  Salvar Alterações
                  <Save />
                </>
              )}
            </Modal.Confirm>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}
