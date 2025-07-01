import { isAxiosError } from "axios";

interface handleAxiosFormErrorProps {
  setError: (value: string) => void;
  error: Error;
  genericMessage?: string;
}

export function handleAxiosFormError({
  error,
  setError,
  genericMessage = "Erro ao realizar solicitação, tente novamente",
}: handleAxiosFormErrorProps) {
  if (isAxiosError(error)) {
    const fields = error.response?.data?.fields;
    const message = error.response?.data?.message;

    if (fields && Array.isArray(fields)) {
      const messages = fields.map((f) => f.message).join("\n");
      setError(messages);
    } else if (message) {
      setError(message);
    } else {
      setError(genericMessage);
    }
  } else {
    setError(genericMessage);
  }
}
