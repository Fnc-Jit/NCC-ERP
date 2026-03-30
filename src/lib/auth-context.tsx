"use client";

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { AppRole } from "./dashboard";
import { api, setToken, clearToken } from "./api";

// ── Types ──────────────────────────────────────────────────────────
export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  company: string | null;
  wing: string | null;
  chest_number: string | null;
  is_active: boolean;
};

type AuthContextValue = {
  user: UserProfile | null;
  role: AppRole;
  loading: boolean;
  setRole: (role: AppRole) => void;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthCtx = createContext<AuthContextValue>({
  user: null,
  role: "cadet",
  loading: true,
  setRole: () => {},
  loginWithCredentials: async () => {},
  logout: async () => {},
});

// Map backend roles to frontend AppRole type
function mapRole(backendRole: string): AppRole {
  const map: Record<string, AppRole> = {
    admin: "admin",
    ano: "ano",
    suo: "suo",
    cadet: "cadet",
    captain: "captain",
  };
  return map[backendRole] || "cadet";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRoleState] = useState<AppRole>("cadet");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // On mount, attempt to verify the stored session via GET /api/auth/me
  useEffect(() => {
    const token = localStorage.getItem("ncc-token");
    if (!token) {
      setLoading(false);
      // If on a protected route, redirect to login
      if (pathname.startsWith("/dashboard")) {
        router.replace("/login");
      }
      return;
    }

    api
      .get<{ user: UserProfile }>("/api/auth/me")
      .then(({ user: profile }) => {
        setUser(profile);
        const mappedRole = mapRole(profile.role);
        setRoleState(mappedRole);
        localStorage.setItem("ncc-role", mappedRole);
        localStorage.setItem("ncc-user", JSON.stringify(profile));
      })
      .catch(() => {
        clearToken();
        if (pathname.startsWith("/dashboard")) {
          router.replace("/login");
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRole = useCallback((r: AppRole) => {
    setRoleState(r);
    localStorage.setItem("ncc-role", r);
  }, []);

  const loginWithCredentials = useCallback(
    async (email: string, password: string) => {
      const data = await api.post<{
        session: { access_token: string; refresh_token: string };
        user: UserProfile;
      }>("/api/auth/login", { email, password });

      setToken(data.session.access_token);
      localStorage.setItem("ncc-refresh-token", data.session.refresh_token);
      localStorage.setItem("ncc-user", JSON.stringify(data.user));

      setUser(data.user);
      const mappedRole = mapRole(data.user.role);
      setRoleState(mappedRole);
      localStorage.setItem("ncc-role", mappedRole);
      router.push("/dashboard");
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // ignore
    }
    clearToken();
    setUser(null);
    setRoleState("cadet");
    router.push("/login");
  }, [router]);

  return (
    <AuthCtx.Provider
      value={{ user, role, loading, setRole, loginWithCredentials, logout }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

// ── Hooks ──────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthCtx);
}

export function useRole(): AppRole {
  return useContext(AuthCtx).role;
}

export function useSetRole() {
  return useContext(AuthCtx).setRole;
}

export function useIsOfficer(): boolean {
  const { role } = useContext(AuthCtx);
  return role === "ano" || role === "captain" || role === "admin" || role === "suo";
}

export function useUser() {
  return useContext(AuthCtx).user;
}
