import { useForm } from "react-hook-form";
import Modal from "./modal";
import SkillForm from "./SkillForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSkillCreate } from "@/schemas/formSkillCreate";
import type { formSkillCreateDTO } from "@/schemas/formSkillCreate";
import { useModal } from "@/contexts/ModalContext";
import { Save, X } from "lucide-react";
import { useSkills } from "@/contexts/SkillContext";
import LoadingSpin from "./LoadingSpin";
import { useEffect } from "react";

function CreateSkillModal() {
  const { currentModal, closeModal } = useModal();
  const { errorMessage, cadastreSkillMutation } = useSkills();

  const formCreateSkill = useForm<formSkillCreateDTO>({
    resolver: zodResolver(formSkillCreate),
  });

  useEffect(() => {
    if (cadastreSkillMutation.isSuccess) {
      closeModal();
    }
  }, [cadastreSkillMutation.isSuccess]);

  return (
    <>
      {currentModal === "createSkill" && (
        <Modal.Root>
          <div className="flex justify-between items-center">
            <h2>Cadastrar Habilidade</h2>
            <Modal.Close closeAction={() => closeModal()}>
              <X />
            </Modal.Close>
          </div>
          <Modal.Body>
            <SkillForm form={formCreateSkill} />

            {cadastreSkillMutation.isError && (
              <p className="text-destructive">{errorMessage}</p>
            )}

            <Modal.Confirm
              className="mt-4"
              disabled={cadastreSkillMutation.isPending}
              confirmAction={formCreateSkill.handleSubmit((data) => {
                cadastreSkillMutation.mutate(data);
              })}
            >
              {cadastreSkillMutation.isPending ? (
                <>
                  Cadastrando...
                  <LoadingSpin />
                </>
              ) : (
                <>
                  Cadastrar
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

export default CreateSkillModal;
