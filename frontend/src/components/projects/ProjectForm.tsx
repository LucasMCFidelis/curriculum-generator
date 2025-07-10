import type { UseFormReturn } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { DateDisplay } from "../DateDisplay";
import { Calendar } from "../ui/calendar";
import type { ProjectFormSchemaDTO } from "@/schemas/projectSchemas";

interface ProjectFormProps {
  form: UseFormReturn<ProjectFormSchemaDTO>;
  isEditable?: boolean;
}

export function ProjectForm({ form, isEditable }: ProjectFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="projectTitle"
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
          name="projectDescription"
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
          name="projectRepository"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repositório</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Repositório..."
                  disabled={isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDeploy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deploy</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Deploy..."
                  disabled={isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectFinished"
          render={({ field }) => (
            <FormItem className="grid-cols-[20px_1fr]">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value);
                    form.resetField("projectEndDate");
                  }}
                />
              </FormControl>
              <FormMessage />
              <FormLabel>Projeto Finalizado</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de inicio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-between pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        <DateDisplay date={field.value.toISOString()} />
                      ) : (
                        <span>Selecione uma data</span>
                      )}{" "}
                      <CalendarDays />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("projectFinished") && (
          <FormField
            control={form.control}
            name="projectEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de termino</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-between pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <DateDisplay date={field.value.toISOString()} />
                        ) : (
                          <span>Selecione uma data</span>
                        )}{" "}
                        <CalendarDays />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const startDate = form.watch("projectStartDate");
                        return (
                          (startDate ? date < startDate : false) ||
                          date > new Date()
                        );
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}
