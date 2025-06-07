import type { ButtonHTMLAttributes, ElementType } from "react";
import ModalAction from "./ModalAction";

interface ModalConfirmProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  textContent?: string;
  icon?: ElementType;
  confirmAction: () => void;
  className?: string;
}

function ModalConfirm({
  textContent,
  icon: Icon,
  confirmAction,
  className,
  ...rest
}: ModalConfirmProps) {
  return (
    <ModalAction
      actionOnClick={confirmAction}
      textContent={textContent}
      variant={"default"}
      icon={Icon}
      className={className}
      {...rest}
    />
  );
}

export default ModalConfirm;
