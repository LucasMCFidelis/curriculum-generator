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
import { Eye, EyeClosed, LogIn, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

function LoginModal() {
  const {
    form,
    isLoginModalOpen,
    loginUser,
    closeLoginModal,
    isLoginLoading,
    isLoginError,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      {isLoginModalOpen && (
        <Modal.Root>
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold">Login</h2>
            <Modal.Close closeAction={closeLoginModal}>
              <X />
            </Modal.Close>
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
                <FormField
                  control={form.control}
                  name="userPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            placeholder="Senha..."
                            type={showPassword ? "text" : "password"}
                            disabled={isLoginLoading}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant={"ghost"}
                            onClick={toggleShowPassword}
                            disabled={isLoginLoading}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-secondary-foreground dark:text-primary-foreground hover:bg-transparent dark:hover:bg-transparent"
                            aria-label={
                              showPassword ? "Ocultar senha" : "Mostrar senha"
                            }
                          >
                            {showPassword ? <EyeClosed /> : <Eye />}
                          </Button>
                        </div>
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
            type="submit"
            confirmAction={form.handleSubmit(async (data) => {
              setShowPassword(false)
              await loginUser(data)
            })}
            disabled={isLoginLoading}
            className="w-full"
          >
            {isLoginLoading ? (
              <>
                Entrando...
                <div className="w-4 h-4 border-2 border-white border-t-zinc-500 rounded-full animate-spin" />
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
