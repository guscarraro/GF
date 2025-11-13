// src/utils/api.js

// pode jogar pra env se quiser: REACT_APP_API_URL
export const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://gf-back-production-ef55.up.railway.app";

// monta header x-api-key pegando do localStorage
function getAuthHeaders() {
  const key = localStorage.getItem("gf_key");
  if (!key) {
    return {};
  }
  return { "x-api-key": key };
}

// função base
export async function apiFetch(path, options = {}) {
  const { method = "GET", body, headers } = options;

  // normaliza pra não ficar com // no meio
  const base = (API_BASE || "").replace(/\/+$/, "");      // tira barras do fim
  const cleanPath = (path || "").replace(/^\/+/, "");     // tira barras do começo
  const url = `${base}/${cleanPath}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),   // x-api-key padrão (gf_key)
      ...(headers || {}),    // aqui sobrescreve se vier outro x-api-key (login)
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Erro HTTP ${res.status}`);
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

/* ===================== AUTH ===================== */

export const AuthAPI = {
  // login com palavra-chave (não depende de gf_key salvo ainda)
  async login(rawKey) {
    const key = rawKey.trim();
    if (!key) {
      throw new Error("Chave vazia");
    }

    const data = await apiFetch("/auth/login", {
      method: "POST",
      headers: { "x-api-key": key }, // sobrescreve o gf_key se existir
    });

    // se deu bom, já guarda no localStorage
    localStorage.setItem("gf_key", key);
    return data; // { auth: "ok" }
  },
};

/* ===================== GASTOS / LANÇAMENTOS ===================== */

export const GastosAPI = {
  // lista por mês (competencia = YYYY-MM)
  listByMes(mes) {
    // ex: /gastos?mes=2025-11
    const query = mes ? `?mes=${encodeURIComponent(mes)}` : "";
    return apiFetch(`/gastos${query}`);
  },

  // obter 1 lançamento por id
  get(id) {
    return apiFetch(`/gastos/${id}`);
  },

  // criar lançamento
  create(lancamento) {
    return apiFetch("/gastos", {
      method: "POST",
      body: lancamento,
    });
  },

  // atualizar
  update(id, lancamento) {
    return apiFetch(`/gastos/${id}`, {
      method: "PUT",
      body: lancamento,
    });
  },

  // deletar
  remove(id) {
    return apiFetch(`/gastos/${id}`, {
      method: "DELETE",
    });
  },
};

/* ===================== METAS (TARGETS) ===================== */

export const MetasAPI = {
  // listar metas (pode filtrar por ativo=true/false)
  list(ativo) {
    if (ativo === undefined || ativo === null) {
      return apiFetch("/metas");
    }
    return apiFetch(`/metas?ativo=${ativo ? "true" : "false"}`);
  },

  // criar meta
  create(meta) {
    return apiFetch("/metas", {
      method: "POST",
      body: meta,
    });
  },

  // atualizar meta
  update(id, meta) {
    return apiFetch(`/metas/${id}`, {
      method: "PUT",
      body: meta,
    });
  },

  // deletar meta
  remove(id) {
    return apiFetch(`/metas/${id}`, {
      method: "DELETE",
    });
  },

  // planejamento por mês (YYYY-MM)
  planejamento(mes) {
    return apiFetch(`/metas/planejamento?mes=${encodeURIComponent(mes)}`);
  },
};
