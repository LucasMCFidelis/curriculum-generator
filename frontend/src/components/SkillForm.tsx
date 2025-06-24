import type { Path, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useSkills } from "@/contexts/SkillContext";
import type { formSkillCreateDTO } from "@/schemas/formSkillCreate";

interface SkillFormProps<T extends Partial<formSkillCreateDTO>> {
  form: UseFormReturn<T>;
  isEditable?: boolean;
}

function SkillForm<T extends Partial<formSkillCreateDTO>>({
  form,
  isEditable = true,
}: SkillFormProps<T>) {
  const { skillsTypes } = useSkills();

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name={"skillTitle" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Titulo..."
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
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={!isEditable}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillsTypes?.map((type, index) => (
                      <SelectItem key={index} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                    <SelectItem value="Outro">Outro tipo</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
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

export default SkillForm;
