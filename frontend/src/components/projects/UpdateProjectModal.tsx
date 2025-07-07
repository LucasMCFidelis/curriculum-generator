import { useModal } from "@/contexts/ModalContext";
import { useProjects } from "@/hooks/useProjects";
import { Modal } from "../modal";
import { ProjectForm } from "./ProjectForm";
import { useForm } from "react-hook-form";
import {
  projectUpdateSchema,
  type ProjectUpdateSchemaDTO,
} from "@/schemas/projectUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { LoadingSpin } from "../LoadingSpin";
import { Save } from "lucide-react";

export function UpdateProjectModal() {
  const { currentModal } = useModal();
  const { currentProject, updateProjectMutation, errorMessage } = useProjects();

  const formUpdateProject = useForm<ProjectUpdateSchemaDTO>({
    resolver: zodResolver(projectUpdateSchema),
  });

  useEffect(() => {
    if (!currentProject) return;

    formUpdateProject.reset({
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
              <p className="text-destructive">{errorMessage}</p>
            )}

            <Button
              className="mt-4"
              disabled={updateProjectMutation.isPending}
              onClick={formUpdateProject.handleSubmit((data) =>
                updateProjectMutation.mutate(data)
              )}
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
            </Button>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}
