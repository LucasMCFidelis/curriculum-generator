import { useModal } from "@/contexts/ModalContext";
import Modal from "./modal";
import { Edit, Save, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "@/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import type { User } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUserUpdateSchema } from "@/schemas/formUserUpdateSchema";
import type { formUserUpdateSchemaDTO } from "@/schemas/formUserUpdateSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpin from "./LoadingSpin";
import { isAxiosError } from "axios";

function ProfileUserModal() {
  const { currentUser } = useAuth();
  const { currentModal, closeModal } = useModal();
  const [isEditableDataUser, setIsEditableDataUser] = useState<boolean>(false);
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] =
    useState<boolean>(false);
    const [isErrorUpdate, setIsErrorUpdate] = useState<string>("")

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

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser || !userComplete) return;
      try {
        // Atualiza os valores do formulário com os dados obtidos
        formProfileUser.reset({
          userName: userComplete.userName || "",
          userEmail: userComplete.userEmail || "",
          userCity: userComplete.userCity || "",
          userPortfolio: userComplete.userPortfolio || "",
          userGitHub: userComplete.userGitHub || "",
          userLinkedIn: userComplete.userLinkedIn || "",
          userResume: userComplete.userResume || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados completos do usuário:", error);
      }
    }

    fetchUserData();
  }, [currentUser, userComplete]);

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
      let errorMessage
      if (isAxiosError(error)){
        errorMessage = error.response?.data.message
      }
      setIsErrorUpdate(errorMessage || "Erro inesperado ao atualizar dados do usuário")
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
                formProfileUser.reset();
                setIsErrorUpdate("")
                closeModal();
              }}
            >
              <X />
            </Modal.Close>
          </div>
          <Modal.Body>
            {userComplete && (
              <Form {...formProfileUser}>
                <form className="grid gap-4">
                  <FormField
                    control={formProfileUser.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Nome..."
                            disabled={!isEditableDataUser}
                          />
                        </FormControl>
                        <FormMessage className="col-span-full" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProfileUser.control}
                    name="userEmail"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Email..."
                            disabled={!isEditableDataUser}
                          />
                        </FormControl>
                        <FormMessage className="col-span-full" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProfileUser.control}
                    name="userCity"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Cidade..."
                            disabled={!isEditableDataUser}
                          />
                        </FormControl>
                        <FormMessage className="col-span-full" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProfileUser.control}
                    name="userPortfolio"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <FormLabel>Portfólio</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Portfólio..."
                            disabled={!isEditableDataUser}
                          />
                        </FormControl>
                        <FormMessage className="col-span-full" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProfileUser.control}
                    name="userGitHub"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="GitHub..."
                            disabled={!isEditableDataUser}
                          />
                        </FormControl>
                        <FormMessage className="col-span-full" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProfileUser.control}
                    name="userLinkedIn"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="LinkedIn..."
                            disabled={!isEditableDataUser}
                          />
                        </FormControl>
                        <FormMessage className="col-span-full" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formProfileUser.control}
                    name="userResume"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[100px_1fr] items-start gap-2">
                        <FormLabel>Resumo</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Resumo..."
                            disabled={!isEditableDataUser}
                          />
                        </FormControl>
                        <FormMessage className="col-span-full" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {isLoading && (
              <div className="flex justify-center items-center gap-4">
                <p>Carregando dados do usuário...</p>
                <LoadingSpin/>
              </div>
            )}

            {isError && (
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="text-destructive">Erro ao carregar dados do usuário</p>
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
                      <LoadingSpin/>
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
