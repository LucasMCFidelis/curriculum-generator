import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoginModal from "./LoginModal";
import ProfileUserModal from "./ProfileUserModal";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col gap-5 min-h-screen px-4 py-8">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <LoginModal/>
        <ProfileUserModal/>
        <ConfirmDeleteAccountModal/>
      </div>
    </>
  );
}

export default Layout;
