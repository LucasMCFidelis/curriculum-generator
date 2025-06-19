import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUserCadastreSchema } from "@/schemas/formUserCadastreSchema";
import type { formUserCadastreSchemaDTO } from "@/schemas/formUserCadastreSchema";
import UserForm from "./UserForm";

function CadastreUserModal() {
  const { currentModal, closeModal } = useModal();

  const formCadastreUser = useForm<formUserCadastreSchemaDTO>({
    resolver: zodResolver(formUserCadastreSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userCity: "",
      userPortfolio: "",
      userGitHub: "",
      userLinkedIn: "",
      userResume: "",
      userPassword: "",
    },
  });

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
            <UserForm
              form={formCadastreUser}
              isEditable={true}
              inputPassword={true}
            />
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default CadastreUserModal;
