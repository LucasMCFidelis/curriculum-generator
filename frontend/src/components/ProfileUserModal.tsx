import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { Edit, Save, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { useForm } from "react-hook-form";
import type { User } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUserUpdateSchema } from "@/schemas/formUserUpdateSchema";
import type { formUserUpdateSchemaDTO } from "@/schemas/formUserUpdateSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpin from "./LoadingSpin";
import { isAxiosError } from "axios";
import UserForm from "./UserForm";

function ProfileUserModal() {
  const { currentUser } = useAuth();
  const { currentModal, closeModal } = useModal();
  const [isEditableDataUser, setIsEditableDataUser] = useState<boolean>(false);
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] =
    useState<boolean>(false);
  const [isErrorUpdate, setIsErrorUpdate] = useState<string>("");

  const queryClient = useQueryClient();

  const {
    data: userComplete,
    isLoading,
    isError,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get<User>(
        `/users?userId=${currentUser?.userId}`
      );
      return response.data;
    },
  });

  function toggleEditableDataUser() {
    setIsEditableDataUser((prev) => !prev);
  }

  const formProfileUser = useForm<formUserUpdateSchemaDTO>({
    resolver: zodResolver(formUserUpdateSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userCity: "",
      userPortfolio: "",
      userGitHub: "",
      userLinkedIn: "",
      userResume: "",
    },
  });

  function resetFormProfileUser() {
    if (!userComplete) return;
    formProfileUser.reset({
      userName: userComplete.userName || "",
      userEmail: userComplete.userEmail || "",
      userCity: userComplete.userCity || "",
      userPortfolio: userComplete.userPortfolio || "",
      userGitHub: userComplete.userGitHub || "",
      userLinkedIn: userComplete.userLinkedIn || "",
      userResume: userComplete.userResume || "",
    });
  }

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) return;
      try {
        // Atualiza os valores do formulário com os dados obtidos
        resetFormProfileUser();
      } catch (error) {
        console.error("Erro ao buscar dados completos do usuário:", error);
      }
    }

    fetchUserData();
  }, [currentUser, userComplete]);

  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: Partial<User>) => {
      await api.put(`/users?userId=${currentUser?.userId}`, updatedUser);
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User>(["user"], (oldUser) => {
        if (!oldUser) return undefined;
        return {
          ...oldUser,
          ...updatedUser,
        };
      });
    },
    onError: (error) => {
      let errorMessage;
      if (isAxiosError(error)) {
        errorMessage = error.response?.data.message;
      }
      setIsErrorUpdate(
        errorMessage || "Erro inesperado ao atualizar dados do usuário"
      );
      resetFormProfileUser();
    },
  });

  return (
    <>
      {currentModal === "profileUser" && (
        <Modal.Root>
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold">Perfil</h2>
            <Modal.Close
              closeAction={() => {
                resetFormProfileUser();
                setIsEditableDataUser(false);
                setIsErrorUpdate("");
                closeModal();
              }}
            >
              <X />
            </Modal.Close>
          </div>
          <Modal.Body>
            {userComplete && (
              <UserForm form={formProfileUser} isEditable={isEditableDataUser}/>
            )}

            {isLoading && (
              <div className="flex justify-center items-center gap-4">
                <p>Carregando dados do usuário...</p>
                <LoadingSpin />
              </div>
            )}

            {isError && (
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="text-destructive">
                  Erro ao carregar dados do usuário
                </p>
                <Modal.Action
                  type="button"
                  actionOnClick={refetch}
                  className="w-full"
                >
                  Tentar Novamente
                </Modal.Action>
              </div>
            )}

            {isErrorUpdate && (
              <p className="text-center text-destructive">{isErrorUpdate}</p>
            )}

            {!isError &&
              !isLoading &&
              (isEditableDataUser ? (
                <Modal.Confirm
                  type="submit"
                  disabled={isLoadingUpdateUser}
                  confirmAction={formProfileUser.handleSubmit(async (data) => {
                    try {
                      setIsLoadingUpdateUser(true);
                      updateUserMutation.mutate(data);
                      console.log("Dados enviados", data);
                      toggleEditableDataUser();
                    } catch (error) {
                      console.error("Erro ao atualizar usuário", error);
                    } finally {
                      setIsLoadingUpdateUser(false);
                    }
                  })}
                >
                  {isLoadingUpdateUser ? (
                    <>
                      Salvando alterações...
                      <LoadingSpin />
                    </>
                  ) : (
                    <>
                      Salvar alterações
                      <Save />
                    </>
                  )}
                </Modal.Confirm>
              ) : (
                <Modal.Action
                  type="button"
                  actionOnClick={toggleEditableDataUser}
                >
                  Editar dados
                  <Edit />
                </Modal.Action>
              ))}
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default ProfileUserModal;
