import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoginModal from "./LoginModal";
import ProfileUserModal from "./ProfileUserModal";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal";
import CadastreUserModal from "./CadastreUserModal";
import CreateSkillModal from "./CreateSkillModal";
import ConfirmDeleteSkillModal from "./ConfirmDeleteSkill";
import UpdateSkillModal from "./UpdateSkillModal";
import CreateWorkExperienceModal from "./CreateWorkExperienceModal";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col gap-5 min-h-screen px-4 py-8">
        <Header />
        {children}
        <Footer />
        <LoginModal />
        <CadastreUserModal />
        <ProfileUserModal />
        <ConfirmDeleteAccountModal />
        <CreateSkillModal/>
        <UpdateSkillModal />
        <ConfirmDeleteSkillModal/>
        <CreateWorkExperienceModal/>
      </div>
    </>
  );
}

export default Layout;
