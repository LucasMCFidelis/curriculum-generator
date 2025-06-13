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

function ProfileUserModal() {
  const { currentUser } = useAuth();
  const { currentModal, closeModal } = useModal();
  const [userDataComplete, setUserDataComplete] = useState<User | null>(null);
  const [isEditableDataUser, setIsEditableDataUser] = useState<boolean>(false);

  function toggleEditableDataUser() {
    setIsEditableDataUser((prev) => !prev);
  }

  async function GetUserComplete(userId: string) {
    return await api.get(`/users?userId=${userId}`);
  }

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) return;
      try {
        const response = await GetUserComplete(currentUser.userId);
        setUserDataComplete(response.data);

        // Atualiza os valores do formulário com os dados obtidos
        formProfileUser.reset({
          userName: response.data.userName || "",
          userEmail: response.data.userEmail || "",
          userCity: response.data.userCity || "",
          userPortfolio: response.data.userPortfolio || "",
          userGitHub: response.data.userGitHub || "",
          userLinkedIn: response.data.userLinkedIn || "",
          userResume: response.data.userResume || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados completos do usuário:", error);
      }
    }

    fetchUserData();
  }, [currentUser]);

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

  return (
    <>
      {currentModal === "profileUser" && (
        <Modal.Root>
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold">Perfil</h2>
            <Modal.Close closeAction={()=>{
              formProfileUser.reset()
              closeModal()
            }}>
              <X />
            </Modal.Close>
          </div>
          <Modal.Body>
            {userDataComplete ? (
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
                        <FormMessage className="col-span-full"/>
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
                        <FormMessage />
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
                        <FormMessage />
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
                        <FormMessage />
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
                        <FormMessage />
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
                        <FormMessage />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <p className="text-sm text-muted-foreground">
                Carregando dados do usuário...
              </p>
            )}

            {isEditableDataUser ? (
              <Modal.Confirm
                confirmAction={formProfileUser.handleSubmit((data) => {
                  toggleEditableDataUser();
                  console.log("Dados enviados", data);
                })}
              >
                Salvar alterações
                <Save />
              </Modal.Confirm>
            ) : (
              <Modal.Action actionOnClick={toggleEditableDataUser}>
                Editar dados
                <Edit />
              </Modal.Action>
            )}
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}

export default ProfileUserModal;
