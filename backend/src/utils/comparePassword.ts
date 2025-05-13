import bcrypt from "bcrypt";

export async function comparePassword(
  passwordProvided: string,
  passwordHash: string
) {
  return await bcrypt.compare(passwordProvided, passwordHash);
}
