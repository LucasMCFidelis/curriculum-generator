import { useAuth } from "@/hooks/useAuth";
import Modal from "./modal";
import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema } from "@/schemas/formLoginSchema";
import type {formLoginDTO} from "@/schemas/formLoginSchema"

function LoginModal() {
  const { isLoginModalOpen, loginUser, closeLoginModal } = useAuth();

  const form = useForm<formLoginDTO>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

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
