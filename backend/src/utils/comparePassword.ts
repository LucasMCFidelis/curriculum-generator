import bcrypt from "bcrypt";
import { ErrorCustomer } from "../ErrorCustomer";

export async function comparePassword(
  passwordProvided: string,
  passwordHash: string
) {
  const isPasswordValid = await bcrypt.compare(passwordProvided, passwordHash);

  if (!isPasswordValid) {
    throw new ErrorCustomer(
      401,
      "Erro de autenticação",
      "Credenciais inválidas"
    );
  }
}
