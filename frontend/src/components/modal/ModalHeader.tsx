import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
  return (
    <header className={cn("flex justify-between items-center", className)}>
      {children}
    </header>
  );
}
