import { useModal } from "@/contexts/ModalContext";
import { Modal } from "./modal";
import { Trash2, X } from "lucide-react";
import { LoadingSpin } from "./LoadingSpin";
import type { UseMutationResult } from "@tanstack/react-query";

interface ConfirmDeleteItemModalProps {
  itemType: string;
  itemId: string;
  itemTitle: string;
  deleteMutation: UseMutationResult<void, Error, string>;
  errorMessage?: string;
}

export function ConfirmDeleteItemModal({
  itemType,
  itemId,
  itemTitle,
  deleteMutation,
  errorMessage = "Erro ao realizar exclusão",
}: ConfirmDeleteItemModalProps) {
  const { closeModal } = useModal();

  return (
    <Modal.Root>
      <Modal.Header>
        <h3>
          Confirmar exclusão de {itemType}{" "}
          <strong className="text-destructive">{itemTitle}</strong> ?
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="grid md:grid-cols-2 gap-4">
          <Modal.Close
            disabled={deleteMutation.isPending}
            closeAction={() => closeModal()}
          >
            Cancelar <X />
          </Modal.Close>
          <Modal.Confirm
            disabled={deleteMutation.isPending}
            confirmAction={() => deleteMutation.mutate(itemId)}
          >
            {deleteMutation.isPending ? (
              <>
                Excluindo... <LoadingSpin />
              </>
            ) : (
              <>
                Excluir <Trash2 />
              </>
            )}
          </Modal.Confirm>
          {deleteMutation.isError && (
            <p className="text-destructive">{errorMessage}</p>
          )}
        </div>
      </Modal.Body>
    </Modal.Root>
  );
}
