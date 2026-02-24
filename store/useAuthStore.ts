import { create } from "zustand";

type AuthUser = {
  name: string;
  email?: string;
  phone?: string;
};

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: { email: string; name?: string }) => void;
  register: (payload: { name: string; email: string }) => void;
  setOnboardingUser: (payload: { name: string; phone?: string }) => void;
  logout: () => void;
}

const createNameFromEmail = (email: string) => {
  const localPart = email.split("@")[0] ?? "";
  if (!localPart) return "Seeker";
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: ({ email, name }) =>
    set({
      user: {
        email,
        name: name?.trim() || createNameFromEmail(email),
      },
      isAuthenticated: true,
    }),
  register: ({ name, email }) =>
    set({
      user: {
        name: name.trim(),
        email,
      },
      isAuthenticated: true,
    }),
  setOnboardingUser: ({ name, phone }) =>
    set({
      user: {
        name: name.trim(),
        phone,
      },
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
