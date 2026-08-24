export const AUTH_COOKIE = "traxtor_session";
export const AUTH_USERNAME = process.env.TRAXTOR_AUTH_USERNAME || "admin";
export const AUTH_PASSWORD = process.env.TRAXTOR_AUTH_PASSWORD || "";

export function isValidCredentials(username: string, password: string) {
  return username === AUTH_USERNAME && password === AUTH_PASSWORD;
}
