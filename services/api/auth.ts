import { httpRequest } from "./http";
import { ApiAuthResponse, ApiTokenPair } from "./types";

export function requestOtp(mobile: string) {
  return httpRequest<{ message?: string }>("/auth/request-otp", undefined, {
    method: "POST",
    body: { mobile },
  });
}

export function verifyOtp(mobile: string, otp: string) {
  return httpRequest<ApiAuthResponse>("/auth/verify-otp", undefined, {
    method: "POST",
    body: { mobile, otp },
  });
}

export function refreshToken(refresh_token: string) {
  return httpRequest<ApiTokenPair>("/auth/refresh", undefined, {
    method: "POST",
    body: { refresh_token },
  });
}

export function logout() {
  return httpRequest<{ message?: string }>("/auth/logout", undefined, {
    method: "POST",
    auth: true,
  });
}
