import {
  ArrowRightIcon,
  LogIn,
  LogOut,
  Menu,
  Plus,
  Search,
  Trash2,
  User,
  UserCircle2,
} from "lucide-react";
import { ToggleTheme } from "./ToggleTheme";
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
import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SectionList } from "../utils/SectionList";
import { handleNavigation } from "@/utils/handleNavigation";

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const { currentUser, openLoginModal, logoutUser } = useAuth();
  const { openModal } = useModal();
  const sections = SectionList();

  const menuItems = useMemo(() => {
    return sections.map((section) => (
      <MenubarMenu key={section.label}>
        <MenubarTrigger>{section.label}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={section.onCreate}>
            Cadastrar{" "}
            <MenubarShortcut>
              <Plus />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            onClick={() => {
              setIsSheetOpen(false);
              setTimeout(() => {
                handleNavigation(section.sectionId);
              }, 300);
            }}
          >
            Buscar{" "}
            <MenubarShortcut>
              <Search />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    ));
  }, [sections]);

  const menuProfileUser = useMemo(() => {
    return (
      <>
        <MenubarMenu>
          <MenubarTrigger>
            <User />
          </MenubarTrigger>
          <MenubarContent>
            <div className="flex justify-start items-center gap-2 p-2 ">
              <UserCircle2 size={30} />
              <h3>{currentUser?.userName}</h3>
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
    );
  }, [currentUser, logoutUser, openModal]);

  return (
    <header className="flex items-center justify-between">
      <h2>CurriculumHub</h2>

      <Menubar className="border-none shadow-none">
        <nav className="hidden sm:flex justify-center items-center gap-3">
          {currentUser ? (
            <>
              {menuItems}
              {menuProfileUser}
            </>
          ) : (
            <Button onClick={openLoginModal}>
              Login <LogIn />
            </Button>
          )}
          <ToggleTheme />
        </nav>

        <nav className="flex sm:hidden gap-3">
          {currentUser ? (
            <>
              {menuProfileUser}
              <ToggleTheme />
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent className="w-1/2">
                  <div className="w-4/5 flex flex-col gap-3 p-3">
                    {menuItems}
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Button onClick={openLoginModal}>
                Login <LogIn />
              </Button>
              <ToggleTheme />
            </>
          )}
        </nav>
      </Menubar>
    </header>
  );
}
