const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

export async function apiFetch(path, { method = "GET", body, headers } = {}) {
  const key = localStorage.getItem("gf_key"); // palavra-chave
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(key ? { "x-api-key": key } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Erro ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}
