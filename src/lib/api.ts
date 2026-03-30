/**
 * Centralized API client for NCC-ERP Backend.
 * All requests include the JWT from localStorage automatically.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ncc-token");
}

export function setToken(token: string) {
  localStorage.setItem("ncc-token", token);
}

export function clearToken() {
  localStorage.removeItem("ncc-token");
  localStorage.removeItem("ncc-refresh-token");
  localStorage.removeItem("ncc-user");
  localStorage.removeItem("ncc-role");
}

async function request<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Handle 401 → redirect to login
  if (res.status === 401 && typeof window !== "undefined") {
    clearToken();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = (json as { error?: string }).error || res.statusText;
    throw new Error(msg);
  }

  return json as T;
}

export const api = {
  get: <T = unknown>(path: string) => request<T>(path),

  post: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),

  put: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),

  delete: <T = unknown>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
