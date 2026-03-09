import { ApiError } from "./errors";
import { API_BASE_URL } from "./types";
import { getAccessToken, tryRefreshToken } from "./tokenManager";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
  timeoutMs?: number;
  retryOnAuthFailure?: boolean;
};

function toQueryString(query?: Record<string, string | number | boolean | undefined | null>) {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  const encoded = params.toString();
  return encoded ? `?${encoded}` : "";
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

export async function httpRequest<TResponse>(
  path: string,
  query?: Record<string, string | number | boolean | undefined | null>,
  options: RequestOptions = {}
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    auth = false,
    timeoutMs = 15000,
    retryOnAuthFailure = true,
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }
    if (auth) {
      const token = getAccessToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${path}${toQueryString(query)}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (response.status === 401 && auth && retryOnAuthFailure) {
      const refreshedToken = await tryRefreshToken();
      if (refreshedToken) {
        return httpRequest<TResponse>(path, query, {
          ...options,
          retryOnAuthFailure: false,
        });
      }
    }

    const parsed = await parseResponse(response);
    if (!response.ok) {
      console.log("[API] Request failed", {
        method,
        path,
        query,
        status: response.status,
        response: parsed,
      });
      const message =
        typeof parsed === "object" && parsed && "detail" in parsed
          ? String((parsed as { detail?: string }).detail ?? "Request failed")
          : `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status, undefined, parsed);
    }
    return parsed as TResponse;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      console.log("[API] Request timeout", { method, path, query, timeoutMs });
      throw new ApiError("Request timed out. Please check your connection.", 0);
    }
    console.log("[API] Network error", {
      method,
      path,
      query,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new ApiError("Network request failed. Please try again.", 0);
  } finally {
    clearTimeout(timeout);
  }
}
