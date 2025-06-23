import { useForm } from "react-hook-form";
import Modal from "./modal";
import SkillForm from "./SkillForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSkillCreate } from "@/schemas/formSkillCreate";
import type { formSkillCreateDTO } from "@/schemas/formSkillCreate";
import { useModal } from "@/contexts/ModalContext";
import { Save, X } from "lucide-react";

function CreateSkillModal() {
  const { currentModal, closeModal } = useModal();

  const formCreateSkill = useForm<formSkillCreateDTO>({
    resolver: zodResolver(formSkillCreate),
  });

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
            <Modal.Confirm className="mt-4" confirmAction={formCreateSkill.handleSubmit((data)=>{
              console.log("Dados formatados:", data);
            })}>
              Cadastrar 
              <Save/>
            </Modal.Confirm>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default CreateSkillModal;
