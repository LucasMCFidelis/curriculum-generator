import type { Path, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import FormFieldPassword from "./FormFieldPassword";
import type { UserFormFields } from "@/types/UserFormFields";

interface UserFormProps<T extends UserFormFields> {
  form: UseFormReturn<T>;
  isEditable?: boolean;
  inputPassword?: boolean;
}

function UserForm<T extends UserFormFields>({
  form,
  isEditable = true,
  inputPassword = false,
}: UserFormProps<T>) {
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name={"userName" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nome..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage className="col-span-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userEmail" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage className="col-span-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userCity" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cidade..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage className="col-span-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userPortfolio" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
              <FormLabel>Portfólio</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Portfólio..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage className="col-span-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userGitHub" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="GitHub..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage className="col-span-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userLinkedIn" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-center gap-2">
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="LinkedIn..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage className="col-span-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userResume" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid grid-cols-[100px_1fr] items-start gap-2">
              <FormLabel>Resumo</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Resumo..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage className="col-span-full" />
            </FormItem>
          )}
        />
        {inputPassword && (
          <FormFieldPassword form={form} isDisabled={!isEditable} inGrid={true} />
        )}
      </form>
    </Form>
  );
}

export default UserForm;
