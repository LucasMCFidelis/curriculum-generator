import type { InterfaceFeedbackProps } from "@/types/InterfaceFeedbackProps";

export function FeedbackError({ message = "Erro ao carregar dados" }: InterfaceFeedbackProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <p className="text-destructive">{message}</p>
    </div>
  );
}
