import {
  ArrowRightIcon,
  LogIn,
  LogOut,
  Plus,
  Search,
  Trash2,
  User,
  UserCircle2,
} from "lucide-react";
import ToggleTheme from "./ToggleTheme";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/contexts/ModalContext";

function Header() {
  const { currentUser, openLoginModal, logoutUser } = useAuth();
  const { openModal } = useModal();

  const sections = [
    {
      label: "Habilidades",
      icon: <Plus />,
      onCreate: () => console.log("Abrir modal: cadastrar habilidade"),
      onSearch: () => console.log("Abrir modal: buscar habilidade"),
    },
    {
      label: "Experiências",
      icon: <Plus />,
      onCreate: () => console.log("Abrir modal: cadastrar experiência"),
      onSearch: () => console.log("Abrir modal: buscar experiência"),
    },
    {
      label: "Projetos",
      icon: <Plus />,
      onCreate: () => console.log("Abrir modal: cadastrar projeto"),
      onSearch: () => console.log("Abrir modal: buscar projeto"),
    },
    {
      label: "Currículos",
      icon: <Plus />,
      onCreate: () => console.log("Abrir modal: cadastrar currículo"),
      onSearch: () => console.log("Abrir modal: buscar currículo"),
    },
  ];

  return (
    <header className="flex items-center justify-between">
      <h2 className="font-bold text-lg">CurriculumHub</h2>

      <Menubar className="border-none shadow-none">
        {currentUser ? (
          <>
            {sections.map((section) => (
              <MenubarMenu key={section.label}>
                <MenubarTrigger>{section.label}</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={section.onCreate}>
                    Cadastrar{" "}
                    <MenubarShortcut>
                      <Plus />
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={section.onSearch}>
                    Buscar{" "}
                    <MenubarShortcut>
                      <Search />
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            ))}
            <MenubarMenu>
              <MenubarTrigger>
                <User />
              </MenubarTrigger>
              <MenubarContent>
                <div className="flex justify-start items-center gap-2 p-2 ">
                  <UserCircle2 size={30} />
                  <h2 className="text-center font-bold">
                    {currentUser.userName}
                  </h2>
                </div>
                <MenubarItem onClick={() => openModal("profileUser")}>
                  Perfil{" "}
                  <MenubarShortcut>
                    <ArrowRightIcon />
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={() => openModal("ConfirmDeleteAccount")}>
                  Deletar conta{" "}
                  <MenubarShortcut>
                    <Trash2 />
                  </MenubarShortcut>
                </MenubarItem>
                <Button onClick={logoutUser} className="w-full mt-2">
                  Logout <LogOut className="text-destructive" />
                </Button>
              </MenubarContent>
            </MenubarMenu>
          </>
        ) : (
          <>
            <Button onClick={openLoginModal}>
              Login <LogIn />
            </Button>
          </>
        )}

        <ToggleTheme />
      </Menubar>
    </header>
  );
}

export default Header;
