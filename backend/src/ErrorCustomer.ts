export type ErrorResponse =
  | false
  | "Erro de validação"
  | "Erro no servidor"
  | "Erro Not Found"
  | "Erro de autorização"
  | "Erro de autenticação"
  | "Erro de Conflito";

export class ErrorCustomer extends Error {
  status: number;
  error: ErrorResponse;
  message: string;

  constructor(status: number, error: ErrorResponse, message?: string) {
    super(message ?? String(error));
    this.name = "ErrorCustomer";
    this.status = status;
    this.error = error;
    this.message = message ?? String(error);
  }
}
