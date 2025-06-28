import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { Save, X } from "lucide-react";
import { useSkills } from "@/contexts/SkillContext";
import SkillForm from "./SkillForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSkillUpdate,
  type formSkillUpdateDTO,
} from "@/schemas/formSkillUpdate";
import { useEffect, useState } from "react";
import LoadingSpin from "./LoadingSpin";

function UpdateSkillModal() {
  const { currentModal, closeModal } = useModal();
  const { currentSkill, updateSkillMutation } = useSkills();
  const [formKey, setFormKey] = useState<number>(0);

  const formUpdate = useForm<formSkillUpdateDTO>({
    resolver: zodResolver(formSkillUpdate),
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

export default UpdateSkillModal;
