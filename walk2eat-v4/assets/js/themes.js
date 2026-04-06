/* Walk2Eat — Theme Manager v4 — 3 themes, no icon swap */

(function() {
  var THEMES = {
    dark: {
      label: 'Dark', color: '#34D399',
      vars: {}
    },
    light: {
      label: 'Light', color: '#4A9B8E',
      vars: {
        '--bg':'#F8F6F2','--bg-soft':'#F0EDE6','--card':'#FFFFFF','--card-border':'rgba(0,0,0,0.06)',
        '--text':'#1A1A1E','--text-secondary':'#7C7C80',
        '--accent':'#4A9B8E','--accent-hover':'#3D8377','--accent-soft':'rgba(74,155,142,0.10)',
        '--accent-2':'#38BDF8','--warning':'#F59E0B','--danger':'#EF4444',
        '--shadow':'0 1px 3px rgba(0,0,0,0.06)'
      },
      extra: 'body{color:#1A1A1E!important}' +
        '.top-header{background:rgba(248,246,242,0.95)!important;border-bottom:1px solid rgba(0,0,0,0.06)!important}' +
        '.bottom-nav{background:rgba(248,246,242,0.97)!important;border-top:1px solid rgba(0,0,0,0.06)!important}' +
        '.btn-secondary{background:rgba(0,0,0,0.04)!important;color:#1A1A1E!important}' +
        '.btn-ghost{color:#1A1A1E!important;border-color:rgba(0,0,0,0.08)!important}' +
        'select,.input{background:#F0EDE6!important;color:#1A1A1E!important;border-color:rgba(0,0,0,0.08)!important}' +
        '.nav-item .lucide,.nav-item span{color:#7C7C80!important}' +
        '.nav-item.active .lucide,.nav-item.active span{color:#4A9B8E!important}' +
        '.stat-value{color:#4A9B8E!important}' +
        '.section-title{color:#4A9B8E!important}' +
        '.brand-text{color:#4A9B8E!important}'
    },
    forest: {
      label: 'Forest', color: '#34D399',
      vars: {
        '--bg':'#0F1F14','--bg-soft':'#162B1B','--card':'#1A2E1F','--card-border':'rgba(110,231,183,0.08)',
        '--text':'#ECFDF5','--text-secondary':'#6EE7B7',
        '--accent':'#34D399','--accent-hover':'#10B981','--accent-soft':'rgba(52,211,153,0.12)',
        '--accent-2':'#6EE7B7','--warning':'#FCD34D'
      }
    }
  };

  /* ── Helpers: get/set theme ── */

  function getTheme() {
    try { return localStorage.getItem('w2e_theme') || 'dark'; } catch(e) { return 'dark'; }
  }
  function setTheme(id) {
    try { localStorage.setItem('w2e_theme', id); } catch(e) {}
  }

  /* ── CSS generation & injection ── */

  function hexToRgb(hex) {
    hex = hex.replace('#','');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var r = parseInt(hex.substring(0,2),16);
    var g = parseInt(hex.substring(2,4),16);
    var b = parseInt(hex.substring(4,6),16);
    return r+','+g+','+b;
  }

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

  /* ── Apply theme ── */

  function applyTheme(id) {
    if (!THEMES[id]) id = 'dark';
    setTheme(id);

    if (id === 'dark') {
      var old = document.getElementById('w2e-theme-style');
      if (old) old.remove();
    } else {
      injectStyle(id);
    }

    document.body.dataset.theme = id;
  }

  /* ── Initial load ── */

  var cur = getTheme();
  if (cur !== 'dark') injectStyle(cur);

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function() {
    document.body.dataset.theme = getTheme();
  });

  /* ── Public API ── */

  window.W2E_THEMES = { list: THEMES, get: getTheme, apply: applyTheme };
})();
