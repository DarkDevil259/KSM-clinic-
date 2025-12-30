type ApiOk<T> = { ok: true } & T;
type ApiErr = { ok: false; error: string; details?: unknown };

// In production (Vercel), API functions are at /api/*
// In development, use VITE_API_BASE if set, otherwise use relative paths
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) || "";

export async function apiPost<TResponse>(
  path: string,
  body: unknown
): Promise<ApiOk<TResponse>> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => null)) as
    | ApiOk<TResponse>
    | ApiErr
    | null;

  if (!res.ok || !data || (data as ApiErr).ok === false) {
    const msg =
      (data as ApiErr | null)?.error || "Something went wrong. Please try again.";
    throw new Error(msg);
  }

  return data as ApiOk<TResponse>;
}

export async function apiGet<TResponse>(
  path: string
): Promise<ApiOk<TResponse>> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // Prevent caching to always get fresh data
  });

  const data = (await res.json().catch(() => null)) as
    | ApiOk<TResponse>
    | ApiErr
    | null;

  if (!res.ok || !data || (data as ApiErr).ok === false) {
    const msg =
      (data as ApiErr | null)?.error || "Something went wrong. Please try again.";
    throw new Error(msg);
  }

  return data as ApiOk<TResponse>;
}




