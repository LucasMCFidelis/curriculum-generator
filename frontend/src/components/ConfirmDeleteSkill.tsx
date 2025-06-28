import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { Trash2, X } from "lucide-react";
import { useSkills } from "@/contexts/SkillContext";
import { useEffect } from "react";
import LoadingSpin from "./LoadingSpin";

function ConfirmDeleteSkillModal() {
  const { currentModal, closeModal } = useModal();
  const { currentSkill, deleteSkillMutation } = useSkills();

  useEffect(() => {
    if (deleteSkillMutation.isSuccess) {
      closeModal();
    }
  }, [deleteSkillMutation.isSuccess]);

  return (
    <>
      {currentModal === "confirmDeleteSkill" && currentSkill && (
        <Modal.Root>
          <Modal.Header>
            <h3>
              Confirmar exclusão da Habilidade{" "}
              <strong className="text-destructive">
                {currentSkill?.skillTitle}
              </strong>{" "}
              ?
            </h3>
          </Modal.Header>
          <Modal.Body>
            <div className="grid md:grid-cols-2 gap-4">
              <Modal.Close
                disabled={deleteSkillMutation.isPending}
                closeAction={() => closeModal()}
              >
                Cancelar <X />
              </Modal.Close>
              <Modal.Confirm
                disabled={deleteSkillMutation.isPending}
                confirmAction={() =>
                  deleteSkillMutation.mutate(currentSkill?.skillId)
                }
              >
                {deleteSkillMutation.isPending ? (
                  <>
                    Excluindo... <LoadingSpin />
                  </>
                ) : (
                  <>
                    Excluir <Trash2 />
                  </>
                )}
              </Modal.Confirm>
            </div>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default ConfirmDeleteSkillModal;
