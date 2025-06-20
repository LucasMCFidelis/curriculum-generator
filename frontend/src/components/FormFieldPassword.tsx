import { EyeClosed, Eye } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import type { Path, UseFormReturn } from "react-hook-form";
import type { UserFormFields } from "@/types/UserFormFields";

interface FormFieldPasswordProps<T extends UserFormFields> {
  isDisabled?: boolean;
  form: UseFormReturn<T>;
  inGrid?: boolean;
}

function FormFieldPassword<T extends UserFormFields>({
  isDisabled,
  form,
  inGrid = false,
}: FormFieldPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <FormField
      control={form.control}
      name={"userPassword" as Path<T>}
      render={({ field }) => (
        <FormItem
          className={`${
            inGrid && "grid md:grid-cols-[100px_1fr] items-center gap-2"
          }`}
        >
          <FormLabel>Senha</FormLabel>
          <FormControl>
            <div className="relative w-full">
              <Input
                placeholder="Senha..."
                type={(showPassword || !isDisabled) ? "text" : "password"}
                disabled={isDisabled}
                {...field}
              />
              <Button
                type="button"
                variant={"ghost"}
                onClick={toggleShowPassword}
                disabled={isDisabled}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-secondary-foreground dark:text-primary-foreground hover:bg-transparent dark:hover:bg-transparent"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
          </FormControl>
          <FormMessage className={`${inGrid && "col-span-full"}`} />
        </FormItem>
      )}
    />
  );
}

export default FormFieldPassword;
