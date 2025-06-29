import { useWorkExperiences } from "@/hooks/useWorkExperiences";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PenBox, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import LoadingSpin from "./LoadingSpin";
import { DateDisplay } from "./DateDisplay";
import { getFormattedDuration } from "@/utils/getFormattedDuration";
import { useModal } from "@/contexts/ModalContext";

function WorkExperienceSection() {
  const {
    workExperiencesUser,
    isLoadingWorkExperiencesUser,
    isErrorWorkExperiencesUser,
    refetchWorkExperiencesUser,
    errorMessage,
  } = useWorkExperiences();
  const { openModal } = useModal();

  return (
    <section id="workExperienceSection" className="space-y-4">
      <h2>Experiências Profissionais</h2>

      {isLoadingWorkExperiencesUser && (
        <div className="flex gap-2 justify-center items-center">
          <p>Carregando Experiências Profissionais...</p>
          <LoadingSpin />
        </div>
      )}

      {isErrorWorkExperiencesUser && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-destructive">{errorMessage}</p>
          <Button
            className="w-full sm:w-fit"
            onClick={() => refetchWorkExperiencesUser()}
          >
            Recarregar Experiências Profissionais
          </Button>
        </div>
      )}

      {!isLoadingWorkExperiencesUser &&
        !isErrorWorkExperiencesUser &&
        workExperiencesUser && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workExperiencesUser.map((workExperience) => (
              <Card key={workExperience.workExperienceId}>
                <CardHeader className="grid grid-rows-1 items-center">
                  <CardTitle>{workExperience.workExperiencePosition}</CardTitle>
                  <CardAction>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        console.log("teste");
                      }}
                    >
                      <PenBox />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        console.log("teste");
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
        )}
    </section>
  );
}

export default WorkExperienceSection;
