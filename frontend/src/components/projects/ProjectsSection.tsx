import { useProjects } from "@/hooks/useProjects";
import { SectionsList } from "@/utils/SectionsList";
import { Feedback } from "../feedback";
import { Button } from "../ui/button";
import { PenBox, Plus, RefreshCcw, Trash2 } from "lucide-react";
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
import { useModal } from "@/contexts/ModalContext";
import { CreateProjectModal } from "./CreateProjectModal";
import { ConfirmDeleteProjectModal } from "./ConfirmDeleteProjectModal";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { SearchInput } from "../SearchInput";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { SelectRangeDate } from "../SelectRangeDate";
import { normalizeString } from "@/utils/normalizeString";
import { isDateInRange } from "@/utils/isDateInRange";

export function ProjectsSection() {
  const {
    setCurrentProject,
    errorMessage,
    projectsUser,
    isLoadingProjects,
    isErrorProjects,
    refetchProjects,
  } = useProjects();
  const { openModal } = useModal();
  const [searchProject, setSearchProject] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  function clearFilters() {
    setSearchProject("");
    setDateRange(undefined);
  }

  const filteredProjects = useMemo(() => {
    if (!projectsUser) return [];

    const searchProjectNormalized = normalizeString(searchProject);

    return projectsUser?.filter((project) => {
      const matchesSearch =
        normalizeString(project.projectTitle).includes(
          searchProjectNormalized
        ) ||
        (project.projectDescription &&
          normalizeString(project.projectDescription).includes(
            searchProjectNormalized
          )) ||
        (project.projectRepository &&
          normalizeString(project.projectRepository).includes(
            searchProjectNormalized
          )) ||
        (project.projectDeploy &&
          normalizeString(project.projectDeploy).includes(
            searchProjectNormalized
          ));

      const matchesStartOrEnd =
        isDateInRange(project.projectStartDate, dateRange) ||
        isDateInRange(
          project.projectFinished ? project.projectEndDate : new Date(),
          dateRange
        );

      return matchesSearch && matchesStartOrEnd;
    });
  }, [dateRange, projectsUser, searchProject]);

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
        <>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-[1fr_35%] xl:grid-cols-4">
            <SearchInput
              value={searchProject}
              setValue={setSearchProject}
              placeholder="Buscar Projeto"
              className="md:col-span-2"
            />
            <SelectRangeDate
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
            <Button className="self-end" onClick={clearFilters}>
              Limpar Filtros <RefreshCcw />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
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
                        openModal("updateProject");
                      }}
                    >
                      <PenBox />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setCurrentProject(project);
                        openModal("confirmDeleteProject");
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
                            href={project.projectDeploy}
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
            <Card
              className="cursor-pointer"
              onClick={() => openModal("createProject")}
            >
              <CardHeader className="grid grid-cols-[1fr_50px] items-center">
                <CardTitle>
                  <h3>Cadastrar novo Projeto</h3>
                </CardTitle>
                <Plus className="justify-self-end" />
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>Criar um novo projeto</CardDescription>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      <CreateProjectModal />
      <ConfirmDeleteProjectModal />
      <UpdateProjectModal />
    </section>
  );
}
