import { useWorkExperiences } from "@/hooks/useWorkExperiences";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CalendarDays,
  PenBox,
  Plus,
  RefreshCwIcon,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { DateDisplay } from "../DateDisplay";
import { getFormattedDuration } from "@/utils/getFormattedDuration";
import { useModal } from "@/contexts/ModalContext";
import { SearchInput } from "../SearchInput";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { isDateInRange } from "@/utils/isDateInRange";
import { handleNavigation } from "@/utils/handleNavigation";
import { normalizeString } from "@/utils/normalizeString";
import { Feedback } from "../feedback";

export function WorkExperienceSection() {
  const {
    workExperiencesUser,
    isLoadingWorkExperiencesUser,
    isErrorWorkExperiencesUser,
    refetchWorkExperiencesUser,
    errorMessage,
    setCurrentWorkExperience,
  } = useWorkExperiences();
  const { openModal } = useModal();

  const [searchWorkExperience, setSearchWorkExperience] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const filteredWorkExperiences = useMemo(() => {
    if (!workExperiencesUser) return [];

    const searchWorkExperienceNormalized =
      normalizeString(searchWorkExperience);

    return workExperiencesUser.filter((workExperience) => {
      const matchesSearch =
        normalizeString(workExperience.workExperiencePosition).includes(
          searchWorkExperienceNormalized
        ) ||
        normalizeString(workExperience.workExperienceCompany).includes(
          searchWorkExperienceNormalized
        ) ||
        (workExperience.workExperienceDescription &&
          normalizeString(workExperience.workExperienceDescription).includes(
            searchWorkExperienceNormalized
          ));

      const matchesStartOrEnd =
        isDateInRange(workExperience.workExperienceStartDate, dateRange) ||
        isDateInRange(
          workExperience.workExperienceFinished
            ? workExperience.workExperienceEndDate
            : new Date(),
          dateRange
        );

      return matchesSearch && matchesStartOrEnd;
    });
  }, [searchWorkExperience, workExperiencesUser, dateRange]);

  function clearFilters() {
    setSearchWorkExperience("");
    setDateRange(undefined);
  }

  return (
    <section id="workExperienceSection" className="space-y-4">
      <h2>Experiências Profissionais</h2>

      {isLoadingWorkExperiencesUser && (
        <Feedback.Root>
          <Feedback.Loading message="Carregando Experiências Profissionais" />
        </Feedback.Root>
      )}

      {isErrorWorkExperiencesUser && (
        <Feedback.Root>
          <Feedback.Error message={errorMessage} />
          <Button
            className="w-full sm:w-fit"
            onClick={() => refetchWorkExperiencesUser()}
          >
            Recarregar Experiências Profissionais
          </Button>
        </Feedback.Root>
      )}

      {!isLoadingWorkExperiencesUser &&
        !isErrorWorkExperiencesUser &&
        workExperiencesUser && (
          <>
            <div className="grid gap-2 md:grid-cols-[1fr_35%]  md:gap-4 xl:grid-cols-4">
              <SearchInput
                value={searchWorkExperience}
                setValue={setSearchWorkExperience}
                placeholder="Buscar Experiência Profissional"
                className="col-span-2"
              />

              <div
                id="filterRangeDateWE"
                className="space-y-2 col-span-2 sm:col-auto"
              >
                <Label>Selecione um intervalo de datas</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-between h-fit md:h-auto text-left font-normal w-full",
                        !dateRange && "text-muted-foreground"
                      )}
                      onClick={() => handleNavigation("filterRangeDateWE")}
                    >
                      {dateRange ? (
                        <div className="flex flex-wrap gap-x-2">
                          {dateRange.from && (
                            <DateDisplay date={dateRange.from.toISOString()} />
                          )}
                          {dateRange.to && (
                            <>
                              à{" "}
                              <DateDisplay date={dateRange.to.toISOString()} />
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
              <Button className="w-full self-end" onClick={clearFilters}>
                Limpar Filtros <RefreshCwIcon />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredWorkExperiences.map((workExperience) => (
                <Card key={workExperience.workExperienceId}>
                  <CardHeader className="grid grid-rows-1 items-center">
                    <CardTitle>
                      {workExperience.workExperiencePosition}
                    </CardTitle>
                    <CardAction>
                      <Button
                        variant={"ghost"}
                        onClick={() => {
                          setCurrentWorkExperience(workExperience);
                          openModal("updateWorkExperience");
                        }}
                      >
                        <PenBox />
                      </Button>
                      <Button
                        variant={"ghost"}
                        onClick={() => {
                          setCurrentWorkExperience(workExperience);
                          openModal("confirmDeleteWorkExperience");
                        }}
                      >
                        <Trash2 className="text-destructive" />
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="space-y-2">
                      <p>{workExperience.workExperienceDescription}</p>
                      <p>
                        <strong>Empresa: </strong>
                        {workExperience.workExperienceCompany}
                      </p>
                      <p>
                        <strong>Período: </strong>
                        <DateDisplay
                          date={workExperience.workExperienceStartDate}
                        />{" "}
                        -{" "}
                        {workExperience.workExperienceFinished &&
                        workExperience.workExperienceEndDate ? (
                          <DateDisplay
                            date={workExperience.workExperienceEndDate}
                          />
                        ) : (
                          "Até o momento"
                        )}
                      </p>
                      <p>
                        <strong>Duração: </strong>
                        {getFormattedDuration(
                          workExperience.workExperienceStartDate,
                          workExperience.workExperienceFinished
                            ? workExperience.workExperienceEndDate
                            : undefined
                        )}
                      </p>
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <p>
                      Criada em:{" "}
                      <DateDisplay
                        date={workExperience.workExperienceCreatedAt}
                      />
                    </p>
                  </CardFooter>
                </Card>
              ))}
              <Card
                className="cursor-pointer"
                onClick={() => openModal("createWorkExperience")}
              >
                <CardHeader className="grid grid-cols-[1fr_50px] items-center">
                  <CardTitle>
                    <h3>Cadastrar nova Experiência Profissional</h3>
                  </CardTitle>
                  <Plus className="justify-self-end" />
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription>
                    Criar uma nova experiência profissional
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </>
        )}
    </section>
  );
}
