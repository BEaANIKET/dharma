export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  if (error instanceof Error) {
    return new ApiError(error.message, 0);
  }
  return new ApiError("Something went wrong. Please try again.", 0);
}

export function friendlyMessage(error: unknown): string {
  const normalized = normalizeError(error);
  if (normalized.status === 401) return "Session expired. Please sign in again.";
  if (normalized.status === 404) return "Requested data not found.";
  if (normalized.status >= 500) return "Server issue. Please try again in a moment.";
  return normalized.message || "Request failed. Please try again.";
}
