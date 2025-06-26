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
import { PenBox, Plus, RefreshCwIcon, Trash2 } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useSkills } from "@/contexts/SkillContext";
import LoadingSpin from "./LoadingSpin";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import SearchInput from "./SearchInput";
import { Label } from "./ui/label";
import { useMemo, useState } from "react";

function SkillsSection() {
  const {
    skillsUser,
    isLoadingSkills,
    isErrorSkills,
    refetchSkills,
    setCurrentSkill,
    skillsTypes,
  } = useSkills();
  const { openModal } = useModal();

  const [searchValue, setSearchValue] = useState<string>("");
  const [skillTypeSelected, setSkillTypeSelected] = useState<string>("");

  function changeSkillTypeSelected(value: string) {
    setSkillTypeSelected(skillsTypes.includes(value) ? value : "all");
  }

  function clearFilters() {
    changeSkillTypeSelected("");
    setSearchValue("");
  }

  const filteredSkills = useMemo(() => {
    if (!skillsUser) return [];
    return skillsUser.filter((skill) => {
      const matchesSearch =
        skill.skillTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
        skill.skillType.toLowerCase().includes(searchValue.toLowerCase()) ||
        skill.skillDescription
          ?.toLowerCase()
          .includes(searchValue.toLowerCase());

      const matchesType =
        !skillTypeSelected ||
        skillTypeSelected === "all" ||
        skill.skillType === skillTypeSelected;

      return matchesSearch && matchesType;
    });
  }, [skillsUser, searchValue, skillTypeSelected]);

  return (
    <section id="skillSection" className="space-y-4">
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
        <>
          <div className="grid gap-2 grid-cols-[1fr_35%] lg:grid-cols-4 md:gap-4">
            <SearchInput
              value={searchValue}
              setValue={setSearchValue}
              onSearch={(value) => console.log(value)}
              className="col-span-2"
            />
            <div className="space-y-2">
              <Label className="capitalize">Tipo</Label>
              <Select
                value={skillTypeSelected}
                onValueChange={changeSkillTypeSelected}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {skillsTypes.map((skill, index) => (
                    <SelectItem key={index} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="self-end">
              <Button className="w-full" onClick={clearFilters}>
                Limpar Filtros <RefreshCwIcon />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill) => (
              <Card key={skill.skillId}>
                <CardHeader className="grid grid-rows-1 items-center">
                  <CardTitle className="grid items-center justify-between w-3/4 grid-cols-[100px_10px_100px]">
                    <h3>{skill.skillTitle}</h3>
                    <h3>-</h3>
                    <h3 className="justify-self-center">{skill.skillType}</h3>
                  </CardTitle>
                  <CardAction>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setCurrentSkill(skill);
                        openModal("updateSkill");
                      }}
                    >
                      <PenBox />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setCurrentSkill(skill);
                        openModal("confirmDeleteSkill");
                      }}
                    >
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
        </>
      )}
    </section>
  );
}

export default SkillsSection;
