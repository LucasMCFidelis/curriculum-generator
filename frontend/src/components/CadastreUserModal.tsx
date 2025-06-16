import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { X } from "lucide-react";

function CadastreUserModal() {
  const { currentModal, closeModal } = useModal();

  return (
    <>
      {currentModal === "cadastreUser" && (
        <Modal.Root>
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold">Cadastro</h2>
            <Modal.Close closeAction={closeModal}>
              <X />
            </Modal.Close>
          </div>
          <Modal.Body>
            <div></div>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default CadastreUserModal;
