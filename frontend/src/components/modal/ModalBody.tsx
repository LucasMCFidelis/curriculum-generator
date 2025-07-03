import type { ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode;
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div className="flex flex-col flex-1 gap-2 w-full">{children}</div>;
}
