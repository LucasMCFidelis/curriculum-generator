import type { ReactNode } from "react";

interface ModalRootProps {
  children: ReactNode;
}

export function ModalRoot({ children }: ModalRootProps) {
  return (
    <div className="fixed inset-0 bg-secondary/70 flex items-center justify-center">
      <div className="bg-secondary w-80 sm:w-[450px] py-5 px-3 sm:px-8 space-y-4 border shadow shadow-accent-foreground rounded-md">
        {children}
      </div>
    </div>
  );
}
