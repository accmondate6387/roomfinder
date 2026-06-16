import { create } from "zustand";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  isOwnerVerified?: boolean;
}

interface AuthState {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  setUser: (user: User | null) => void;
  setStatus: (status: "loading" | "authenticated" | "unauthenticated") => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",
  setUser: (user) => set({ user, status: user ? "authenticated" : "unauthenticated" }),
  setStatus: (status) => set({ status }),
}));
