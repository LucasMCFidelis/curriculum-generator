import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";
import type { ButtonVariant } from "@/types/ButtonVariant";

interface ModalActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  actionOnClick: () => void;
  variant?: ButtonVariant;
}

export function ModalAction({
  children,
  actionOnClick,
  variant,
  ...rest
}: ModalActionProps) {
  return (
    <Button onClick={actionOnClick} variant={variant} {...rest}>
      {children}
    </Button>
  );
}
