/* Walk2Eat — Theme & Icon Manager */

(function() {
  var THEMES = {
    classic: { label: 'Classico', css: null, icons: 'emoji' },
    teal:    { label: 'Verde Acqua', css: 'assets/css/theme-teal.css', icons: 'modern' }
  };

  // Modern icon mapping (replaces emoji with sleek Unicode/text)
  var MODERN_ICONS = {
    '🏠': '⌂', '🧭': '◎', '❤️': '♥', '📋': '☰', '⚙️': '⚙',
    '🔄': '↻', '📍': '◉', '⏱': '◷', '📏': '↔', '🚶': '⇢',
    '🍽️': '⊕', '🥡': '▣', '📡': '◈', '💾': '⬇', '🚪': '⇥',
    '🏁': '▸', '🌳': '♣', '🏔️': '△', '🪑': '▭', '📊': '▦',
    '♡': '○', '🔄': '↻', '🗺️': '▱', '☀️': '☀', '🌤': '⛅',
    '⛅': '◑', '🌧': '◌', '❄️': '✻', '🌡️': '|'
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
      link.href = theme.css;
      document.head.appendChild(link);
    }
    // Apply icon set
    if (theme.icons === 'modern') {
      applyModernIcons();
    }
    setTheme(id);
    document.body.dataset.theme = id;
  }

  function applyModernIcons() {
    // Replace emoji in nav icons
    document.querySelectorAll('.nav-icon').forEach(function(el) {
      var emoji = el.textContent.trim();
      if (MODERN_ICONS[emoji]) {
        el.textContent = MODERN_ICONS[emoji];
        el.style.fontFamily = 'system-ui, sans-serif';
        el.style.fontSize = '18px';
      }
    });
    // Replace emoji in card titles, badges, buttons
    document.querySelectorAll('.card-title, .walk-badge, .btn, .section-title, .toggle-label').forEach(function(el) {
      var html = el.innerHTML;
      Object.keys(MODERN_ICONS).forEach(function(emoji) {
        if (html.includes(emoji)) {
          html = html.split(emoji).join('<span style="font-family:system-ui;font-size:1em">' + MODERN_ICONS[emoji] + '</span>');
        }
      });
      el.innerHTML = html;
    });
  }

  // Auto-apply on load
  var currentTheme = getTheme();
  if (currentTheme !== 'classic') {
    // Inject CSS early (before DOMContentLoaded) for flash prevention
    var theme = THEMES[currentTheme];
    if (theme && theme.css) {
      var link = document.createElement('link');
      link.id = 'w2e-theme-css';
      link.rel = 'stylesheet';
      link.href = theme.css;
      document.head.appendChild(link);
    }
  }
  // Apply icons after DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    var t = getTheme();
    if (THEMES[t] && THEMES[t].icons === 'modern') {
      applyModernIcons();
    }
    document.body.dataset.theme = t;
  });

  // Expose API
  window.W2E_THEMES = {
    list: THEMES,
    get: getTheme,
    apply: applyTheme
  };
})();
