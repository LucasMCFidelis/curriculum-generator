import type { ButtonHTMLAttributes, ElementType } from "react";
import ModalAction from "./ModalAction";

interface ModalCloseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  textContent?: string;
  icon?: ElementType;
  closeAction: () => void;
  className?: string;
}

function ModalClose({
  textContent,
  icon: Icon,
  closeAction,
  className,
  ...rest
}: ModalCloseProps) {
  return (
    <ModalAction
      actionOnClick={closeAction}
      textContent={textContent}
      variant={"destructive"}
      icon={Icon}
      className={className}
      {...rest}
    />
  );
}

export default ModalClose;
