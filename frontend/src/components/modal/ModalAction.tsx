import type { ButtonHTMLAttributes, ElementType } from "react";
import { Button } from "../ui/button";
import type { ButtonVariant } from "@/types/ButtonVariant";

interface ModalActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textContent?: string;
  icon?: ElementType;
  actionOnClick: () => void;
  variant?: ButtonVariant;
  className?: string;
}

function ModalAction({
  textContent,
  icon: Icon,
  actionOnClick,
  variant,
  className,
  ...rest
}: ModalActionProps) {
  return (
    <Button
      onClick={actionOnClick}
      variant={variant}
      className={className}
      {...rest}
    >
      {textContent} {Icon && <Icon />}
    </Button>
  );
}

export default ModalAction;
