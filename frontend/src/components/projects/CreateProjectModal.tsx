import { useModal } from "@/contexts/ModalContext";
import { Modal } from "../modal";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  projectCreateSchema,
  type ProjectCreateSchemaDTO,
} from "@/schemas/projectCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectForm } from "./ProjectForm";
import { useProjects } from "@/hooks/useProjects";
import { LoadingSpin } from "../LoadingSpin";

export function CreateProjectModal() {
  const { currentModal } = useModal();
  const { cadastreProjectMutation } = useProjects();

  const formCreateProject = useForm<ProjectCreateSchemaDTO>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: { projectFinished: false },
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
            <Modal.Confirm
              className="mt-4"
              disabled={cadastreProjectMutation.isPending}
              confirmAction={formCreateProject.handleSubmit((data) => {
                cadastreProjectMutation.mutate(data);
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
