import type { InterfaceFeedbackProps } from "@/types/InterfaceFeedbackProps";
import LoadingSpin from "../LoadingSpin";

export function FeedbackLoading({
  message = "Carregando",
}: InterfaceFeedbackProps) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <p>{message}...</p>
      <LoadingSpin />
    </div>
  );
}
