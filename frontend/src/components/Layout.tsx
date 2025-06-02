import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col gap-5 min-h-screen px-4 py-8">
        <header>Header</header>
        <div className="flex-1">{children}</div>
        <footer>Footer</footer>
      </div>
    </>
  );
}

export default Layout;
