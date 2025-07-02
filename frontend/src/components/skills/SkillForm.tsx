import { type Path, type UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useSkills } from "@/hooks/useSkills";
import type { formSkillCreateDTO } from "@/schemas/formSkillCreate";

interface SkillFormProps<T extends Partial<formSkillCreateDTO>> {
  form: UseFormReturn<T>;
  isEditable?: boolean;
  formKey?: React.Key;
}

export function SkillForm<T extends Partial<formSkillCreateDTO>>({
  form,
  isEditable = true,
  formKey,
}: SkillFormProps<T>) {
  const { skillsTypes } = useSkills();

  return (
    <Form key={formKey} {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name={"skillTitle" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Título..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"skillDescription" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descrição..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"skillType" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {skillsTypes.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                  <SelectItem value="Outro">Outro tipo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("skillType" as Path<T>) === "Outro" && (
          <FormField
            control={form.control}
            name={"skillTypeCustom" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outro tipo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o novo tipo"
                    {...field}
                    disabled={!isEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}
