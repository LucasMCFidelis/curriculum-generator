import type { formWorkExperienceCreateDTO } from "@/schemas/formWorkExperienceCreate";
import type { UseFormReturn } from "react-hook-form";
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
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { DateDisplay } from "./DateDisplay";

interface WorkExperienceFormProps {
  form: UseFormReturn<formWorkExperienceCreateDTO>;
  isEditable?: boolean;
}

function WorkExperienceForm({ form, isEditable }: WorkExperienceFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="workExperiencePosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cargo..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workExperienceCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Empresa..."
                  disabled={!isEditable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workExperienceDescription"
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
          name="workExperienceFinished"
          render={({ field }) => (
            <FormItem className="grid-cols-[20px_1fr]">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value);
                    form.resetField("workExperienceEndDate");
                  }}
                />
              </FormControl>
              <FormMessage />
              <FormLabel>Experiência Finalizada</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workExperienceStartDate"
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
        {form.watch("workExperienceFinished") && (
          <FormField
            control={form.control}
            name="workExperienceEndDate"
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
                        const startDate = form.watch("workExperienceStartDate");
                        return date < startDate;
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

export default WorkExperienceForm;
