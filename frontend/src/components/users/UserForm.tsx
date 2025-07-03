import type { Path, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormFieldPassword } from "./FormFieldPassword";
import type { UserFormFields } from "@/types/UserFormFields";

interface UserFormProps<T extends UserFormFields> {
  form: UseFormReturn<T>;
  isEditable?: boolean;
  inputPassword?: boolean;
}

export function UserForm<T extends UserFormFields>({
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
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nome..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userEmail" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userCity" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cidade..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userPortfolio" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfólio</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Portfólio..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userGitHub" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="GitHub..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userLinkedIn" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="LinkedIn..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"userResume" as Path<T>}
          render={({ field }) => (
            <FormItem className="grid md:grid-cols-[100px_1fr] items-start gap-2">
              <FormLabel>Resumo</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Resumo..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {inputPassword && (
          <FormFieldPassword
            form={form}
            isDisabled={!isEditable}
            inGrid={true}
          />
        )}
      </form>
    </Form>
  );
}
