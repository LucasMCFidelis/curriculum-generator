import { useForm } from "react-hook-form";
import { Modal } from "../modal";
import { SkillForm } from "./SkillForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillCreateSchema } from "@/schemas/skillCreateSchema";
import type { SkillCreateSchemaDTO } from "@/schemas/skillCreateSchema";
import { useModal } from "@/contexts/ModalContext";
import { Save, X } from "lucide-react";
import { useSkills } from "@/hooks/useSkills";
import { LoadingSpin } from "../LoadingSpin";
import { useEffect } from "react";

export function CreateSkillModal() {
  const { currentModal, closeModal } = useModal();
  const { errorMessage, cadastreSkillMutation } = useSkills();

  const formCreateSkill = useForm<SkillCreateSchemaDTO>({
    resolver: zodResolver(skillCreateSchema),
  });

  useEffect(() => {
    if (currentModal === "createSkill") {
      formCreateSkill.reset();
    }
  }, [currentModal]);

  useEffect(() => {
    if (cadastreSkillMutation.isSuccess) {
      closeModal();
    }
  }, [cadastreSkillMutation.isSuccess]);

  return (
    <>
      {currentModal === "createSkill" && (
        <Modal.Root>
          <Modal.Header>
            <h2>Cadastrar Habilidade</h2>
            <Modal.Close
              closeAction={() => {
                formCreateSkill.reset();
                closeModal();
              }}
            >
              <X />
            </Modal.Close>
          </Modal.Header>
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
