/* Admin API wrapper. Gestisce bearer token in localStorage + redirect su 401. */

const API_BASE = "https://api.lab.gianandreacosta.com/api";
const TOKEN_KEY = "admin_token";

const Auth = {
  get: () => localStorage.getItem(TOKEN_KEY) || "",
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
  has: () => !!localStorage.getItem(TOKEN_KEY),
};

async function apiFetch(path, { method = "GET", body = null } = {}) {
  const token = Auth.get();
  if (!token) throw new Error("no_token");
  const opts = {
    method,
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  if (body !== null) opts.body = JSON.stringify(body);
  const r = await fetch(API_BASE + path, opts);
  if (r.status === 401) {
    Auth.clear();
    throw new Error("unauthorized");
  }
  if (!r.ok) {
    let detail = "";
    try { detail = JSON.stringify(await r.json()); } catch {}
    throw new Error("HTTP " + r.status + (detail ? ": " + detail : ""));
  }
  return r.json();
}

const Api = {
  // Health / status
  health: () => fetch(API_BASE + "/health").then(r => r.json()),
  verify: () => apiFetch("/auth/verify"),

  // Configs cross-cutting
  listConfigs: () => apiFetch("/configs"),
  getConfigDiff: (name) => apiFetch(`/configs/${name}/diff`),

  // Sources
  listSources: () => apiFetch("/sources"),
  listCategories: () => apiFetch("/sources/categories"),
  getSource: (cat, slug) => apiFetch(`/sources/${cat}/${slug}`),
  createSource: (cat, body) => apiFetch(`/sources/${cat}`, { method: "POST", body }),
  updateSource: (cat, slug, body) => apiFetch(`/sources/${cat}/${slug}`, { method: "PATCH", body }),
  toggleSource: (cat, slug) => apiFetch(`/sources/${cat}/${slug}/toggle`, { method: "POST" }),
  testFeed: (body) => apiFetch("/sources/test", { method: "POST", body }),
};
