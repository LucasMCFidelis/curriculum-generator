import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ModalAction } from "./ModalAction";
import { X } from "lucide-react";

interface ModalCloseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children?: ReactNode;
  closeAction: () => void;
}

export function ModalClose({
  children,
  closeAction,
  ...rest
}: ModalCloseProps) {
  return (
    <ModalAction
      actionOnClick={closeAction}
      variant={"destructive"}
      children={children ? children : <X />}
      {...rest}
    />
  );
}
