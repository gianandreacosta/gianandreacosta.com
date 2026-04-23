/* Componenti UI condivisi: Toast, Modal, login gate, API status. */

const Toast = {
  container() {
    let c = document.querySelector(".toasts");
    if (!c) {
      c = document.createElement("div");
      c.className = "toasts";
      document.body.appendChild(c);
    }
    return c;
  },
  show(msg, type = "info", durationMs = 3500) {
    const el = document.createElement("div");
    el.className = "toast " + type;
    el.textContent = msg;
    this.container().appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 200);
    }, durationMs);
  },
  success(m) { this.show(m, "success"); },
  error(m) { this.show(m, "error", 5500); },
  info(m) { this.show(m, "info"); },
};

const Modal = {
  open(id) {
    document.getElementById(id)?.classList.add("open");
  },
  close(id) {
    document.getElementById(id)?.classList.remove("open");
  },
  closeAll() {
    document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
  },
};

// ESC chiude modal
document.addEventListener("keydown", e => { if (e.key === "Escape") Modal.closeAll(); });

// Login gate: se nessun token in localStorage, chiede e valida.
async function ensureAuth() {
  let token = Auth.get();
  if (!token) {
    token = window.prompt("🔐 Inserisci il token admin:");
    if (!token) {
      document.body.innerHTML = '<div class="container"><div class="card"><p>Login richiesto. Ricarica la pagina per riprovare.</p></div></div>';
      throw new Error("login_cancelled");
    }
    Auth.set(token);
  }
  try {
    await Api.verify();
  } catch (e) {
    Auth.clear();
    if (e.message === "unauthorized") {
      alert("Token non valido. Riprovo login.");
      return ensureAuth();
    }
    throw e;
  }
}

// API status badge (pallino verde/rosso in alto a destra)
async function renderApiStatus(selector = "#api-status") {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const h = await Api.health();
    el.className = "api-status ok";
    el.innerHTML = `<span class="dot"></span>API v${h.version} · ${Math.round(h.uptime_s)}s`;
  } catch (e) {
    el.className = "api-status error";
    el.innerHTML = `<span class="dot"></span>API down`;
  }
}

function escHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fmtBytes(n) {
  if (!n) return "0 B";
  if (n < 1024) return n + " B";
  if (n < 1024*1024) return (n/1024).toFixed(1) + " KB";
  return (n/(1024*1024)).toFixed(2) + " MB";
}

function fmtDate(ts) {
  if (!ts) return "—";
  try {
    const d = new Date(ts * 1000);
    return d.toLocaleString("it-CH", { timeZone: "Europe/Zurich", dateStyle: "medium", timeStyle: "short" });
  } catch { return String(ts); }
}
