/* Walk2Eat — Theme & Icon Manager v3 — No reload, data-attribute icon revert */

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

  /* ── Helpers: get/set theme ── */

  function getTheme() {
    try { return localStorage.getItem('w2e_theme') || 'classic'; } catch(e) { return 'classic'; }
  }
  function setTheme(id) {
    try { localStorage.setItem('w2e_theme', id); } catch(e) {}
  }

  /* ── CSS generation & injection ── */

  function buildStyleText(id) {
    var theme = THEMES[id];
    if (!theme || !theme.vars || !Object.keys(theme.vars).length) return '';
    var css = ':root{';
    Object.keys(theme.vars).forEach(function(k) { css += k + ':' + theme.vars[k] + '!important;'; });
    css += '}';
    var v = theme.vars;
    css += 'body{background:' + (v['--bg']||'') + '!important;color:' + (v['--text']||'') + '!important}';
    css += '.top-header{background:' + (v['--bg']||'') + 'ee!important}';
    css += '.bottom-nav{background:' + (v['--bg']||'') + 'f5!important}';
    css += '.card{background:' + (v['--card']||'') + '!important;border-color:' + (v['--card-border']||'') + '!important}';
    css += '.stat-card{background:' + (v['--card']||'') + '!important;border-color:' + (v['--card-border']||'') + '!important}';
    css += '.brand-text,.brand-two{color:' + (v['--accent']||'') + '!important}';
    css += '.btn-primary{background:' + (v['--accent']||'') + '!important}';
    css += '.btn-primary:hover{background:' + (v['--accent-hover']||'') + '!important}';
    css += '.nav-item.active .nav-icon,.nav-item.active span{color:' + (v['--accent']||'') + '!important}';
    css += '.walk-badge{border-color:' + (v['--accent']||'') + '!important;color:' + (v['--accent']||'') + '!important}';
    css += '.tgl-ios:checked+.tgl-btn{background:' + (v['--accent']||'') + '!important}';
    css += '.section-title{color:' + (v['--accent']||'') + '!important}';
    css += 'select,.input{background:' + (v['--bg-soft']||'') + '!important;color:' + (v['--text']||'') + '!important;border-color:' + (v['--card-border']||'') + '!important}';
    var bg = v['--bg'] || '#0f172a';
    var card = v['--card'] || '#1e293b';
    var border = v['--card-border'] || '#334155';
    function hexToRgb(hex) {
      hex = hex.replace('#','');
      if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      var r = parseInt(hex.substring(0,2),16);
      var g = parseInt(hex.substring(2,4),16);
      var b = parseInt(hex.substring(4,6),16);
      return r+','+g+','+b;
    }
    var bgRgb = hexToRgb(bg);
    var cardRgb = hexToRgb(card);
    var borderRgb = hexToRgb(border);
    css += '.top-bar{background:rgba(' + bgRgb + ',0.82)!important;border-bottom-color:rgba(' + borderRgb + ',0.4)!important}';
    css += '.bottom-card{background:rgba(' + bgRgb + ',0.94)!important;border-top-color:rgba(' + borderRgb + ',0.4)!important}';
    css += '.bottom-nav{background:rgba(' + bgRgb + ',0.96)!important;border-top-color:rgba(' + borderRgb + ',0.4)!important}';
    css += '.map-layer-pill{background:rgba(' + bgRgb + ',0.88)!important;border-color:rgba(' + borderRgb + ',0.4)!important}';
    css += '.map-layer-btn.active{background:' + (v['--accent-soft']||'rgba(34,197,94,0.15)') + '!important;color:' + (v['--accent']||'#22c55e') + '!important}';
    css += '.route-stat-value{color:' + (v['--accent']||'') + '!important}';
    css += '.live-stat .val{color:' + (v['--accent']||'') + '!important}';
    css += '.progress-bar-fill{background:' + (v['--accent']||'') + '!important}';
    css += '.ctrl-btn.active{background:' + (v['--accent']||'') + '!important}';
    css += '.bottom-card-handle{background:rgba(' + borderRgb + ',0.5)!important}';
    css += '.bottom-card-details{border-top-color:rgba(' + borderRgb + ',0.4)!important}';
    if (v['--text'] && v['--text'] !== '#e5e7eb') {
      css += '.route-dest-name,.route-stat-unit{color:' + (v['--text']||'') + '!important}';
      css += '.bottom-card-content .small{color:' + (v['--text-secondary']||v['--text']||'') + '!important}';
      css += '.nav-item{color:' + (v['--text-secondary']||'') + '!important}';
    }
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

  /* ── Icon replacement with data-attribute revert ── */

  // Build regex from icon map keys (longest first to avoid partial matches)
  function buildEmojiRegex(iconMap) {
    var keys = Object.keys(iconMap).sort(function(a,b) { return b.length - a.length; });
    var escaped = keys.map(function(k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
    return new RegExp(escaped.join('|'), 'g');
  }

  /**
   * Walk text nodes and replace emoji with icon-set glyphs.
   * Before modifying any text node, save the original text in a
   * data-original-text attribute on its parent element (only once,
   * so successive calls don't overwrite the true original).
   */
  function replaceInNode(node, iconMap, regex) {
    if (node.nodeType === 3) { // Text node
      var text = node.nodeValue;
      regex.lastIndex = 0;
      if (regex.test(text)) {
        regex.lastIndex = 0;
        // Save original on parent element (only the first time)
        var parent = node.parentNode;
        if (parent && parent.nodeType === 1 && !parent.hasAttribute('data-original-text')) {
          parent.setAttribute('data-original-text', text);
        }
        node.nodeValue = text.replace(regex, function(m) { return iconMap[m] || m; });
      }
    } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'TEXTAREA') {
      // For elements with multiple text children, store the full innerHTML instead
      var childTexts = [];
      var hasMatch = false;
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType === 3) {
          regex.lastIndex = 0;
          if (regex.test(child.nodeValue)) hasMatch = true;
        }
      }
      // If this element directly contains text nodes with emoji, save innerHTML
      if (hasMatch && !node.hasAttribute('data-original-text')) {
        // Only save if this element is a leaf-level container (no nested elements with emoji)
        var hasElementChildren = false;
        for (var j = 0; j < node.childNodes.length; j++) {
          if (node.childNodes[j].nodeType === 1) { hasElementChildren = true; break; }
        }
        if (!hasElementChildren) {
          node.setAttribute('data-original-text', node.textContent);
        }
      }
      for (var k = 0; k < node.childNodes.length; k++) {
        replaceInNode(node.childNodes[k], iconMap, regex);
      }
    }
  }

  function applyIcons(iconMap) {
    if (!iconMap) return;
    var regex = buildEmojiRegex(iconMap);
    replaceInNode(document.body, iconMap, regex);
  }

  /**
   * Revert all icon replacements by restoring text from data-original-text
   * attributes, then removing those attributes.
   */
  function revertIcons() {
    var tagged = document.querySelectorAll('[data-original-text]');
    for (var i = 0; i < tagged.length; i++) {
      var el = tagged[i];
      var original = el.getAttribute('data-original-text');
      // If the element has only text children (no nested elements), restore textContent
      var hasElementChildren = false;
      for (var j = 0; j < el.childNodes.length; j++) {
        if (el.childNodes[j].nodeType === 1) { hasElementChildren = true; break; }
      }
      if (!hasElementChildren) {
        el.textContent = original;
      } else {
        // For elements with mixed content, find the first text child and restore it
        for (var k = 0; k < el.childNodes.length; k++) {
          if (el.childNodes[k].nodeType === 3) {
            el.childNodes[k].nodeValue = original;
            break;
          }
        }
      }
      el.removeAttribute('data-original-text');
    }
  }

  /* ── Apply theme (no reload) ── */

  function applyTheme(id) {
    var theme = THEMES[id] || THEMES.classic;
    setTheme(id);

    // 1. Inject new CSS (or remove override for classic)
    if (id === 'classic') {
      var old = document.getElementById('w2e-theme-style');
      if (old) old.remove();
    } else {
      injectStyle(id);
    }

    // 2. Revert any previous icon replacements back to emoji originals
    revertIcons();

    // 3. Apply new icon set (if not emoji/null)
    var iconMap = ICON_SETS[theme.icons];
    if (iconMap) applyIcons(iconMap);

    // 4. Update body data attribute
    document.body.dataset.theme = id;
  }

  /* ── Initial load: inject CSS immediately, icons after DOM ready ── */

  var cur = getTheme();
  if (cur !== 'classic') injectStyle(cur);

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function() {
    var t = getTheme();
    var th = THEMES[t];
    if (th && ICON_SETS[th.icons]) applyIcons(ICON_SETS[th.icons]);
    document.body.dataset.theme = t;
  });

  /* ── Public API ── */

  window.W2E_THEMES = { list: THEMES, get: getTheme, apply: applyTheme };
})();
