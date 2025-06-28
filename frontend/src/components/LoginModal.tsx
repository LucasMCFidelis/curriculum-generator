import { useAuth } from "@/hooks/useAuth";
import Modal from "./modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { LogIn, X } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import LoadingSpin from "./LoadingSpin";
import FormFieldPassword from "./FormFieldPassword";

function LoginModal() {
  const { form, loginUser, closeLoginModal, isLoginLoading, isLoginError } =
    useAuth();
  const { currentModal } = useModal();

  return (
    <>
      {currentModal === "loginUser" && (
        <Modal.Root>
          <Modal.Header>
            <h2>Login</h2>
            <Modal.Close closeAction={closeLoginModal}>
              <X />
            </Modal.Close>
          </Modal.Header>
          <Modal.Body>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="userEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email..."
                          disabled={isLoginLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormFieldPassword form={form} isDisabled={isLoginLoading} />
              </form>
            </Form>
          </Modal.Body>
          {isLoginError && (
            <p className="text-destructive font-bold text-center">
              {isLoginError}
            </p>
          )}
          <Modal.Confirm
            type="submit"
            confirmAction={form.handleSubmit(async (data) => {
              await loginUser(data);
            })}
            disabled={isLoginLoading}
            className="w-full"
          >
            {isLoginLoading ? (
              <>
                Entrando...
                <LoadingSpin />
              </>
            ) : (
              <>
                Login <LogIn />
              </>
            )}
          </Modal.Confirm>
        </Modal.Root>
      )}
    </>
  );
}

export default LoginModal;
