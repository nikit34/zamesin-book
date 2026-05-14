import MiniSearch from 'minisearch';
import { buildSearchDocs } from './catalog.js';

export function initSearch({ inputEl, resultsEl, contentsEl, catalog }) {
  if (!inputEl || !resultsEl) return;

  const docs = buildSearchDocs(catalog);
  const mini = new MiniSearch({
    fields: ['chapterTitle', 'partTitle', 'snippet', 'bookTitle'],
    storeFields: ['bookSlug', 'bookTitle', 'partNum', 'partTitle', 'chapterNum', 'chapterSlug', 'chapterTitle', 'snippet', 'state'],
    searchOptions: {
      boost: { chapterTitle: 3, snippet: 1.5 },
      prefix: true,
      fuzzy: 0.2,
    },
  });
  mini.addAll(docs);

  let focusIdx = 0;

  inputEl.addEventListener('input', () => {
    const q = inputEl.value.trim();
    if (!q) {
      resultsEl.hidden = true;
      contentsEl.hidden = false;
      resultsEl.innerHTML = '';
      return;
    }
    contentsEl.hidden = true;
    resultsEl.hidden = false;
    const results = mini.search(q).slice(0, 20);
    if (!results.length) {
      resultsEl.innerHTML = `<p class="toc__results-empty">No matches for "${escape(q)}". Try a different query — fuzzy and prefix matching are on.</p>`;
      return;
    }
    focusIdx = 0;
    resultsEl.innerHTML = results
      .map(
        (r, i) => `
          <a class="result ${i === focusIdx ? 'is-focused' : ''}" href="/books/${r.bookSlug}/${r.chapterSlug}">
            <div class="result__meta">
              <strong>${escape(r.bookTitle)}</strong>
              <span>Part ${pad(r.partNum)} · Ch ${pad(r.chapterNum)}</span>
              ${r.state === 'draft' ? '<span>In progress</span>' : ''}
            </div>
            <div class="result__title">${highlight(r.chapterTitle, q)}</div>
            ${r.snippet ? `<div class="result__snippet">${highlight(r.snippet, q)}</div>` : ''}
          </a>
        `
      )
      .join('');
  });

  inputEl.addEventListener('keydown', (e) => {
    const items = resultsEl.querySelectorAll('.result');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusIdx = Math.min(focusIdx + 1, items.length - 1);
      updateFocus(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusIdx = Math.max(focusIdx - 1, 0);
      updateFocus(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      items[focusIdx]?.click();
    }
  });

  function updateFocus(items) {
    items.forEach((it, i) => it.classList.toggle('is-focused', i === focusIdx));
    items[focusIdx]?.scrollIntoView({ block: 'nearest' });
  }

  function highlight(text, q) {
    const escaped = escape(text);
    const re = new RegExp(`(${escapeRegex(q)})`, 'gi');
    return escaped.replace(re, '<mark>$1</mark>');
  }
  function escape(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function pad(n) {
    return String(n).padStart(2, '0');
  }
}
