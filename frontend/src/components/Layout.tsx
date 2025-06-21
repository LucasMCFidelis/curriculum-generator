import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoginModal from "./LoginModal";
import ProfileUserModal from "./ProfileUserModal";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal";
import CadastreUserModal from "./CadastreUserModal";

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
      </div>
    </>
  );
}

export default Layout;
