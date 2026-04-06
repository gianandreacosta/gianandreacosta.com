/* ================================================================
   Walk2Eat v4 - Dashboard Controller
   Extracted from inline JS in dashboard.html
   ================================================================ */

(function () {
  'use strict';

  /* ── Lucide icon refresh helper ── */
  function refreshIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  var HEART_OFF = '<i data-lucide="heart" class="lucide"></i>';
  var HEART_ON  = '<i data-lucide="heart" class="lucide" style="fill:currentColor"></i>';

  /* ── Toast notification system ── */
  var _toastEl = null;
  var _toastTimer = null;

  function showToast(msg, type) {
    if (!_toastEl) {
      _toastEl = document.createElement('div');
      _toastEl.id = 'appToast';
      _toastEl.style.cssText =
        'position:fixed;top:0;left:0;right:0;z-index:10000;' +
        'padding:14px 20px;font-size:14px;font-weight:600;' +
        'text-align:center;transition:transform .35s ease,opacity .35s ease;' +
        'transform:translateY(-100%);opacity:0;pointer-events:none;';
      document.body.appendChild(_toastEl);
    }
    if (_toastTimer) { clearTimeout(_toastTimer); _toastTimer = null; }

    if (type === 'error') {
      _toastEl.style.background = '#dc2626';
      _toastEl.style.color = '#fff';
    } else {
      _toastEl.style.background = '#1e293b';
      _toastEl.style.color = '#fff';
    }

    _toastEl.textContent = msg;
    _toastEl.style.transform = 'translateY(0)';
    _toastEl.style.opacity = '1';
    _toastEl.style.pointerEvents = 'auto';

    _toastTimer = setTimeout(function () {
      _toastEl.style.transform = 'translateY(-100%)';
      _toastEl.style.opacity = '0';
      _toastEl.style.pointerEvents = 'none';
      _toastTimer = null;
    }, 4000);
  }

  /* ── Auth guard ── */
  var u = LBW.getUser();
  if (!u) {
    window.location.href = 'login.html';
    return;
  }
  var prefs = LBW.getPrefs();

  /* ── Greeting ── */
  document.getElementById('hello').textContent = 'Ciao ' + u.name;

  /* ── Map state ── */
  var map = null, routeLine = null, startMarker = null, turnMarker = null;
  var currentProposal = null;

  function initMap() {
    if (map) return;
    map = L.map('map-fullscreen', {
      zoomControl: false,
      attributionControl: false
    });
    window._tileLayers = {
      osm:   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      swiss: L.tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg')
    };
    window._activeLayer = 'osm';
    window._tileLayers.osm.addTo(map);
    document.getElementById('layerPill').style.display = 'flex';
    positionLayerPill();
  }

  /* ── Position layer pill above bottom card ── */
  function positionLayerPill() {
    var card = document.getElementById('bottomCard');
    var pill = document.getElementById('layerPill');
    if (!card || !pill) return;
    var cardH = card.getBoundingClientRect().height;
    var navH  = parseInt(getComputedStyle(document.documentElement)
                  .getPropertyValue('--bottom-nav-h')) || 60;
    pill.style.bottom = (cardH + navH + 8) + 'px';
  }

  /* ── Skeleton loading states ── */
  function setCardLoading() {
    document.getElementById('cardSkeleton').style.display = 'block';
    document.getElementById('cardContent').style.display  = 'none';
  }

  function setCardReady() {
    document.getElementById('cardSkeleton').style.display = 'none';
    document.getElementById('cardContent').style.display  = 'block';
    positionLayerPill();
    refreshIcons();
  }

  /* ── Weather mock ── */
  function weatherMock() {
    var d = new Date();
    var key = (d.getDate() + d.getMonth() + d.getHours()) % 4;
    if (key === 0) return { label: 'Sole',             temp: 22, bad: false };
    if (key === 1) return { label: 'Nuvoloso',         temp: 18, bad: false };
    if (key === 2) return { label: 'Pioggia leggera',  temp: 14, bad: true  };
    return                 { label: 'Vento forte',      temp: 12, bad: true  };
  }

  function renderWeather() {
    var w = weatherMock();
    var icon = w.label.includes('Sole')     ? '<i data-lucide="sun" class="lucide"></i>'
             : w.label.includes('Nuvoloso') ? '<i data-lucide="cloud" class="lucide"></i>'
             : w.label.includes('Pioggia')  ? '<i data-lucide="cloud-rain" class="lucide"></i>'
             :                                '<i data-lucide="wind" class="lucide"></i>';
    var condition = w.bad
      ? '<i data-lucide="alert-triangle" class="lucide" style="color:var(--warning)"></i> Condizioni sfavorevoli'
      : '<i data-lucide="check-circle" class="lucide" style="color:var(--accent)"></i> Condizioni buone';
    document.getElementById('weatherBox').innerHTML =
      '<div style="display:flex;align-items:center;gap:8px">' +
        '<span style="font-size:1.3rem">' + icon + '</span>' +
        '<span><b>' + w.label + '</b> ' + w.temp + '\u00B0C<br>' +
        '<span>' + condition + '</span></span>' +
      '</div>';
    refreshIcons();
  }

  /* ── Time breakdown ── */
  function renderBreakdown(p) {
    var walkTotal = p.walk.minutes;
    var walkOut   = Math.round(walkTotal / 2);
    var walkBack  = walkTotal - walkOut;
    document.getElementById('timeBreakdown').innerHTML =
      '<div style="display:flex;flex-direction:column;gap:4px">' +
        '<div><i data-lucide="move-right" class="lucide"></i> Andata: <b>' + walkOut + ' min</b></div>' +
        '<div><i data-lucide="move-left" class="lucide"></i> Ritorno: <b>' + walkBack + ' min</b></div>' +
        '<hr style="border-color:var(--glass-border);margin:4px 0">' +
        '<div><i data-lucide="ruler" class="lucide"></i> Totale: <b>' + walkTotal + ' min</b> \u00B7 <b>' + p.walk.distanceKm + ' km</b></div>' +
      '</div>';
    refreshIcons();
  }

  /* ── Why this proposal ── */
  function renderWhy(p) {
    var reasons = [
      '<i data-lucide="target" class="lucide"></i> Intensit\u00E0: <b>' + prefs.intensity + '</b>',
      '<i data-lucide="compass" class="lucide"></i> Obiettivo: <b>' + prefs.goal + '</b>',
      '<i data-lucide="refresh-cw" class="lucide"></i> Percorso ad anello'
    ];
    document.getElementById('whyBox').innerHTML = reasons.map(function (r) {
      return '<div style="padding:3px 0">' + r + '</div>';
    }).join('');
    refreshIcons();
  }

  /* ── Save / favorite toggle ── */
  function setFavButton(proposal) {
    var saveEl = document.getElementById('save');
    var isFav  = LBW.isFavoriteRoute(proposal);
    if (isFav) {
      saveEl.innerHTML = HEART_ON + ' Salvato';
      saveEl.classList.add('btn-saved');
    } else {
      saveEl.innerHTML = HEART_OFF + ' Salva';
      saveEl.classList.remove('btn-saved');
    }
    refreshIcons();
  }

  /* ── Show error inside card content ── */
  function showCardError(msg) {
    setCardReady();
    var el = document.getElementById('cardContent');
    el.innerHTML =
      '<div style="text-align:center;padding:24px 16px;color:#ef4444">' +
        '<div style="font-size:1.5rem;margin-bottom:8px"><i data-lucide="alert-triangle" class="lucide" style="width:32px;height:32px"></i></div>' +
        '<div style="font-weight:600;margin-bottom:4px">Errore</div>' +
        '<div style="font-size:13px;opacity:.85">' + msg + '</div>' +
      '</div>';
    refreshIcons();
  }

  /* ── Render proposal on map + card ── */
  function renderProposal(p) {
    currentProposal = p;

    document.getElementById('walkStat').textContent    = p.walk.minutes;
    document.getElementById('walkDist').textContent     = p.walk.distanceKm;
    document.getElementById('foodName').textContent     = p.food.name    || '\u2014';
    document.getElementById('foodCuisine').textContent  = p.food.cuisine || '';

    setFavButton(p);
    renderBreakdown(p);
    renderWhy(p);
    renderWeather();

    initMap();
    setCardReady();

    /* -- Route polyline & markers -- */
    var pts = (p.route || []).map(function (x) { return [x.lat, x.lng]; });
    if (routeLine)   { map.removeLayer(routeLine);   routeLine   = null; }
    if (startMarker) { map.removeLayer(startMarker); startMarker = null; }
    if (turnMarker)  { map.removeLayer(turnMarker);  turnMarker  = null; }

    if (pts.length) {
      routeLine = L.polyline(pts, { color: '#22c55e', weight: 5, opacity: 0.95 }).addTo(map);

      var startIcon = L.divIcon({
        className: '',
        html: '<div style="background:#34D399;color:#052e16;padding:6px 14px;border-radius:20px;' +
              'font-size:13px;font-weight:800;box-shadow:0 2px 12px rgba(0,0,0,0.5);white-space:nowrap;border:2px solid #fff">Partenza</div>',
        iconAnchor: [16, 16]
      });
      startMarker = L.marker(pts[0], { icon: startIcon }).addTo(map);

      if (p.food && p.food.lat) {
        var turnIcon = L.divIcon({
          className: '',
          html: '<div style="background:#f59e0b;color:#451a03;padding:6px 14px;border-radius:20px;' +
                'font-size:13px;font-weight:800;box-shadow:0 2px 12px rgba(0,0,0,0.5);white-space:nowrap;border:2px solid #fff;max-width:180px;overflow:hidden;text-overflow:ellipsis">' + (p.food.name || 'Destinazione') + '</div>',
          iconAnchor: [16, 16]
        });
        turnMarker = L.marker([p.food.lat, p.food.lng], { icon: turnIcon }).addTo(map);
      }

      var cardH = document.getElementById('bottomCard').offsetHeight;
      var navH  = 60;
      map.fitBounds(L.latLngBounds(pts), {
        paddingBottomRight: [16, cardH + navH + 20],
        paddingTopLeft:     [16, 80]
      });
    }

    /* -- Route source note -- */
    var note = document.getElementById('routeSourceNote');
    if (p.source === 'osrm-loop') {
      note.innerHTML  = '<i data-lucide="check-circle" class="lucide"></i> Percorso reale su strade pedonali';
      note.style.display = 'block';
    } else if (p.source === 'synthetic-loop') {
      note.innerHTML  = '<i data-lucide="alert-triangle" class="lucide"></i> Percorso approssimato';
      note.style.display = 'block';
    }

    refreshIcons();
  }

  /* ── Load / refresh route ── */
  async function loadNewRoute(isAlternative) {
    var btn = document.getElementById('refreshWalk');
    btn.classList.add('loading');
    setCardLoading();
    try {
      var originOverride = (isAlternative && currentProposal && currentProposal.origin)
        ? currentProposal.origin
        : null;

      var proposal = await LBW.buildWalkOnlyProposalAsync(null, !!isAlternative, originOverride);

      if (proposal && proposal.error) {
        var errMsg = proposal.message || 'Impossibile generare il percorso.';
        showToast(errMsg, 'error');
        showCardError(errMsg);
        return;
      }

      renderProposal(proposal);
    } catch (e) {
      var catchMsg = e.message || 'Errore sconosciuto durante la generazione del percorso.';
      showToast(catchMsg, 'error');
      showCardError(catchMsg);
    } finally {
      btn.classList.remove('loading');
    }
  }

  /* ── Alternative button ── */
  document.getElementById('refreshWalk').onclick = function () {
    loadNewRoute(true);
  };

  /* ── Save / favorite with heart animation ── */
  document.getElementById('save').onclick = function () {
    if (!currentProposal) return;
    LBW.toggleFavoriteRoute(currentProposal);
    setFavButton(currentProposal);

    var btn = this;
    btn.classList.remove('heart-bounce');
    void btn.offsetWidth;                       // force reflow
    btn.classList.add('heart-bounce');
    btn.addEventListener('animationend', function () {
      btn.classList.remove('heart-bounce');
    }, { once: true });
  };

  /* ── Detail expand / collapse with overlay ── */
  var detailOpen = false;

  document.getElementById('detailToggle').onclick = function () {
    detailOpen = !detailOpen;
    var section = document.getElementById('detailSection');
    var overlay = document.getElementById('mapOverlay');
    if (detailOpen) {
      section.classList.add('visible');
      overlay.classList.add('active');
      this.innerHTML = '<i data-lucide="bar-chart" class="lucide"></i> Chiudi';
    } else {
      section.classList.remove('visible');
      overlay.classList.remove('active');
      this.innerHTML = '<i data-lucide="bar-chart" class="lucide"></i> Dettagli';
    }
    refreshIcons();
    positionLayerPill();
  };

  document.getElementById('mapOverlay').onclick = function () {
    if (detailOpen) document.getElementById('detailToggle').click();
  };

  /* ── Drag-to-dismiss on handle ── */
  (function () {
    var handle   = document.getElementById('dragHandle');
    var card     = document.getElementById('bottomCard');
    var startY   = 0;
    var dragging  = false;

    handle.addEventListener('touchstart', function (e) {
      startY   = e.touches[0].clientY;
      dragging = true;
      card.style.transition = 'none';
    }, { passive: true });

    handle.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      var dy = e.touches[0].clientY - startY;
      if (dy > 0) card.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: true });

    handle.addEventListener('touchend', function (e) {
      dragging = false;
      card.style.transition = '';
      var dy = e.changedTouches[0].clientY - startY;
      if (dy > 80 && detailOpen) {
        document.getElementById('detailToggle').click();
      }
      card.style.transform = '';
    });
  })();

  /* ── Boot ── */
  loadNewRoute(false);
  window.addEventListener('resize', positionLayerPill);
})();

/* ── Layer toggle (global, called by HTML onclick) ── */
function switchLayer(name) {
  if (!window._tileLayers || window._activeLayer === name) return;
  var m = window._tileLayers[window._activeLayer]._map;
  if (!m) return;
  window._tileLayers[window._activeLayer].remove();
  window._tileLayers[name].addTo(m);
  window._activeLayer = name;
  document.getElementById('btnOsm').classList.toggle('active',   name === 'osm');
  document.getElementById('btnSwiss').classList.toggle('active', name === 'swiss');
}
