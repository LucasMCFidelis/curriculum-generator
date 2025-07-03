import dayjs from "dayjs";
import type { DateRange } from "react-day-picker";

export function isDateInRange(
  date: string | Date | undefined,
  range: DateRange | undefined
) {
  if (!range || !date) return true;
  const from = dayjs(range.from);
  const to = dayjs(range.to);
  return dayjs(date).isBetween(from, to, null, "[]");
}
