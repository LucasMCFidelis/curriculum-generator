import { useModal } from "@/contexts/ModalContext";
import { Modal } from "../modal";
import { Save } from "lucide-react";
import { useWorkExperiences } from "@/hooks/useWorkExperiences";
import { LoadingSpin } from "../LoadingSpin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formWorkExperienceCreate,
  type formWorkExperienceCreateDTO,
} from "@/schemas/formWorkExperienceCreate";
import { WorkExperienceForm } from "./WorkExperienceForm";

export function CreateWorkExperienceModal() {
  const { currentModal, closeModal } = useModal();
  const { cadastreWorkExperience, errorMessage } = useWorkExperiences();

  const formCreateWorkExperience = useForm<formWorkExperienceCreateDTO>({
    resolver: zodResolver(formWorkExperienceCreate),
    defaultValues: { workExperienceFinished: false },
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
            <WorkExperienceForm form={formCreateWorkExperience} isEditable />

            {cadastreWorkExperience.isError && (
              <p className="text-destructive">{errorMessage}</p>
            )}

            <Modal.Confirm
              className="mt-4"
              disabled={cadastreWorkExperience.isPending}
              confirmAction={formCreateWorkExperience.handleSubmit((data) => {
                cadastreWorkExperience.mutate(data);
              })}
            >
              {cadastreWorkExperience.isPending ? (
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
