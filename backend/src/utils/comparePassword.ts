import bcrypt from "bcrypt";

export async function comparePassword(
  passwordProvided: string,
  passwordHash: string
) {
  const isPasswordValid = await bcrypt.compare(passwordProvided, passwordHash);

  if (!isPasswordValid) {
    throw {
      status: 401,
      error: "Erro de autenticação",
      message: "Credenciais inválidas",
    };
  }
}
