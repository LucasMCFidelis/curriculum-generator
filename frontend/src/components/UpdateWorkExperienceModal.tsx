import { useModal } from "@/contexts/ModalContext";
import { useWorkExperiences } from "@/hooks/useWorkExperiences";
import Modal from "./modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formWorkExperienceUpdateSchema,
  type formWorkExperienceUpdateDTO,
} from "@/schemas/formWorkExperienceUpdate";
import WorkExperienceForm from "./WorkExperienceForm";
import { useEffect } from "react";
import LoadingSpin from "./LoadingSpin";
import { Save } from "lucide-react";

export function UpdateWorkExperienceModal() {
  const { currentModal, closeModal } = useModal();
  const { currentWorkExperience, updateWorkExperienceMutation, errorMessage } =
    useWorkExperiences();

  const formUpdate = useForm<formWorkExperienceUpdateDTO>({
    resolver: zodResolver(formWorkExperienceUpdateSchema),
  });

  useEffect(() => {
    console.log(currentWorkExperience);

    if (currentWorkExperience) {
      formUpdate.reset({
        workExperiencePosition: currentWorkExperience?.workExperiencePosition,
        workExperienceDescription:
          currentWorkExperience?.workExperienceDescription || "",
        workExperienceCompany: currentWorkExperience?.workExperienceCompany,
        workExperienceFinished: currentWorkExperience?.workExperienceFinished,
        workExperienceStartDate: currentWorkExperience?.workExperienceStartDate
          ? new Date(currentWorkExperience?.workExperienceStartDate)
          : undefined,
        workExperienceEndDate: currentWorkExperience?.workExperienceEndDate
          ? new Date(currentWorkExperience?.workExperienceEndDate)
          : undefined,
      });
    }
  }, [currentWorkExperience]);

  return (
    <>
      {currentModal === "updateWorkExperience" && currentWorkExperience && (
        <Modal.Root>
          <Modal.Header>
            <h2>Atualizar Experiência Profissional</h2>
            <Modal.Close
              disabled={updateWorkExperienceMutation.isPending}
              closeAction={() => {
                formUpdate.reset();
                closeModal();
              }}
            />
          </Modal.Header>
          <Modal.Body>
            <WorkExperienceForm form={formUpdate} />

            {updateWorkExperienceMutation.isError && (
              <p className="text-destructive">{errorMessage}</p>
            )}

            <Modal.Confirm
              disabled={updateWorkExperienceMutation.isPending}
              confirmAction={formUpdate.handleSubmit((data) => {
                updateWorkExperienceMutation.mutate(data);
              })}
              className="mt-4"
            >
              {updateWorkExperienceMutation.isPending ? (
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
