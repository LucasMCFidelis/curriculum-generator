import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { X } from "lucide-react";

function ProfileUserModal() {
  const { currentModal, closeModal } = useModal();

  if (currentModal !== "profileUser") return null;

  return (
    
        <Modal.Root>
          <Modal.Close closeAction={closeModal}>
            <X />
          </Modal.Close>
          <Modal.Body>
            <h2>teste</h2>
          </Modal.Body>
        </Modal.Root>
     
  );
}

export default ProfileUserModal;
