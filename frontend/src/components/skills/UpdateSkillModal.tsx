import { useModal } from "@/contexts/ModalContext";
import { Modal } from "../modal";
import { Save, X } from "lucide-react";
import { useSkills } from "@/hooks/useSkills";
import { SkillForm } from "./SkillForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { LoadingSpin } from "../LoadingSpin";
import {
  skillFormSchema,
  type SkillFormSchemaDTO,
} from "@/schemas/skillSchemas";
import { Feedback } from "../feedback";

export function UpdateSkillModal() {
  const { currentModal, closeModal } = useModal();
  const { currentSkill, updateSkillMutation, errorMessage } = useSkills();
  const [formKey, setFormKey] = useState<number>(0);

  const formUpdate = useForm<SkillFormSchemaDTO>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: { type: "update" },
  });

  useEffect(() => {
    console.log("currentSkill", currentSkill);
    if (currentSkill) {
      formUpdate.reset({
        type: "update",
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
            <SkillForm
              formKey={formKey}
              form={formUpdate}
              isEditable={updateSkillMutation.isPending}
            />

            {updateSkillMutation.isError && (
              <Feedback.Root>
                <Feedback.Error message={errorMessage} />
              </Feedback.Root>
            )}

            <Modal.Confirm
              className="mt-4"
              disabled={updateSkillMutation.isPending}
              confirmAction={() => {
                const data = formUpdate.getValues();
                if (data.type === "update") {
                  updateSkillMutation.mutate(data);
                }
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
