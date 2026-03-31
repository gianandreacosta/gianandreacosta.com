/* Walk2Eat — Theme & Icon Manager */

(function() {
  var THEMES = {
    classic: { label: 'Classico',       css: null,                           icons: 'emoji',    color: '#22c55e', desc: 'Verde scuro + emoji classiche' },
    teal:    { label: 'Verde Acqua',    css: 'assets/css/theme-teal.css',    icons: 'minimal',  color: '#14b8a6', desc: 'Teal + icone minimali' },
    ocean:   { label: 'Oceano',         css: 'assets/css/theme-ocean.css',   icons: 'minimal',  color: '#2dd4bf', desc: 'Immersione verde acqua profondo' },
    sand:    { label: 'Sabbia',         css: 'assets/css/theme-sand.css',    icons: 'geo',      color: '#d97706', desc: 'Toni caldi deserto' },
    cozy:    { label: 'Cozy',           css: 'assets/css/theme-cozy.css',    icons: 'soft',     color: '#c084fc', desc: 'Viola morbido, accogliente' },
    pastel:  { label: 'Pastello',       css: 'assets/css/theme-pastel.css',  icons: 'outline',  color: '#e88d9d', desc: 'Chiaro, arioso, leggero' },
    nordic:  { label: 'Nordic',         css: 'assets/css/theme-nordic.css',  icons: 'minimal',  color: '#38bdf8', desc: 'Blu scandinavo elegante' },
    sunset:  { label: 'Tramonto',       css: 'assets/css/theme-sunset.css',  icons: 'warm',     color: '#f472b6', desc: 'Rosa-arancio gradient caldo' }
  };

  // Icon sets — each maps emoji to a replacement
  var ICON_SETS = {
    emoji: null, // keep original emoji
    minimal: {
      '🏠': '⌂', '🧭': '◎', '❤️': '♥', '📋': '☰', '⚙️': '⚙',
      '🔄': '↻', '📍': '◉', '⏱': '◷', '📏': '↔', '🚶': '⇢',
      '🍽️': '⊕', '🥡': '▣', '📡': '◈', '💾': '⬇', '🚪': '⇥',
      '🏁': '▸', '🌳': '♣', '🏔️': '△', '🪑': '□', '📊': '▦',
      '☀️': '○', '🌤': '◔', '⛅': '◑', '🌧': '◌', '❄️': '✻',
      '🎨': '◐', '🟢': '●', '🌊': '≈'
    },
    geo: {
      '🏠': '⌂', '🧭': '◇', '❤️': '★', '📋': '≡', '⚙️': '⛭',
      '🔄': '⟳', '📍': '⊙', '⏱': '⏳', '📏': '⤡', '🚶': '→',
      '🍽️': '⊞', '🥡': '▤', '📡': '⊛', '💾': '↧', '🚪': '↦',
      '🏁': '▶', '🌳': '⚘', '🏔️': '⛰', '🪑': '▬', '📊': '⊞',
      '☀️': '☼', '🌤': '⛅', '⛅': '☁', '🌧': '☂', '❄️': '❅',
      '🎨': '◑', '🟢': '◉', '🌊': '〰'
    },
    soft: {
      '🏠': '◈', '🧭': '✦', '❤️': '♡', '📋': '▪', '⚙️': '✧',
      '🔄': '↺', '📍': '◆', '⏱': '○', '📏': '─', '🚶': '›',
      '🍽️': '◇', '🥡': '□', '📡': '◈', '💾': '▾', '🚪': '▸',
      '🏁': '◆', '🌳': '❋', '🏔️': '▵', '🪑': '▫', '📊': '▪',
      '☀️': '◌', '🌤': '◔', '⛅': '◑', '🌧': '◕', '❄️': '✿',
      '🎨': '◑', '🟢': '◆', '🌊': '~'
    },
    outline: {
      '🏠': '□', '🧭': '○', '❤️': '♡', '📋': '≡', '⚙️': '○',
      '🔄': '↻', '📍': '○', '⏱': '○', '📏': '—', '🚶': '→',
      '🍽️': '○', '🥡': '□', '📡': '◇', '💾': '↓', '🚪': '→',
      '🏁': '▷', '🌳': '○', '🏔️': '△', '🪑': '□', '📊': '□',
      '☀️': '○', '🌤': '◑', '⛅': '◑', '🌧': '●', '❄️': '✳',
      '🎨': '○', '🟢': '○', '🌊': '○'
    },
    warm: {
      '🏠': '⌂', '🧭': '✺', '❤️': '♥', '📋': '☰', '⚙️': '✦',
      '🔄': '⟳', '📍': '✸', '⏱': '◔', '📏': '↔', '🚶': '❯',
      '🍽️': '✦', '🥡': '▣', '📡': '✸', '💾': '⬇', '🚪': '⇥',
      '🏁': '▸', '🌳': '❀', '🏔️': '▲', '🪑': '▭', '📊': '▦',
      '☀️': '✺', '🌤': '◔', '⛅': '◑', '🌧': '◕', '❄️': '✻',
      '🎨': '✦', '🟢': '●', '🌊': '≋'
    }
  };

  function getTheme() {
    try { return localStorage.getItem('w2e_theme') || 'classic'; } catch(e) { return 'classic'; }
  }

  function setTheme(id) {
    try { localStorage.setItem('w2e_theme', id); } catch(e) {}
  }

  function applyTheme(id) {
    var theme = THEMES[id] || THEMES.classic;
    // Remove old theme CSS
    var old = document.getElementById('w2e-theme-css');
    if (old) old.remove();
    // Add new theme CSS
    if (theme.css) {
      var link = document.createElement('link');
      link.id = 'w2e-theme-css';
      link.rel = 'stylesheet';
      link.href = theme.css + '?v=' + Date.now();
      document.head.appendChild(link);
    }
    // Apply icon set
    var iconSet = ICON_SETS[theme.icons];
    if (iconSet) applyIcons(iconSet);
    setTheme(id);
    document.body.dataset.theme = id;
  }

  function applyIcons(iconMap) {
    if (!iconMap) return;
    // Nav icons
    document.querySelectorAll('.nav-icon').forEach(function(el) {
      var txt = el.textContent.trim();
      if (iconMap[txt]) {
        el.textContent = iconMap[txt];
        el.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        el.style.fontSize = '18px';
      }
    });
    // Card titles, badges, buttons, section titles, toggle labels
    document.querySelectorAll('.card-title, .walk-badge, .btn, .section-title, .toggle-label').forEach(function(el) {
      var html = el.innerHTML;
      var changed = false;
      Object.keys(iconMap).forEach(function(emoji) {
        if (html.indexOf(emoji) !== -1) {
          html = html.split(emoji).join(iconMap[emoji]);
          changed = true;
        }
      });
      if (changed) el.innerHTML = html;
    });
  }

  // Auto-apply CSS early (before DOMContentLoaded)
  var currentTheme = getTheme();
  var theme = THEMES[currentTheme];
  if (theme && theme.css) {
    var link = document.createElement('link');
    link.id = 'w2e-theme-css';
    link.rel = 'stylesheet';
    link.href = theme.css + '?v=20260331';
    document.head.appendChild(link);
  }

  // Apply icons after DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    var t = getTheme();
    var th = THEMES[t];
    if (th && ICON_SETS[th.icons]) applyIcons(ICON_SETS[th.icons]);
    document.body.dataset.theme = t;
  });

  // Expose API
  window.W2E_THEMES = {
    list: THEMES,
    get: getTheme,
    apply: applyTheme
  };
})();
