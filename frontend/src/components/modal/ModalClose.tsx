import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ModalAction } from "./ModalAction";
import { X } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

interface ModalCloseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children?: ReactNode;
  closeAction?: () => void;
}

export function ModalClose({
  children,
  closeAction,
  ...rest
}: ModalCloseProps) {
  const { closeModal } = useModal();
  return (
    <ModalAction
      actionOnClick={closeAction ?? closeModal}
      variant={"destructive"}
      children={children ? children : <X />}
      {...rest}
    />
  );
}
