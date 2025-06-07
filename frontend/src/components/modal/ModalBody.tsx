import type { ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode
}

function ModalBody({
  children
}: ModalBodyProps) {
  return (
    <div className="mt-4 flex flex-col gap-2 w-full">
      {children}
    </div>
  );
}

export default ModalBody;
