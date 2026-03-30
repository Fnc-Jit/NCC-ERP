"use client";

import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { AppRole } from "./dashboard";

type RoleContextValue = {
  role: AppRole;
  setRole: (role: AppRole) => void;
};

const RoleCtx = createContext<RoleContextValue>({ role: "cadet", setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<AppRole>("ano");

  useEffect(() => {
    const saved = localStorage.getItem("ncc-role") as AppRole | null;
    if (saved) setRoleState(saved);
  }, []);

  const setRole = useCallback((r: AppRole) => {
    setRoleState(r);
    localStorage.setItem("ncc-role", r);
  }, []);

  return <RoleCtx.Provider value={{ role, setRole }}>{children}</RoleCtx.Provider>;
}

export function useRole(): AppRole {
  return useContext(RoleCtx).role;
}

export function useSetRole() {
  return useContext(RoleCtx).setRole;
}

export function useIsOfficer(): boolean {
  const role = useRole();
  return role === "ano" || role === "captain" || role === "admin" || role === "suo";
}
