(function() {
  'use strict';

  function refreshIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  var map = null;
  var userMarker = null;
  var watchId = null;
  var isTracking = false;
  var autoCenter = true;
  var viewMode = 'follow';
  var routePoints = [];
  var totalRouteMeters = 0;
  var currentProposal = null;
  var lastUserPos = null;
  var lastHeading = null;
  var currentLayerId = 'osm';

  var TILE_SOURCES = {
    osm:   { tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], attribution: '© OpenStreetMap', maxzoom: 19 },
    swiss: { tiles: ['https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg'], attribution: '© swisstopo', maxzoom: 18 }
  };

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
    _toastEl.style.background = type === 'error' ? '#ef4444' : '#22c55e';
    _toastEl.style.color = '#fff';
    _toastEl.textContent = msg;
    clearTimeout(_toastTimer);
    requestAnimationFrame(function() {
      _toastEl.style.transform = 'translateY(0)';
      _toastEl.style.opacity = '1';
    });
    _toastTimer = setTimeout(function() {
      _toastEl.style.transform = 'translateY(-100%)';
      _toastEl.style.opacity = '0';
    }, 4000);
  }

  function distM(a, b) {
    var R = 6371000, dLat = (b.lat-a.lat)*Math.PI/180, dLng = (b.lng-a.lng)*Math.PI/180;
    var s = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1-s));
  }

  function routeProgress(userPos) {
    if (!routePoints.length) return { nearestIdx: 0, distFromStart: 0, distToEnd: 0, fraction: 0, offRoute: 999 };
    var bestIdx = 0, bestDist = Infinity;
    for (var i = 0; i < routePoints.length; i++) {
      var d = distM(userPos, routePoints[i]);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    }
    var fromStart = 0;
    for (var j = 1; j <= bestIdx; j++) fromStart += distM(routePoints[j-1], routePoints[j]);
    return { nearestIdx: bestIdx, distFromStart: fromStart, distToEnd: Math.max(0, totalRouteMeters - fromStart), fraction: fromStart / (totalRouteMeters || 1), offRoute: bestDist };
  }

  function updatePanel(prog) {
    var rKm = prog.distToEnd / 1000, dKm = prog.distFromStart / 1000;
    document.getElementById('distRemain').textContent = rKm < 1 ? Math.round(rKm*1000) + 'm' : rKm.toFixed(1) + 'km';
    document.getElementById('distDone').textContent = dKm < 1 ? Math.round(dKm*1000) + 'm' : dKm.toFixed(1) + 'km';
    document.getElementById('timeRemain').textContent = Math.round(prog.distToEnd / 75);
    document.getElementById('progressFill').style.width = Math.min(100, Math.round(prog.fraction * 100)) + '%';
  }

  function positionControls() {
    var card = document.getElementById('bottomCard');
    var cardH = card.offsetHeight;
    var navH = 60;
    var bottom = cardH + navH + 12;
    document.getElementById('mapControls').style.bottom = bottom + 'px';
    document.getElementById('layerPill').style.bottom = bottom + 'px';
  }

  function makeStyle(layerId) {
    var src = TILE_SOURCES[layerId];
    return {
      version: 8,
      sources: { 'raster-tiles': { type: 'raster', tiles: src.tiles, tileSize: 256, attribution: src.attribution, maxzoom: src.maxzoom } },
      layers: [{ id: 'raster-layer', type: 'raster', source: 'raster-tiles' }]
    };
  }

  function bearing(a, b) {
    var dLng = (b.lng - a.lng) * Math.PI / 180;
    var lat1 = a.lat * Math.PI / 180, lat2 = b.lat * Math.PI / 180;
    var y = Math.sin(dLng) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }

  function renderRoute(proposal) {
    currentProposal = proposal;
    document.getElementById('loadingOverlay').classList.add('hidden');
    document.getElementById('noRouteMsg').style.display = 'none';
    document.getElementById('routeInfo').style.display = 'block';
    document.getElementById('mapControls').style.display = 'flex';
    document.getElementById('layerPill').style.display = 'flex';

    document.getElementById('destName').textContent = proposal.food.name || 'Destinazione';
    document.getElementById('destCuisine').textContent = proposal.food.cuisine || '';

    routePoints = proposal.route;
    totalRouteMeters = 0;
    for (var i = 1; i < routePoints.length; i++) totalRouteMeters += distM(routePoints[i-1], routePoints[i]);

    var lats = routePoints.map(function(p){return p.lat;}), lngs = routePoints.map(function(p){return p.lng;});
    var sw = [Math.min.apply(null, lngs), Math.min.apply(null, lats)];
    var ne = [Math.max.apply(null, lngs), Math.max.apply(null, lats)];

    if (map) { map.remove(); map = null; userMarker = null; }

    map = new maplibregl.Map({
      container: 'map-fullscreen',
      style: makeStyle(currentLayerId),
      bounds: [sw, ne],
      fitBoundsOptions: {
        padding: { top: 80, bottom: document.getElementById('bottomCard').offsetHeight + 80, left: 30, right: 30 }
      },
      pitch: 55,
      maxPitch: 70,
      attributionControl: false
    });
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    map.on('load', function() {
      var coords = routePoints.map(function(p) { return [p.lng, p.lat]; });
      map.addSource('route', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords } } });
      map.addLayer({ id: 'route-glow', type: 'line', source: 'route', paint: { 'line-color': '#22c55e', 'line-width': 12, 'line-opacity': 0.2, 'line-blur': 6 } });
      map.addLayer({ id: 'route-line', type: 'line', source: 'route', paint: { 'line-color': '#22c55e', 'line-width': 4, 'line-opacity': 0.95 }, layout: { 'line-cap': 'round', 'line-join': 'round' } });

      var startEl = document.createElement('div');
      startEl.innerHTML = '<div style="background:#34D399;color:#052e16;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:800;box-shadow:0 2px 12px rgba(0,0,0,0.5);border:2px solid #fff;white-space:nowrap">Partenza</div>';
      new maplibregl.Marker({ element: startEl, anchor: 'bottom' }).setLngLat([routePoints[0].lng, routePoints[0].lat]).addTo(map);

      if (proposal.food && proposal.food.lat) {
        var turnEl = document.createElement('div');
        turnEl.innerHTML = '<div style="background:#f59e0b;color:#451a03;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:800;box-shadow:0 2px 12px rgba(0,0,0,0.5);border:2px solid #fff;white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis">' + (proposal.food.name || 'Destinazione') + '</div>';
        new maplibregl.Marker({ element: turnEl, anchor: 'bottom' }).setLngLat([proposal.food.lng, proposal.food.lat]).addTo(map);
      }
    });

    map.on('dragstart', function() {
      autoCenter = false;
      document.getElementById('btnCenter').classList.remove('active');
      document.getElementById('btnCenter2').classList.remove('active');
    });

    updatePanel({ distToEnd: totalRouteMeters, distFromStart: 0, fraction: 0 });
    positionControls();
    setTimeout(function() { startTracking(); setView('follow'); }, 400);
  }

  function setView(mode) {
    viewMode = mode;
    document.querySelectorAll('.view-pill').forEach(function(el) { el.classList.toggle('active', el.dataset.view === mode); });
    if (!map) return;
    if (mode === 'top')    map.easeTo({ pitch: 0, bearing: 0, duration: 800 });
    else if (mode === '3d') map.easeTo({ pitch: 55, duration: 800 });
    else if (mode === 'follow') {
      map.easeTo({ pitch: 60, zoom: 17, duration: 800 });
      autoCenter = true;
    }
  }

  function startTracking() {
    if (!navigator.geolocation) {
      showToast('Segnale GPS non disponibile', 'error');
      return;
    }
    isTracking = true;
    autoCenter = true;
    document.getElementById('btnStart').innerHTML = '<i data-lucide="square" class="lucide"></i>';
    document.getElementById('btnStart').classList.add('active');
    document.getElementById('btnStart2').innerHTML = '<i data-lucide="square" class="lucide"></i> Stop';
    refreshIcons();
    document.getElementById('btnCenter').classList.add('active');
    document.getElementById('liveDot').style.display = 'inline-block';
    document.getElementById('livePanel').style.display = 'flex';
    document.getElementById('progressWrap').style.display = 'block';
    document.getElementById('viewPills').style.display = 'flex';
    positionControls();

    watchId = navigator.geolocation.watchPosition(function(pos) {
      var userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      if (!userMarker) {
        var el = document.createElement('div');
        el.className = 'user-dot-outer';
        el.innerHTML = '<div class="user-dot-inner"></div>';
        userMarker = new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat([userPos.lng, userPos.lat]).addTo(map);
      } else {
        userMarker.setLngLat([userPos.lng, userPos.lat]);
      }
      var prog = routeProgress(userPos);
      updatePanel(prog);
      if (lastUserPos && distM(lastUserPos, userPos) > 3) lastHeading = bearing(lastUserPos, userPos);
      if (autoCenter && map) {
        var opts = { center: [userPos.lng, userPos.lat], duration: 600 };
        if (viewMode === 'follow' && lastHeading !== null) { opts.bearing = lastHeading; opts.pitch = 60; opts.zoom = Math.max(map.getZoom(), 17); }
        map.easeTo(opts);
      }
      lastUserPos = userPos;
    }, function(err) {
      console.warn('GPS:', err.message);
      showToast('Segnale GPS non disponibile', 'error');
    }, { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 });
  }

  function stopTracking() {
    if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
    isTracking = false;
    document.getElementById('btnStart').innerHTML = '<i data-lucide="play" class="lucide"></i>';
    document.getElementById('btnStart').classList.remove('active');
    document.getElementById('btnStart2').innerHTML = '<i data-lucide="play" class="lucide"></i> Naviga';
    refreshIcons();
    document.getElementById('liveDot').style.display = 'none';
    document.getElementById('livePanel').style.display = 'none';
    document.getElementById('progressWrap').style.display = 'none';
    document.getElementById('viewPills').style.display = 'none';
    if (userMarker) { userMarker.remove(); userMarker = null; }
    lastUserPos = null; lastHeading = null;
    setView('top');
    positionControls();
  }

  function toggleTracking() {
    if (isTracking) stopTracking(); else startTracking();
  }

  function loadRoute() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
    try {
      var proposal = LBW.Store.get('lbw_today', null);
      if (!proposal || !proposal.route || !proposal.route.length) {
        document.getElementById('loadingOverlay').classList.add('hidden');
        document.getElementById('noRouteMsg').style.display = 'block';
        return;
      }
      renderRoute(proposal);
    } catch(e) {
      console.error(e);
      document.getElementById('loadingOverlay').classList.add('hidden');
      document.getElementById('noRouteMsg').style.display = 'block';
      showToast('Errore nel caricamento del percorso', 'error');
    }
  }

  // Events
  document.getElementById('btnStart').addEventListener('click', toggleTracking);
  document.getElementById('btnStart2').addEventListener('click', toggleTracking);

  function centerOnUser() {
    autoCenter = !autoCenter;
    document.getElementById('btnCenter').classList.toggle('active', autoCenter);
    document.getElementById('btnCenter2').classList.toggle('active', autoCenter);
    if (autoCenter && lastUserPos && map) map.easeTo({ center: [lastUserPos.lng, lastUserPos.lat], zoom: Math.max(map.getZoom(), 16), duration: 600 });
  }
  document.getElementById('btnCenter').addEventListener('click', centerOnUser);
  document.getElementById('btnCenter2').addEventListener('click', centerOnUser);

  // Layer switch
  document.querySelectorAll('.map-layer-btn').forEach(function(el) {
    el.addEventListener('click', function() {
      var lid = this.dataset.layer || this.id.replace('layer','').toLowerCase();
      if (lid === currentLayerId || !map) return;
      var center = map.getCenter(), zoom = map.getZoom(), pitch = map.getPitch(), brng = map.getBearing();
      map.setStyle(makeStyle(lid));
      currentLayerId = lid;
      document.querySelectorAll('.map-layer-btn').forEach(function(b) { b.classList.toggle('active', (b.dataset.layer || b.id.replace('layer','').toLowerCase()) === lid); });
      map.once('style.load', function() {
        if (!currentProposal) return;
        var coords = routePoints.map(function(p) { return [p.lng, p.lat]; });
        map.addSource('route', { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords } } });
        map.addLayer({ id: 'route-glow', type: 'line', source: 'route', paint: { 'line-color': '#22c55e', 'line-width': 12, 'line-opacity': 0.2, 'line-blur': 6 } });
        map.addLayer({ id: 'route-line', type: 'line', source: 'route', paint: { 'line-color': '#22c55e', 'line-width': 4, 'line-opacity': 0.95 }, layout: { 'line-cap': 'round', 'line-join': 'round' } });
        map.jumpTo({ center: center, zoom: zoom, pitch: pitch, bearing: brng });
      });
    });
  });

  // View mode
  document.querySelectorAll('.view-pill').forEach(function(el) {
    el.addEventListener('click', function() { setView(this.dataset.view); });
  });

  window.addEventListener('resize', positionControls);

  loadRoute();
})();
