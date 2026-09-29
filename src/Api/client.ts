const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "The request could not be completed.");
  return data as T;
}

export const toId = <T extends { _id?: string; id?: string }>(item: T) => ({ ...item, id: item.id || item._id || "" });
