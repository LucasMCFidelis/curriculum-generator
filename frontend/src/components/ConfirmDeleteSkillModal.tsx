import { useModal } from "@/contexts/ModalContext";
import { useSkills } from "@/hooks/useSkills";
import ConfirmDeleteItemModal from "./ConfirmDeleteItem";

function ConfirmDeleteSkillModal() {
  const { currentModal } = useModal();
  const { currentSkill, deleteSkillMutation } = useSkills();

  return (
    <>
      {currentModal === "confirmDeleteSkill" && currentSkill && (
        <ConfirmDeleteItemModal
          itemType="Habilidade"
          itemId={currentSkill.skillId}
          itemTitle={currentSkill.skillTitle}
          deleteMutation={deleteSkillMutation}
        />
      )}
    </>
  );
}

export default ConfirmDeleteSkillModal;
