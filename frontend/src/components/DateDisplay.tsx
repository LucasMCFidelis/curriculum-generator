import dayjs from "dayjs";

interface DateDisplayProps {
  date: string;
  format?: string;
}

export function DateDisplay({
  date,
  format = "DD [de] MMMM [de] YYYY",
}: DateDisplayProps) {
  const isValidDate = dayjs(date).isValid();

  return (
    <span>{isValidDate ? dayjs(date).format(format) : "Data inválida"}</span>
  );
}
