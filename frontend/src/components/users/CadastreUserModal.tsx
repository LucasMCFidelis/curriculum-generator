import { useModal } from "@/contexts/ModalContext";
import { Modal } from "../modal";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUserCadastreSchema } from "@/schemas/formUserCadastreSchema";
import type { formUserCadastreSchemaDTO } from "@/schemas/formUserCadastreSchema";
import { UserForm } from "./UserForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/User";
import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpin } from "../LoadingSpin";
import { useState } from "react";
import { isAxiosError } from "axios";

export function CadastreUserModal() {
  const { currentModal, closeModal } = useModal();
  const { setCurrentUser, currentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const formCadastreUser = useForm<formUserCadastreSchemaDTO>({
    resolver: zodResolver(formUserCadastreSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
    },
  });

  const cadastreUserMutation = useMutation({
    mutationFn: async (data: formUserCadastreSchemaDTO) => {
      const userResponse = await api.post("/users", data);
      return userResponse.data;
    },
    onSuccess: (createdUser) => {
      queryClient.setQueryData<User>(["user"], createdUser);
      setCurrentUser({
        userId: createdUser.userId,
        userEmail: createdUser.userEmail,
        userName: createdUser.userName,
      });
      console.log(currentUser);

      formCadastreUser.reset();
      closeModal();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage("Erro ao cadastrar usuário, tente novamente!");
      }
      console.log(error);
    },
  });

  return (
    <>
      {currentModal === "cadastreUser" && (
        <Modal.Root>
          <Modal.Header>
            <h2>Cadastro</h2>
            <Modal.Close closeAction={closeModal}>
              <X />
            </Modal.Close>
          </Modal.Header>
          <Modal.Body>
            <UserForm
              form={formCadastreUser}
              isEditable={true}
              inputPassword={true}
            />
            {cadastreUserMutation.isError && (
              <p className="text-destructive">{errorMessage}</p>
            )}
            <Modal.Confirm
              className="mt-4"
              disabled={cadastreUserMutation.isPending}
              confirmAction={formCadastreUser.handleSubmit(async (data) => {
                cadastreUserMutation.mutate(data);
              })}
            >
              {cadastreUserMutation.isPending ? (
                <>
                  Cadastrando <LoadingSpin />
                </>
              ) : (
                <>
                  Cadastrar <Plus />
                </>
              )}
            </Modal.Confirm>
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}
