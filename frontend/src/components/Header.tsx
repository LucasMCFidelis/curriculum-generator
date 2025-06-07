import {
  ArrowRightIcon,
  LogIn,
  LogOut,
  Plus,
  Search,
  Trash2,
  User,
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
import { useEffect, useState } from "react";

function Header() {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser") || null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    }
  }, [currentUser]);

  function loginUser() {
    setCurrentUser("teste");
  }
  function logoutUser() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

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
        
        {currentUser ? (
          <MenubarMenu>
            <>
              <MenubarTrigger>
                <User />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Perfil{" "}
                  <MenubarShortcut>
                    <ArrowRightIcon />
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Deletar conta{" "}
                  <MenubarShortcut>
                    <Trash2 />
                  </MenubarShortcut>
                </MenubarItem>
                <Button onClick={logoutUser} className="w-full mt-2">
                  Logout <LogOut className="text-destructive" />
                </Button>
              </MenubarContent>
            </>
          </MenubarMenu>
        ) : (
          <>
            <Button onClick={loginUser}>
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
