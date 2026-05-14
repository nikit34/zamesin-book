// Persist scroll progress in the URL, PCA-style — `?progress=8.74` — so links can
// be shared at a specific point in the chapter and the page restores them on reload.

export function restoreProgress() {
  const url = new URL(window.location.href);
  const progress = url.searchParams.get('progress');
  if (progress != null) {
    const pct = clamp01(parseFloat(progress) / 100);
    requestAnimationFrame(() => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: total * pct, behavior: 'instant' });
    });
  }

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total <= 0) {
          ticking = false;
          return;
        }
        const pct = (window.scrollY / total) * 100;
        const next = pct.toFixed(2);
        const cur = new URL(window.location.href);
        if (cur.searchParams.get('progress') !== next) {
          cur.searchParams.set('progress', next);
          history.replaceState(null, '', cur.toString());
        }
        ticking = false;
      });
    },
    { passive: true }
  );
}

function clamp01(n) {
  if (!isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
