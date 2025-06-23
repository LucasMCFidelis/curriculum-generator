import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { Trash2, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { isAxiosError } from "axios";

function ConfirmDeleteAccountModal() {
  const { currentModal, closeModal } = useModal();
  const { currentUser, logoutUser } = useAuth()
  const [confirmationText, setConfirmationText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleClose = () => {
    setConfirmationText("");
    setError("");
    closeModal();
  };

  const handleDelete = async () => {
    if (confirmationText !== "DELETAR") {
      setError("Você precisa digitar exatamente 'DELETAR'");
      return;
    }

    try {
      console.log("deletar");
      if (!currentUser) return
      await api.delete(`/users?userId=${currentUser.userId}`)
      handleClose();
      logoutUser()
    } catch (error) {
      console.log(error);
      
      if(isAxiosError(error)){
        setError(error.response?.data.message)
      }
    }
  };

  return (
    <>
      {currentModal === "ConfirmDeleteAccount" && (
        <Modal.Root>
          <h2>
            Confirmar exclusão de conta
          </h2>
          <Modal.Body>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="col-span-full flex flex-col gap-2">
                <p className="text-justify">
                  Para confirmar a exclusão da sua conta digite "DELETAR" e
                  confirme
                </p>
                <Input
                  value={confirmationText}
                  onChange={(e) => {
                    setConfirmationText(e.target.value);
                    setError("");
                  }}
                  placeholder="Digite aqui..."
                  autoFocus
                />
                {error && (
                  <p className="text-destructive">{error}</p>
                )}
              </div>
              <Modal.Close closeAction={handleClose}>
                Cancelar
                <X />
              </Modal.Close>
              <Modal.Confirm confirmAction={handleDelete}>
                Deletar minha conta
                <Trash2 />
              </Modal.Confirm>
            </div>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default ConfirmDeleteAccountModal;
