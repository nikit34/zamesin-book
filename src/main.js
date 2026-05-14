import { initToc } from './scripts/toc.js';
import { initSearch } from './scripts/search.js';
import { initScrollSpy } from './scripts/scrollspy.js';
import { initCopyLink } from './scripts/copy-link.js';
import { decorateChapter } from './scripts/decorate-chapter.js';
import { restoreProgress } from './scripts/progress.js';
import { catalog } from './scripts/catalog.js';

const chapterMetaEl = document.getElementById('chapter-meta');
const chapterMeta = chapterMetaEl ? JSON.parse(chapterMetaEl.textContent) : { meta: {}, toc: [] };

document.documentElement.style.setProperty('--reading-now', `"${chapterMeta.meta?.title || ''}"`);

// 1. Decorate the rendered chapter (captions from img title, gallery wrappers, etc.)
decorateChapter(document.querySelector('.prose'));

// 2. Build the in-chapter sub-nav from the TOC headings
buildContextSubnav(chapterMeta.toc);

// 3. Wire interactive modules
initScrollSpy({
  proseEl: document.querySelector('.prose'),
  subnavEl: document.getElementById('context-subnav'),
});

initCopyLink({
  buttonEl: document.getElementById('copy-link'),
});

initToc({
  openButtons: [
    document.getElementById('open-toc'),
    document.getElementById('fab-toc'),
    document.getElementById('rail-search'),
  ].filter(Boolean),
  closeButton: document.getElementById('close-toc'),
  dialogEl: document.getElementById('toc-dialog'),
  contentsEl: document.getElementById('toc-contents'),
  resultsEl: document.getElementById('toc-results'),
  inputEl: document.getElementById('toc-search-input'),
  catalog,
  currentSlug: chapterMeta.meta?.slug,
});

initSearch({
  inputEl: document.getElementById('toc-search-input'),
  resultsEl: document.getElementById('toc-results'),
  contentsEl: document.getElementById('toc-contents'),
  catalog,
});

restoreProgress();

// no-op handler for inert nav items so the brief's “rendered but non-functional” promise is honored
document.querySelectorAll('[data-noop]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    flashNoop(el);
  });
});

function flashNoop(el) {
  el.animate(
    [{ opacity: 1 }, { opacity: 0.4 }, { opacity: 1 }],
    { duration: 280, easing: 'cubic-bezier(0.2,0.7,0.2,1)' }
  );
}

function buildContextSubnav(toc) {
  const root = document.getElementById('context-subnav');
  if (!root || !Array.isArray(toc)) return;
  const items = toc.filter((h) => h.level === 2 || h.level === 3);
  root.innerHTML = items
    .map(
      (h) =>
        `<a href="#${h.slug}" data-level="${h.level}" data-slug="${h.slug}">${escapeHtml(h.text)}</a>`
    )
    .join('');
}

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
