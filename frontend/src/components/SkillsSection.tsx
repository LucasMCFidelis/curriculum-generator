import { api } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@/types/Skill";
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
import LoadingSpin from "./LoadingSpin";
import { useModal } from "@/contexts/ModalContext";

function SkillsSection() {
  const { currentUser } = useAuth();
  const { openModal } = useModal();

  const {
    data: skillsUser,
    isLoading,
    isError,
    refetch,
  } = useQuery<Skill[], Error>({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await api.get(
        `/users?userId=${currentUser?.userId}&userSkills=true`
      );

      return response.data.userSkills;
    },
  });

  return (
    <section>
      <h2>Habilidades</h2>

      {isError && (
        <>
          <p className="text-destructive">Erro</p>
          <Button onClick={() => refetch()}>Recarregar Habilidades</Button>
        </>
      )}

      {isLoading && (
        <>
          <p>Carregando Habilidades</p>
          <LoadingSpin />
        </>
      )}

      {!isError && !isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillsUser?.map((skill) => (
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
            onClick={() => openModal("profileUser")}
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
