import { useModal } from "@/contexts/ModalContext";
import { Modal } from "../modal";
import { Save, X } from "lucide-react";
import { useSkills } from "@/hooks/useSkills";
import { SkillForm } from "./SkillForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  skillUpdateSchema,
  type SkillUpdateSchemaDTO,
} from "@/schemas/skillUpdateSchema";
import { useEffect, useState } from "react";
import { LoadingSpin } from "../LoadingSpin";

export function UpdateSkillModal() {
  const { currentModal, closeModal } = useModal();
  const { currentSkill, updateSkillMutation } = useSkills();
  const [formKey, setFormKey] = useState<number>(0);

  const formUpdate = useForm<SkillUpdateSchemaDTO>({
    resolver: zodResolver(skillUpdateSchema),
  });

  useEffect(() => {
    console.log("currentSkill", currentSkill);
    if (currentSkill) {
      formUpdate.reset({
        skillTitle: currentSkill.skillTitle,
        skillDescription: currentSkill.skillDescription ?? "",
        skillType: currentSkill.skillType,
        skillTypeCustom: "",
      });
    }
  }, [currentSkill]);

  useEffect(() => {
    if (currentSkill) {
      setFormKey((prevKey) => prevKey + 1);
    }
  }, [currentSkill]);

  return (
    <>
      {currentModal === "updateSkill" && currentSkill && (
        <Modal.Root>
          <Modal.Header>
            <h2>Atualizar Habilidade</h2>
            <Modal.Close
              closeAction={() => {
                formUpdate.reset();
                closeModal();
              }}
            >
              <X />
            </Modal.Close>
          </Modal.Header>
          <Modal.Body>
            <SkillForm formKey={formKey} form={formUpdate} />
            <Modal.Confirm
              disabled={updateSkillMutation.isPending}
              confirmAction={() => {
                updateSkillMutation.mutate(formUpdate.getValues());
              }}
            >
              {updateSkillMutation.isPending ? (
                <>
                  Salvando Alterações <LoadingSpin />
                </>
              ) : (
                <>
                  Salvar <Save />
                </>
              )}
            </Modal.Confirm>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}
