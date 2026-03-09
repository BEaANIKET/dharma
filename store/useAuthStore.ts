import { create } from "zustand";
import { ApiUser, authApi, friendlyMessage, usersApi } from "@/services/api";
import { clearSessionFromDisk, loadSessionFromDisk, saveSessionToDisk } from "@/services/api/storage";
import { setAccessToken, setRefreshHandler } from "@/services/api/tokenManager";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type PersistedSession = {
  user: ApiUser | null;
  tokens: AuthTokens | null;
};

interface AuthState {
  user: ApiUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  isLoading: boolean;
  error: string | null;
  otpRequestedMobile: string | null;
  bootstrap: () => Promise<void>;
  requestOtp: (mobile: string) => Promise<void>;
  verifyOtp: (mobile: string, otp: string) => Promise<{ isNewUser: boolean }>;
  fetchCurrentUser: () => Promise<ApiUser>;
  updateProfile: (payload: { name?: string | null; email?: string | null; city?: string | null; dob?: string | null }) => Promise<ApiUser>;
  setOnboardingUser: (payload: { name: string; phone?: string }) => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

async function persistSession(user: ApiUser | null, tokens: AuthTokens | null) {
  if (!tokens) {
    await clearSessionFromDisk();
    return;
  }
  await saveSessionToDisk<PersistedSession>({ user, tokens });
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isBootstrapping: true,
  isLoading: false,
  error: null,
  otpRequestedMobile: null,

  bootstrap: async () => {
    set({ isBootstrapping: true });
    try {
      const saved = await loadSessionFromDisk<PersistedSession>();
      if (!saved?.tokens) {
        set({ isAuthenticated: false, user: null, tokens: null, error: null });
        return;
      }

      setAccessToken(saved.tokens.accessToken);
      set({ tokens: saved.tokens, user: saved.user, isAuthenticated: true, error: null });

      setRefreshHandler(async () => {
        const tokens = get().tokens;
        if (!tokens?.refreshToken) return null;
        try {
          const next = await authApi.refreshToken(tokens.refreshToken);
          const updatedTokens = {
            accessToken: next.access_token,
            refreshToken: next.refresh_token,
          };
          setAccessToken(updatedTokens.accessToken);
          set({ tokens: updatedTokens, isAuthenticated: true });
          await persistSession(get().user, updatedTokens);
          return updatedTokens.accessToken;
        } catch {
          setAccessToken(null);
          set({ tokens: null, user: null, isAuthenticated: false });
          await clearSessionFromDisk();
          return null;
        }
      });

      await get().fetchCurrentUser();
    } catch (error) {
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        error: friendlyMessage(error),
      });
      setAccessToken(null);
      await clearSessionFromDisk();
    } finally {
      set({ isBootstrapping: false });
    }
  },

  requestOtp: async (mobile: string) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.requestOtp(mobile.trim());
      set({ otpRequestedMobile: mobile.trim() });
    } catch (error) {
      set({ error: friendlyMessage(error) });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  verifyOtp: async (mobile: string, otp: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.verifyOtp(mobile.trim(), otp.trim());
      const tokens: AuthTokens = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      };
      setAccessToken(tokens.accessToken);
      setRefreshHandler(async () => {
        const current = get().tokens;
        if (!current?.refreshToken) return null;
        try {
          const next = await authApi.refreshToken(current.refreshToken);
          const updatedTokens = {
            accessToken: next.access_token,
            refreshToken: next.refresh_token,
          };
          setAccessToken(updatedTokens.accessToken);
          set({ tokens: updatedTokens, isAuthenticated: true });
          await persistSession(get().user, updatedTokens);
          return updatedTokens.accessToken;
        } catch {
          setAccessToken(null);
          set({ tokens: null, user: null, isAuthenticated: false });
          await clearSessionFromDisk();
          return null;
        }
      });

      set({
        tokens,
        isAuthenticated: true,
        otpRequestedMobile: mobile.trim(),
      });

      const user = await get().fetchCurrentUser();
      await persistSession(user, tokens);
      return { isNewUser: response.is_new_user };
    } catch (error) {
      set({ error: friendlyMessage(error), isAuthenticated: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCurrentUser: async () => {
    const user = await usersApi.getCurrentUser();
    set({ user, isAuthenticated: true });
    await persistSession(user, get().tokens);
    return user;
  },

  updateProfile: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const user = await usersApi.updateCurrentUser(payload);
      set({ user });
      await persistSession(user, get().tokens);
      return user;
    } catch (error) {
      set({ error: friendlyMessage(error) });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setOnboardingUser: ({ name, phone }) => {
    const prev = get().user;
    if (!prev) return;
    const nextUser: ApiUser = {
      ...prev,
      name: name.trim(),
      mobile: phone?.trim() || prev.mobile,
    };
    set({ user: nextUser, isAuthenticated: true });
    void persistSession(nextUser, get().tokens);
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      if (get().isAuthenticated) {
        await authApi.logout();
      }
    } catch {
      // Swallow logout API error but still clear local session.
    } finally {
      setAccessToken(null);
      setRefreshHandler(null);
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        otpRequestedMobile: null,
      });
      await clearSessionFromDisk();
    }
  },

  clearError: () => set({ error: null }),
}));
