export function initToc({ openButtons, closeButton, dialogEl, contentsEl, resultsEl, inputEl, catalog, currentSlug }) {
  if (!dialogEl) return;

  renderContents(contentsEl, catalog, currentSlug);

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog();
    });
  });

  closeButton?.addEventListener('click', () => closeDialog());

  // Click on backdrop closes
  dialogEl.addEventListener('click', (e) => {
    if (e.target === dialogEl) closeDialog();
  });

  // Keyboard: ⌘K / Ctrl+K + ⌘/ open; Esc closes; ⌘+. closes.
  window.addEventListener('keydown', (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openDialog(true);
      return;
    }
    if (meta && e.key === '/') {
      e.preventDefault();
      openDialog(true);
      return;
    }
    if (e.key === 'Escape' && dialogEl.open) {
      e.preventDefault();
      closeDialog();
    }
  });

  function openDialog(focusSearch = false) {
    if (!dialogEl.open) {
      dialogEl.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (focusSearch) {
      requestAnimationFrame(() => inputEl?.focus());
    }
    scrollActiveIntoView();
  }

  function closeDialog() {
    if (dialogEl.open) dialogEl.close();
    document.body.style.overflow = '';
    resultsEl.hidden = true;
    contentsEl.hidden = false;
    inputEl.value = '';
  }

  function scrollActiveIntoView() {
    const active = contentsEl.querySelector('.toc__chapter-item.is-active');
    if (active) {
      active.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }
}

function renderContents(contentsEl, catalog, currentSlug) {
  if (!contentsEl) return;
  const book = catalog.books[0];
  contentsEl.innerHTML = book.parts
    .map(
      (part) => `
      <section class="toc__part">
        <header class="toc__part-head">
          <h3 class="toc__part-title">${escape(part.title)}</h3>
          <span class="toc__part-num">Part ${pad(part.num)}</span>
        </header>
        <ol class="toc__chapter-list">
          ${part.chapters
            .map(
              (ch) => `
              <li class="toc__chapter-item ${ch.slug === currentSlug ? 'is-active' : ''}">
                <a href="${chapterHref(book, ch)}" data-slug="${ch.slug}">
                  <span class="toc__chapter-num">${pad(ch.num)}</span>
                  <span class="toc__chapter-title">${escape(ch.title)}</span>
                  <span class="toc__chapter-status" data-state="${ch.state}">${stateLabel(ch.state, ch.slug === currentSlug)}</span>
                </a>
              </li>
            `
            )
            .join('')}
        </ol>
      </section>
    `
    )
    .join('');
}

function chapterHref(book, ch) {
  return `/books/${book.slug}/${ch.slug}`;
}
function pad(n) {
  return String(n).padStart(2, '0');
}
function stateLabel(state, isActive) {
  if (isActive) return 'Reading now';
  if (state === 'draft') return 'In progress';
  if (state === 'next') return 'Up next';
  if (state === 'read') return 'Read';
  return '';
}
function escape(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
