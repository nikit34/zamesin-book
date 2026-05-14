// Turn the markdown-rendered chapter into the final DOM the styles want.
// - Lift image titles into visible captions for single-image paragraphs.
// - Inside gallery containers, render the image title as a small caption beneath each image.
// - Add data-section attributes to h2/h3 for the scroll-spy.

export function decorateChapter(prose) {
  if (!prose) return;

  // 1. Single-image paragraphs: inject a caption from the img title attribute.
  prose.querySelectorAll('p').forEach((p) => {
    const children = p.children;
    const onlyChild = children.length === 1 ? children[0] : null;
    if (onlyChild && onlyChild.tagName === 'IMG' && onlyChild.title) {
      p.setAttribute('data-caption', onlyChild.title);
      onlyChild.removeAttribute('title');
    }
  });

  // 2. Inside galleries, replace each <p>...<img>...<img>...</p> with one figure per image.
  prose.querySelectorAll('.gallery .gallery__track').forEach((track) => {
    [...track.children].forEach((node) => {
      if (node.tagName !== 'P') return;
      const imgs = [...node.querySelectorAll('img')];
      if (!imgs.length) return;
      const figures = imgs.map((img) => {
        const figure = document.createElement('figure');
        figure.className = 'gallery__item';
        const fresh = img.cloneNode(true);
        fresh.removeAttribute('title');
        figure.appendChild(fresh);
        const caption = img.title || img.getAttribute('alt');
        if (caption) {
          const cap = document.createElement('figcaption');
          cap.textContent = caption;
          figure.appendChild(cap);
        }
        return figure;
      });
      node.replaceWith(...figures);
    });
  });

  // 3. Mark headings with their slug for scroll-spy. markdown-it-anchor already added id+slug.
  prose.querySelectorAll('h2, h3').forEach((h) => {
    h.setAttribute('data-section', h.id);
  });

  // 4. Pull-quote auto-detection: a top-level blockquote whose only child is a <p>
  //    starting with <strong> and short ( ≤140 chars ) is treated as a pull-quote.
  prose.querySelectorAll(':scope > blockquote').forEach((q) => {
    if (q.classList.contains('skeptic')) return;
    if (q.children.length !== 1) return;
    const p = q.firstElementChild;
    if (p.tagName !== 'P') return;
    const first = p.firstChild;
    if (!first || first.nodeType !== Node.ELEMENT_NODE) return;
    if (first.tagName !== 'STRONG') return;
    if (p.textContent.length > 240) return;
    q.classList.add('is-pullquote');
  });

  // 5. The scholar quote uses <aside class="scholar-quote">. The data-source attribute
  //    is already set in the markdown.  Nothing else to do here.
}
