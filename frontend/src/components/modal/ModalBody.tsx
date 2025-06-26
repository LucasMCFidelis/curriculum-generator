import type { ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode
}

function ModalBody({
  children
}: ModalBodyProps) {
  return (
    <div className="flex flex-col flex-1 gap-2 w-full">
      {children}
    </div>
  );
}

export default ModalBody;
