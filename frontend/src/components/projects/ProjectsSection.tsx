import { useProjects } from "@/hooks/useProjects";
import { SectionsList } from "@/utils/SectionsList";
import { Feedback } from "../feedback";
import { Button } from "../ui/button";
import { PenBox, RefreshCcw, Trash2 } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DateDisplay } from "../DateDisplay";
import { getFormattedDuration } from "@/utils/getFormattedDuration";

export function ProjectsSection() {
  const {
    setCurrentProject,
    errorMessage,
    projectsUser,
    isLoadingProjects,
    isErrorProjects,
    refetchProjects,
  } = useProjects();

  return (
    <section id={SectionsList.projects.id} className="space-y-4">
      <h2>{SectionsList.projects.label}</h2>

      {isErrorProjects && (
        <Feedback.Root>
          <Feedback.Error message={errorMessage} />
          <Button className="w-full sm:w-fit" onClick={() => refetchProjects()}>
            Recarregar Projetos <RefreshCcw />
          </Button>
        </Feedback.Root>
      )}

      {isLoadingProjects && (
        <Feedback.Root>
          <Feedback.Loading message="Carregando Projetos" />
        </Feedback.Root>
      )}

      {!isErrorProjects && !isLoadingProjects && projectsUser && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectsUser.map((project) => (
            <Card key={project.projectId}>
              <CardHeader className="grid grid-rows-1 items-center">
                <CardTitle>
                  <h3>{project.projectTitle}</h3>
                </CardTitle>
                <CardAction>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setCurrentProject(project);
                    }}
                  >
                    <PenBox />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setCurrentProject(project);
                    }}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>
                  <p>{project.projectDescription}</p>
                  {project.projectRepository && (
                    <p>
                      <strong>Repositório: </strong>
                      <Button variant={"link"} className="p-0 h-fit" asChild>
                        <a
                          href={project.projectRepository}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {project.projectRepository}
                        </a>
                      </Button>
                    </p>
                  )}
                  {project.projectDeploy && (
                    <p>
                      <strong>Deploy: </strong>
                      <Button variant={"link"} className="p-0 h-fit" asChild>
                        <a
                          href={project.projectRepository}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {project.projectDeploy}
                        </a>
                      </Button>
                    </p>
                  )}
                  <p>
                    <strong>Período: </strong>
                    <DateDisplay date={project.projectStartDate} /> -{" "}
                    {project.projectFinished && project.projectEndDate ? (
                      <DateDisplay date={project.projectEndDate} />
                    ) : (
                      "Até o momento"
                    )}
                  </p>
                  <p>
                    <strong>Duração:</strong>{" "}
                    {getFormattedDuration(
                      project.projectStartDate,
                      project.projectEndDate
                    )}
                  </p>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p>
                  Criada em: <DateDisplay date={project.projectCreatedAt} />
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
