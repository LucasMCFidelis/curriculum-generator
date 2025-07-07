import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { handleNavigation } from "@/utils/handleNavigation";
import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { DateDisplay } from "./DateDisplay";
import { Calendar } from "./ui/calendar";
import type { DateRange } from "react-day-picker";

interface SelectRangeDateProps {
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
  className?: string;
}

export function SelectRangeDate({
  dateRange,
  setDateRange,
  className,
}: SelectRangeDateProps) {
  return (
    <div id="filterRangeDate" className={cn("space-y-2", className)}>
      <Label>Selecione um intervalo de datas</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-between h-fit md:h-auto text-left font-normal w-full",
              !dateRange && "text-muted-foreground"
            )}
            onClick={() => handleNavigation("filterRangeDate")}
          >
            {dateRange ? (
              <div className="flex flex-wrap gap-x-2">
                {dateRange.from && (
                  <DateDisplay date={dateRange.from.toISOString()} />
                )}
                {dateRange.to && (
                  <>
                    à <DateDisplay date={dateRange.to.toISOString()} />
                  </>
                )}
              </div>
            ) : (
              <span>Selecione uma data</span>
            )}{" "}
            <CalendarDays />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            numberOfMonths={2}
            selected={dateRange}
            onSelect={setDateRange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            captionLayout="dropdown"
            className="rounded-md border w-full"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
