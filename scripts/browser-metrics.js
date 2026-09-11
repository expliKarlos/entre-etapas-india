/* Loaded only by the local server with QA_METRICS=1. Never part of the export. */
(() => {
  const values = {
    LCP: null,
    CLS: 0,
    maxInteraction: null,
    DOMContentLoaded: null,
    requests: 0,
    transferredKB: 0,
  };
  const panel = document.createElement('details');
  panel.id = 'qa-metrics';
  panel.style.cssText =
    'position:fixed;right:8px;bottom:85px;z-index:90;background:#fff;color:#000;padding:8px;font:12px monospace;max-width:240px;border:1px solid #000';
  const label = document.createElement('summary');
  label.textContent = 'Mediciones de prueba';
  const output = document.createElement('pre');
  output.style.whiteSpace = 'pre-wrap';
  panel.append(label, output);
  document.body.append(panel);
  function publish() {
    const n = performance.getEntriesByType('navigation')[0];
    values.DOMContentLoaded = n ? Math.round(n.domContentLoadedEventEnd) : null;
    const resources = performance.getEntriesByType('resource');
    values.requests = resources.length;
    values.transferredKB = Math.round(resources.reduce((sum, r) => sum + r.transferSize, 0) / 1024);
    output.textContent = JSON.stringify(values, null, 2);
  }
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      values.LCP = Math.round(entries[entries.length - 1].startTime);
      publish();
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}
  try {
    let start = 0,
      last = 0,
      total = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (e.hadRecentInput) continue;
        if (e.startTime - last > 1000 || e.startTime - start > 5000) {
          start = e.startTime;
          total = 0;
        }
        total += e.value;
        last = e.startTime;
        values.CLS = Math.round(Math.max(values.CLS, total) * 10000) / 10000;
      }
      publish();
    }).observe({ type: 'layout-shift', buffered: true });
  } catch {}
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (e.interactionId)
          values.maxInteraction = Math.max(values.maxInteraction || 0, e.duration);
      publish();
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
  } catch {}
  window.addEventListener('load', publish);
  setInterval(publish, 1000);
  publish();
})();
