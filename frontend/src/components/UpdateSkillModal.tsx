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

function UpdateSkillModal() {
  const { currentModal, closeModal } = useModal();
  const { currentSkill } = useSkills();
  const [formKey, setFormKey] = useState<number>(0);

  const formUpdate = useForm<formSkillUpdateDTO>({
    resolver: zodResolver(formSkillUpdate),
    defaultValues: {},
  });

  useEffect(() => {
    console.log("currentSkill", currentSkill);
    if (currentSkill) {
      formUpdate.setValue("skillTitle", currentSkill.skillTitle);
      formUpdate.setValue(
        "skillDescription",
        currentSkill.skillDescription ?? ""
      );
      formUpdate.setValue("skillType", currentSkill.skillType);
      formUpdate.setValue("skillTypeCustom", "");
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
          <div className="flex justify-between items-center">
            <h2>Atualizar Habilidade</h2>
            <Modal.Close
              closeAction={() => {
                formUpdate.reset();
                closeModal();
              }}
            >
              <X />
            </Modal.Close>
          </div>
          <Modal.Body>
            <SkillForm key={formKey} form={formUpdate} />
            <Modal.Confirm
              confirmAction={formUpdate.handleSubmit((data) =>
                console.log(data)
              )}
            >
              Salvar <Save />
            </Modal.Confirm>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default UpdateSkillModal;
