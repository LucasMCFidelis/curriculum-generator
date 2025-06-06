import type { ReactNode } from "react";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col gap-5 min-h-screen px-4 py-8">
        <header>Header</header>
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
