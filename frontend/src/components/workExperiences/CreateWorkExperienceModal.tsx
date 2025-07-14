import { useModal } from "@/contexts/ModalContext";
import { Modal } from "../modal";
import { Save } from "lucide-react";
import { useWorkExperiences } from "@/hooks/useWorkExperiences";
import { LoadingSpin } from "../LoadingSpin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkExperienceForm } from "./WorkExperienceForm";
import {
  workExperienceFormSchema,
  type WorkExperienceFormSchemaDTO,
} from "@/schemas/workExperienceSchemas";

export function CreateWorkExperienceModal() {
  const { currentModal, closeModal } = useModal();
  const { cadastreWorkExperienceMutation, errorMessage } = useWorkExperiences();

  const formCreateWorkExperience = useForm<WorkExperienceFormSchemaDTO>({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues: { type: "create", workExperienceFinished: false },
  });

  return (
    <>
      {currentModal === "createWorkExperience" && (
        <Modal.Root>
          <Modal.Header>
            <h2>Cadastrar Experiência profissional</h2>
            <Modal.Close
              closeAction={() => {
                formCreateWorkExperience.reset();
                closeModal();
              }}
            />
          </Modal.Header>
          <Modal.Body>
            <WorkExperienceForm form={formCreateWorkExperience} isEditable={cadastreWorkExperienceMutation.isPending} />

            {cadastreWorkExperienceMutation.isError && (
              <p className="text-destructive">{errorMessage}</p>
            )}

            <Modal.Confirm
              className="mt-4"
              disabled={cadastreWorkExperienceMutation.isPending}
              confirmAction={formCreateWorkExperience.handleSubmit((data) => {
                if (data.type === "create") {
                  cadastreWorkExperienceMutation.mutate(data);
                }
              })}
            >
              {cadastreWorkExperienceMutation.isPending ? (
                <>
                  Cadastrando...
                  <LoadingSpin />
                </>
              ) : (
                <>
                  Cadastrar <Save />
                </>
              )}
            </Modal.Confirm>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}
