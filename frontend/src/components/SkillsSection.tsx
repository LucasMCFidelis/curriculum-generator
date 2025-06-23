import { Button } from "./ui/button";
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
import { useModal } from "@/contexts/ModalContext";
import { useSkills } from "@/contexts/SkillContext";
import LoadingSpin from "./LoadingSpin";

function SkillsSection() {
  const { skillsUser, isLoadingSkills, isErrorSkills, refetchSkills } =
    useSkills();
  const { openModal } = useModal();

  return (
    <section>
      <h2>Habilidades</h2>

      {isErrorSkills && (
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-destructive">Erro</p>
          <Button className="w-full sm:w-fit" onClick={() => refetchSkills()}>
            Recarregar Habilidades
          </Button>
        </div>
      )}

      {isLoadingSkills && (
        <div className="flex gap-3 items-center justify-center">
          <p>Carregando Habilidades</p>
          <LoadingSpin />
        </div>
      )}

      {!isLoadingSkills && !isErrorSkills && skillsUser && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillsUser.map((skill) => (
            <Card key={skill.skillId}>
              <CardHeader className="grid grid-rows-1 items-center">
                <CardTitle className="grid items-center justify-between w-3/4 grid-cols-[100px_10px_100px]">
                  <h3>{skill.skillTitle}</h3>
                  <h3>-</h3>
                  <h3 className="justify-self-center">{skill.skillType}</h3>
                </CardTitle>
                <CardAction>
                  <Button variant={"ghost"}>
                    <PenBox />
                  </Button>
                  <Button variant={"ghost"}>
                    <Trash2 className="text-destructive" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription>{skill.skillDescription}</CardDescription>
              </CardContent>
              <CardFooter>
                Criada em:{" "}
                {new Date(skill.skillCreatedAt).toLocaleDateString("pt-BR")}
              </CardFooter>
            </Card>
          ))}
          <Card
            className="cursor-pointer"
            onClick={() => openModal("createSkill")}
          >
            <CardHeader className="grid grid-cols-[1fr_50px] items-center">
              <CardTitle>
                <h3>Cadastrar nova Habilidade</h3>
              </CardTitle>
              <Plus className="justify-self-end" />
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>
                Criar uma nova habilidade e selecionar relacionamentos dela
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}

export default SkillsSection;
