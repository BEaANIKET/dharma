import { httpRequest } from "./http";
import { ApiUser, UserUpdateInput } from "./types";

export function getCurrentUser() {
  return httpRequest<ApiUser>("/users/me", undefined, { auth: true });
}

export function updateCurrentUser(input: UserUpdateInput) {
  return httpRequest<ApiUser>("/users/me", undefined, {
    method: "PUT",
    auth: true,
    body: input,
  });
}
