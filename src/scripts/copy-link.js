export function initCopyLink({ buttonEl }) {
  if (!buttonEl) return;
  const labelEl = buttonEl.querySelector('.action__label');
  const defaultLabel = labelEl?.dataset.defaultLabel || labelEl?.textContent || 'Copy link';

  buttonEl.addEventListener('click', async () => {
    const url = canonicalUrl();
    try {
      await navigator.clipboard.writeText(url);
      flash(buttonEl, labelEl, 'Copied');
    } catch (err) {
      // Fallback: select + execCommand
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        flash(buttonEl, labelEl, 'Copied');
      } catch (e) {
        flash(buttonEl, labelEl, 'Copy failed', true);
      }
      ta.remove();
    }
  });

  function flash(btn, lbl, text, failed = false) {
    if (lbl) lbl.textContent = text;
    btn.setAttribute('data-copied', failed ? 'failed' : 'true');
    setTimeout(() => {
      if (lbl) lbl.textContent = defaultLabel;
      btn.removeAttribute('data-copied');
    }, 1600);
  }

  function canonicalUrl() {
    const u = new URL(window.location.href);
    u.hash = '';
    return u.toString();
  }
}
