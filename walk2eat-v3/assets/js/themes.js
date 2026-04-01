/* Walk2Eat — Theme & Icon Manager v2 — Inline injection for guaranteed override */

(function() {
  var THEMES = {
    classic: {
      label: 'Classico', color: '#22c55e', icons: 'emoji',
      desc: 'Verde scuro + emoji classiche',
      vars: {} // uses default styles.css
    },
    teal: {
      label: 'Verde Acqua', color: '#14b8a6', icons: 'minimal',
      desc: 'Teal + icone minimali',
      vars: {
        '--bg':'#0a2725','--bg-soft':'#0d302e','--card':'#0f3835','--card-border':'#176059',
        '--text':'#ccfbf1','--text-secondary':'#5eead4',
        '--accent':'#14b8a6','--accent-hover':'#0d9488','--accent-soft':'rgba(20,184,166,0.15)',
        '--accent-2':'#67e8f9','--warning':'#fcd34d'
      }
    },
    ocean: {
      label: 'Oceano', color: '#2dd4bf', icons: 'minimal',
      desc: 'Immersione verde acqua profondo',
      vars: {
        '--bg':'#042f2e','--bg-soft':'#064e3b','--card':'#0a3d3a','--card-border':'#115e59',
        '--text':'#ccfbf1','--text-secondary':'#5eead4',
        '--accent':'#2dd4bf','--accent-hover':'#14b8a6','--accent-soft':'rgba(45,212,191,0.15)',
        '--accent-2':'#67e8f9','--warning':'#fcd34d'
      }
    },
    sand: {
      label: 'Sabbia', color: '#d97706', icons: 'geo',
      desc: 'Toni caldi deserto',
      vars: {
        '--bg':'#1c1917','--bg-soft':'#292524','--card':'#2c2520','--card-border':'#44403c',
        '--text':'#fef3c7','--text-secondary':'#d6d3d1',
        '--accent':'#d97706','--accent-hover':'#b45309','--accent-soft':'rgba(217,119,6,0.15)',
        '--accent-2':'#fbbf24','--warning':'#f59e0b'
      }
    },
    cozy: {
      label: 'Cozy', color: '#c084fc', icons: 'soft',
      desc: 'Viola morbido, accogliente',
      vars: {
        '--bg':'#1a1523','--bg-soft':'#221a2e','--card':'#2a1f38','--card-border':'#3d2e52',
        '--text':'#f5f0ff','--text-secondary':'#c4b5d4',
        '--accent':'#c084fc','--accent-hover':'#a855f7','--accent-soft':'rgba(192,132,252,0.12)',
        '--accent-2':'#f0abfc','--warning':'#fcd34d'
      }
    },
    pastel: {
      label: 'Pastello', color: '#e88d9d', icons: 'outline',
      desc: 'Chiaro, arioso, leggero',
      vars: {
        '--bg':'#faf7f5','--bg-soft':'#f5f0eb','--card':'#ffffff','--card-border':'#e8e0d8',
        '--text':'#3d3833','--text-secondary':'#8a8279',
        '--accent':'#e88d9d','--accent-hover':'#d46b7e','--accent-soft':'rgba(232,141,157,0.12)',
        '--accent-2':'#93c5fd','--warning':'#f59e0b'
      },
      extra: 'body{color:#3d3833!important}.top-header{background:rgba(250,247,245,0.95)!important;border-bottom-color:#e8e0d8!important}.bottom-nav{background:rgba(255,255,255,0.97)!important;border-top:1px solid #e8e0d8!important}.card{box-shadow:0 2px 12px rgba(0,0,0,0.06)!important}.btn-ghost{color:#3d3833!important;border-color:#e8e0d8!important}.btn-secondary{color:#3d3833!important;background:#f5f0eb!important}select,.input{background:#f5f0eb!important;color:#3d3833!important;border-color:#e8e0d8!important}.nav-item .nav-icon,.nav-item span{color:#8a8279!important}.nav-item.active .nav-icon,.nav-item.active span{color:#e88d9d!important}'
    },
    nordic: {
      label: 'Nordic', color: '#38bdf8', icons: 'minimal',
      desc: 'Blu scandinavo elegante',
      vars: {
        '--bg':'#0f172a','--bg-soft':'#1e3a5f','--card':'#1e3348','--card-border':'#2d4a68',
        '--text':'#e0f2fe','--text-secondary':'#7dd3fc',
        '--accent':'#38bdf8','--accent-hover':'#0ea5e9','--accent-soft':'rgba(56,189,248,0.12)',
        '--accent-2':'#a5f3fc','--warning':'#fde68a'
      }
    },
    sunset: {
      label: 'Tramonto', color: '#f472b6', icons: 'warm',
      desc: 'Rosa-arancio gradient caldo',
      vars: {
        '--bg':'#1a1018','--bg-soft':'#261520','--card':'#2d1a28','--card-border':'#4a2d3e',
        '--text':'#fdf2f8','--text-secondary':'#f9a8d4',
        '--accent':'#f472b6','--accent-hover':'#ec4899','--accent-soft':'rgba(244,114,182,0.12)',
        '--accent-2':'#fda4af','--warning':'#fbbf24'
      },
      extra: '.btn-primary{background:linear-gradient(135deg,#f472b6,#fb923c)!important;color:#1a1018!important;border:none!important}'
    },
    light_modern: {
      label: 'Chiaro Moderno', color: '#2563eb', icons: 'minimal',
      desc: 'Chiaro, professionale, blu',
      vars: {
        '--bg':'#f8fafc','--bg-soft':'#f1f5f9','--card':'#ffffff','--card-border':'#e2e8f0',
        '--text':'#1e293b','--text-secondary':'#64748b',
        '--accent':'#2563eb','--accent-hover':'#1d4ed8','--accent-soft':'rgba(37,99,235,0.10)',
        '--accent-2':'#60a5fa','--warning':'#f59e0b','--danger':'#ef4444',
        '--shadow':'0 4px 24px rgba(0,0,0,0.08)'
      },
      extra: 'body{color:#1e293b!important}.top-header{background:rgba(255,255,255,0.92)!important;border-bottom:1px solid #e2e8f0!important}.bottom-nav{background:rgba(255,255,255,0.97)!important;border-top:1px solid #e2e8f0!important}.btn-secondary{background:#f1f5f9!important;color:#1e293b!important}.btn-ghost{color:#1e293b!important;border-color:#e2e8f0!important}select,.input{background:#f1f5f9!important;color:#1e293b!important;border-color:#e2e8f0!important}.nav-item .nav-icon,.nav-item span{color:#64748b!important}.nav-item.active .nav-icon,.nav-item.active span{color:#2563eb!important}.stat-value{color:#2563eb!important}'
    },
    minimal_chic: {
      label: 'Minimal Chic', color: '#d97706', icons: 'geo',
      desc: 'Off-white, ambra, bordi netti',
      vars: {
        '--bg':'#fafafa','--bg-soft':'#f5f5f5','--card':'#ffffff','--card-border':'#e5e5e5',
        '--text':'#111111','--text-secondary':'#666666',
        '--accent':'#d97706','--accent-hover':'#b45309','--accent-soft':'rgba(217,119,6,0.08)',
        '--accent-2':'#92400e','--warning':'#d97706','--danger':'#dc2626',
        '--radius':'6px','--radius-sm':'4px','--radius-xs':'3px',
        '--shadow':'0 2px 8px rgba(0,0,0,0.06)'
      },
      extra: 'body{color:#111111!important}.top-header{background:rgba(255,255,255,0.95)!important;border-bottom:1px solid rgba(0,0,0,0.08)!important}.bottom-nav{background:rgba(255,255,255,0.98)!important;border-top:1px solid rgba(0,0,0,0.08)!important}.btn-secondary{background:#f5f5f5!important;color:#111111!important}.btn-ghost{color:#111111!important;border-color:#e5e5e5!important}select,.input{background:#f5f5f5!important;color:#111111!important;border-color:#e5e5e5!important}.nav-item .nav-icon,.nav-item span{color:#666666!important}.nav-item.active .nav-icon,.nav-item.active span{color:#d97706!important}.stat-value{color:#d97706!important}'
    }
  };

  var ICON_SETS = {
    emoji: null,
    minimal: {
      '🏠':'⌂','🧭':'◎','❤️':'♥','📋':'☰','⚙️':'⚙',
      '🔄':'↻','📍':'◉','⏱':'◷','📏':'↔','🚶':'⇢',
      '🍽️':'⊕','🥡':'▣','📡':'◈','💾':'⬇','🚪':'⇥',
      '🏁':'▸','🌳':'♣','🏔️':'△','🪑':'□','📊':'▦',
      '🎨':'◐','🟢':'●','🌊':'≈','🐠':'◎','🏜️':'◇',
      '🔮':'◆','🌸':'○','❄️':'✻','🌅':'◑',
      '👋':'·','🏃':'→','🔙':'←','🎯':'◎','🎪':'◇',
      '💡':'◈','☀️':'○','🌤':'◔','⛅':'◑','☁️':'◑',
      '🌧️':'●','💨':'≋','🌡️':'|','♡':'○','✅':'✓','⚠️':'!',
      '🗺️':'▱'
    },
    geo: {
      '🏠':'⌂','🧭':'◇','❤️':'★','📋':'≡','⚙️':'⛭',
      '🔄':'⟳','📍':'⊙','⏱':'⏳','📏':'⤡','🚶':'→',
      '🍽️':'⊞','🥡':'▤','📡':'⊛','💾':'↧','🚪':'↦',
      '🏁':'▶','🌳':'⚘','🏔️':'⛰','🪑':'▬','📊':'⊞',
      '🎨':'◑','🟢':'◉','🌊':'〰','🏜️':'☼','❄️':'❅','🌅':'☀',
      '👋':'·','🏃':'▸','🔙':'◂','🎯':'⊙','🎪':'◇',
      '💡':'✦','☀️':'☼','🌤':'⛅','⛅':'☁','☁️':'☁',
      '🌧️':'☂','💨':'≈','🌡️':'|','♡':'☆','✅':'✓','⚠️':'!',
      '🗺️':'▱'
    },
    soft: {
      '🏠':'◈','🧭':'✦','❤️':'♡','📋':'▪','⚙️':'✧',
      '🔄':'↺','📍':'◆','⏱':'○','📏':'─','🚶':'›',
      '🍽️':'◇','🥡':'□','📡':'◈','💾':'▾','🚪':'▸',
      '🏁':'◆','🌳':'❋','🏔️':'▵','🪑':'▫','📊':'▪',
      '🎨':'◑','🟢':'◆','🌊':'~','🔮':'✦','🌸':'❋','❄️':'✿','🌅':'○',
      '👋':'~','🏃':'›','🔙':'‹','🎯':'◆','🎪':'◇',
      '💡':'✧','☀️':'◌','🌤':'◔','⛅':'◑','☁️':'◑',
      '🌧️':'◕','💨':'~','🌡️':'|','♡':'○','✅':'✓','⚠️':'!',
      '🗺️':'□'
    },
    outline: {
      '🏠':'□','🧭':'○','❤️':'♡','📋':'≡','⚙️':'○',
      '🔄':'↻','📍':'○','⏱':'○','📏':'—','🚶':'→',
      '🍽️':'○','🥡':'□','📡':'◇','💾':'↓','🚪':'→',
      '🏁':'▷','🌳':'○','🏔️':'△','🪑':'□','📊':'□',
      '🎨':'○','🟢':'○','🌊':'○','🌸':'◇','❄️':'✳','🌅':'○',
      '👋':'·','🏃':'→','🔙':'←','🎯':'○','🎪':'□',
      '💡':'◇','☀️':'○','🌤':'◑','⛅':'◑','☁️':'○',
      '🌧️':'●','💨':'~','🌡️':'|','♡':'○','✅':'✓','⚠️':'△',
      '🗺️':'□'
    },
    warm: {
      '🏠':'⌂','🧭':'✺','❤️':'♥','📋':'☰','⚙️':'✦',
      '🔄':'⟳','📍':'✸','⏱':'◔','📏':'↔','🚶':'❯',
      '🍽️':'✦','🥡':'▣','📡':'✸','💾':'⬇','🚪':'⇥',
      '🏁':'▸','🌳':'❀','🏔️':'▲','🪑':'▭','📊':'▦',
      '🎨':'✦','🟢':'●','🌊':'≋','🌅':'✺','❄️':'✻',
      '👋':'~','🏃':'▸','🔙':'◂','🎯':'✸','🎪':'✦',
      '💡':'✺','☀️':'✺','🌤':'◔','⛅':'◑','☁️':'◑',
      '🌧️':'◕','💨':'≋','🌡️':'|','♡':'♡','✅':'✓','⚠️':'!',
      '🗺️':'▱'
    }
  };

  function getTheme() {
    try { return localStorage.getItem('w2e_theme') || 'classic'; } catch(e) { return 'classic'; }
  }
  function setTheme(id) {
    try { localStorage.setItem('w2e_theme', id); } catch(e) {}
  }

  function buildStyleText(id) {
    var theme = THEMES[id];
    if (!theme || !theme.vars || !Object.keys(theme.vars).length) return '';
    var css = ':root{';
    Object.keys(theme.vars).forEach(function(k) { css += k + ':' + theme.vars[k] + '!important;'; });
    css += '}';
    // Force body, cards, nav backgrounds
    var v = theme.vars;
    css += 'body{background:' + (v['--bg']||'') + '!important;color:' + (v['--text']||'') + '!important}';
    css += '.top-header{background:' + (v['--bg']||'') + 'ee!important}';
    css += '.bottom-nav{background:' + (v['--bg']||'') + 'f5!important}';
    css += '.card{background:' + (v['--card']||'') + '!important;border-color:' + (v['--card-border']||'') + '!important}';
    css += '.brand-text,.brand-two{color:' + (v['--accent']||'') + '!important}';
    css += '.btn-primary{background:' + (v['--accent']||'') + '!important}';
    css += '.btn-primary:hover{background:' + (v['--accent-hover']||'') + '!important}';
    css += '.nav-item.active .nav-icon,.nav-item.active span{color:' + (v['--accent']||'') + '!important}';
    css += '.walk-badge{border-color:' + (v['--accent']||'') + '!important;color:' + (v['--accent']||'') + '!important}';
    css += '.tgl-ios:checked+.tgl-btn{background:' + (v['--accent']||'') + '!important}';
    css += '.section-title{color:' + (v['--accent']||'') + '!important}';
    css += 'select,.input{background:' + (v['--bg-soft']||'') + '!important;color:' + (v['--text']||'') + '!important;border-color:' + (v['--card-border']||'') + '!important}';
    if (theme.extra) css += theme.extra;
    return css;
  }

  function injectStyle(id) {
    var old = document.getElementById('w2e-theme-style');
    if (old) old.remove();
    var css = buildStyleText(id);
    if (!css) return;
    var style = document.createElement('style');
    style.id = 'w2e-theme-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Build regex from icon map keys (longest first to avoid partial matches)
  function buildEmojiRegex(iconMap) {
    var keys = Object.keys(iconMap).sort(function(a,b) { return b.length - a.length; });
    var escaped = keys.map(function(k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
    return new RegExp(escaped.join('|'), 'g');
  }

  function replaceInNode(node, iconMap, regex) {
    if (node.nodeType === 3) { // Text node
      var text = node.nodeValue;
      if (regex.test(text)) {
        regex.lastIndex = 0;
        node.nodeValue = text.replace(regex, function(m) { return iconMap[m] || m; });
      }
    } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'TEXTAREA') {
      for (var i = 0; i < node.childNodes.length; i++) {
        replaceInNode(node.childNodes[i], iconMap, regex);
      }
    }
  }

  // Store originals for reverting when switching back to emoji theme
  var originalBodyHTML = null;

  function applyIcons(iconMap) {
    if (!iconMap) return;
    // Save original body HTML once (for reverting to emoji)
    if (!originalBodyHTML) originalBodyHTML = document.body.innerHTML;
    var regex = buildEmojiRegex(iconMap);
    replaceInNode(document.body, iconMap, regex);
  }

  function revertIcons() {
    if (originalBodyHTML) {
      document.body.innerHTML = originalBodyHTML;
      originalBodyHTML = null;
    }
  }

  function applyTheme(id) {
    var theme = THEMES[id] || THEMES.classic;
    setTheme(id);
    // Full page reload ensures clean state (no stale icon replacements)
    location.reload();
  }

  // Inject style IMMEDIATELY (before DOM renders)
  var cur = getTheme();
  if (cur !== 'classic') injectStyle(cur);

  // Apply icons after DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    var t = getTheme();
    var th = THEMES[t];
    if (th && ICON_SETS[th.icons]) applyIcons(ICON_SETS[th.icons]);
    document.body.dataset.theme = t;
  });

  window.W2E_THEMES = { list: THEMES, get: getTheme, apply: applyTheme };
})();
