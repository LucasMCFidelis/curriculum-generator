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

function LoginModal() {
  const { form, isLoginModalOpen, loginUser, closeLoginModal, isLoginError } =
    useAuth();

  return (
    <>
      {isLoginModalOpen && (
        <Modal.Root>
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold">Login</h2>
            <Modal.Close icon={X} closeAction={closeLoginModal} />
          </div>
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
                        <Input placeholder="Email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="Senha..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </Modal.Body>
          {isLoginError && (
            <p className="text-destructive font-bold text-center">
              {isLoginError}
            </p>
          )}
          <Modal.Confirm
            textContent="Login"
            icon={LogIn}
            type="submit"
            confirmAction={form.handleSubmit(loginUser)}
            className="w-full"
          />
        </Modal.Root>
      )}
    </>
  );
}

export default LoginModal;
