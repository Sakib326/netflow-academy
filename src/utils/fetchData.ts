const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/url`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    return (await res.json()) as T;
  } catch (err: any) {
    console.error("❌ fetchData error:", err.message);
    throw err;
  }
}
