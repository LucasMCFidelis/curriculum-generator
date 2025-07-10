import { useModal } from "@/contexts/ModalContext";
import { Modal } from "../modal";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectForm } from "./ProjectForm";
import { useProjects } from "@/hooks/useProjects";
import { LoadingSpin } from "../LoadingSpin";
import {
  projectFormSchema,
  type ProjectFormSchemaDTO,
} from "@/schemas/projectSchemas";
import { Feedback } from "../feedback";

export function CreateProjectModal() {
  const { currentModal } = useModal();
  const { cadastreProjectMutation, errorMessage } = useProjects();

  const formCreateProject = useForm<ProjectFormSchemaDTO>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { type: "create", projectFinished: false },
  });

  return (
    <>
      {currentModal === "createProject" && (
        <Modal.Root>
          <Modal.Header>
            <h2>Cadastrar Projeto</h2>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <ProjectForm
              form={formCreateProject}
              isEditable={cadastreProjectMutation.isPending}
            />
            {cadastreProjectMutation.isError && (
              <Feedback.Root>
                <Feedback.Error message={errorMessage} />
              </Feedback.Root>
            )}
            <Modal.Confirm
              className="mt-4"
              disabled={cadastreProjectMutation.isPending}
              confirmAction={formCreateProject.handleSubmit((data) => {
                if (data.type === "create") {
                  cadastreProjectMutation.mutate(data);
                }
              })}
            >
              {cadastreProjectMutation.isPending ? (
                <>
                  Cadastrando Projeto...
                  <LoadingSpin />
                </>
              ) : (
                <>
                  Cadastrar Projeto
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
