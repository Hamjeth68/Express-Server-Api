export const getPort = () => getEnvVar<number>("PORT", "number");
export const getNodeEnv = () => getEnvVar<string>("NODE_ENV", "string");
export const getCorsOrigin = () => getEnvVar<string>("CORS_ORIGIN", "string");

/**
 * Retrieves the value of the specified environment variable and performs type checking before returning it.
 *
 * @param {string} key - The name of the environment variable to retrieve.
 * @param {"string" | "number"} type - The expected type of the environment variable value.
 * @return {T} The value of the environment variable, with the expected type.
 */
export function getEnvVar<T extends string | number>(
  key: string,
  type: "string" | "number",
): T {
  const value = process.env[key];
  if (value == null) {
    throw new Error(
      `Unknown process.env.${key}: ${value}. Is your .env file setup?`,
    );
  }

  if (type === "number") {
    const numValue = parseInt(value);
    if (Number.isNaN(numValue)) {
      throw new Error(`process.env.${key} must be a number. Got ${value}`);
    }
    return numValue as T;
  }

  return value as T;
}
