import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginModal } from "./users/LoginModal";
import { ProfileUserModal } from "./users/ProfileUserModal";
import { ConfirmDeleteAccountModal } from "./users/ConfirmDeleteAccountModal";
import { CadastreUserModal } from "./users/CadastreUserModal";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
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
