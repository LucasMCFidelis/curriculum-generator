import { type UseFormReturn } from "react-hook-form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSkills } from "@/hooks/useSkills";
import type { SkillFormSchemaDTO } from "@/schemas/skillSchemas";

interface SkillFormProps {
  form: UseFormReturn<SkillFormSchemaDTO>;
  isEditable?: boolean;
  formKey?: React.Key;
}

export function SkillForm({
  form,
  isEditable = true,
  formKey,
}: SkillFormProps) {
  const { skillsTypes } = useSkills();

  return (
    <Form {...form}>
      <form key={formKey} className="space-y-4">
        <FormField
          control={form.control}
          name="skillTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Título..."
                  disabled={isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skillDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descrição..."
                  disabled={isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skillType"
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

        {form.watch("skillType") === "Outro" && (
          <FormField
            control={form.control}
            name="skillTypeCustom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outro tipo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o novo tipo"
                    {...field}
                    disabled={isEditable}
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
