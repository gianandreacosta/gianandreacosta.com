# Walk2Eat v4 — Refactor & Improvements

Based on walk2eat-v3. All fixes applied without modifying any previous version.

## Changes from v3

### Architecture
| Change | Detail |
|---|---|
| **Inline JS extracted** | `dashboard.js` (350 lines) and `map.js` (300 lines) replace ~500 lines of inline `<script>` in HTML files |
| **Critical CSS deduplicated** | Removed ~70 lines of duplicated inline styles from dashboard.html and map.html that were already in styles.css |
| **Consistent cache-busting** | All assets use `?v=4.0.0` across every page (was inconsistent mix of `?v=20260331a/c`) |

### Bug Fixes
| Fix | Detail |
|---|---|
| **Footer says "v2"** | Updated to "v4" in index.html |
| **Inconsistent bottom nav** | Unified to 4 tabs (Oggi, Preferiti, Cronologia, Impostazioni) on ALL pages. Removed the "Mappa"/"Vai!" tab that appeared on some pages but not others |
| **Auto-demo user bypass** | Dashboard no longer auto-creates a demo user. Redirects to login.html if not authenticated |
| **Auth guard on all pages** | Every page (dashboard, map, preferences, favorites, history, proposal, place) now checks for user login and redirects to login.html if missing |
| **Input sanitization** | Login form strips `<>"'&` characters, validates email format, enforces maxlength |

### UX Improvements
| Improvement | Detail |
|---|---|
| **Error toast system** | Visible toast notifications for route errors, GPS failures — replaces silent `console.warn` |
| **Card error state** | Dashboard shows error message in the card area (not just console) when route generation fails |
| **Login validation** | Real-time error messages for invalid input (name too short, bad email format) |
| **Enter key** | Name field → Enter focuses email; Email field → Enter submits |

### Theme System (v3 → v4)
| Change | Detail |
|---|---|
| **No more `location.reload()`** | Theme switching is now instant — CSS injection + icon swap without page reload |
| **Icon revert fixed** | Replaced fragile `originalBodyHTML` (saving entire body innerHTML) with surgical `data-original-text` attribute approach |
| **Themes on landing + login** | `themes.js` now loads on index.html and login.html — theme carries across all pages |

### PWA
| Addition | Detail |
|---|---|
| **manifest.json** | Full PWA manifest with icons (48–512px), Italian lang, standalone display |
| **Service Worker** | Cache-first for static assets, network-first for API calls (ORS, Overpass). Offline-capable for cached pages |
| **SW registration** | Added in app.js, graceful fallback |

### Strategy Doc Alignment
Landing page messaging updated to align with Business Strategy document (JTBD framework):
- "Zero decisioni" (Semplificare) — was "Pausa smart"
- "Rigenerazione reale" (Therapeutic Value) — was "Personalizzato"
- "Ogni giorno diverso" (Variety) — was "Subito pronto"
- Subtitle updated: "rigenerazione" instead of "alternative rapide"

### What was NOT changed (by design)
- **`app.js` core logic** — intact (except SW registration at the end)
- **`config.js`** — intact (API key)
- **`routes-poc-data.js`** — intact (POI data)
- **Two map libraries** — Leaflet (dashboard/favorites/history) + MapLibre (map.html) kept separate per request
- **`styles.css`** — intact
- **Theme CSS files** — intact
- **All branding assets** — intact

## File Map

| File | Status |
|---|---|
| `index.html` | 🔴 Rewritten (strategy-aligned messaging, themes, manifest) |
| `login.html` | 🔴 Rewritten (sanitization, validation, themes) |
| `dashboard.html` | 🔴 Rewritten (external JS, no inline critical CSS, consistent nav) |
| `map.html` | 🔴 Rewritten (external JS, consistent nav) |
| `preferences.html` | 🟡 Updated (consistent nav, auth guard, cache-busting) |
| `favorites.html` | 🟡 Updated (consistent nav, auth guard, cache-busting) |
| `history.html` | 🟡 Updated (consistent nav, auth guard, cache-busting) |
| `proposal.html` | 🟡 Updated (consistent nav, auth guard, cache-busting) |
| `place.html` | 🟡 Updated (consistent nav, auth guard, cache-busting) |
| `assets/js/dashboard.js` | 🆕 Extracted from dashboard.html inline JS |
| `assets/js/map.js` | 🆕 Extracted from map.html inline JS |
| `assets/js/themes.js` | 🔴 Rewritten (no reload, data-attribute icon revert) |
| `assets/js/app.js` | 🟡 SW registration added |
| `manifest.json` | 🆕 PWA manifest |
| `sw.js` | 🆕 Service Worker |
| `REFACTOR.md` | 🔴 This file |
