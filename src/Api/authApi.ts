import { request } from "./client";

export const loginRequest = (email: string, password: string) =>
  request<{ token: string; user: any; message: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
