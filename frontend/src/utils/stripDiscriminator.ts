export function stripDiscriminator<
  T extends { [key in D]: string },
  D extends keyof T
>(data: T, discriminatorKey: D): Omit<T, D> {
  const { [discriminatorKey]: _, ...rest } = data;
  return rest;
}
