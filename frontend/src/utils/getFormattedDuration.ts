import dayjs from "dayjs";

export function getFormattedDuration(start: string, end?: string) {
  return end ? dayjs(start).from(end, true) : dayjs(start).fromNow(true);
}
