import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ModalAction } from "./ModalAction";

interface ModalConfirmProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  confirmAction: () => void;
}

export function ModalConfirm({
  children,
  confirmAction,
  ...rest
}: ModalConfirmProps) {
  return (
    <ModalAction
      actionOnClick={confirmAction}
      variant={"default"}
      children={children}
      {...rest}
    />
  );
}
