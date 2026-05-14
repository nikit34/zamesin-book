// Click any image inside .prose to zoom. If the image is in a gallery, ←/→
// navigate between sibling images. Esc / click on the backdrop / X closes.

export function initLightbox({ proseEl }) {
  if (!proseEl) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Image lightbox');
  dialog.innerHTML = `
    <button class="lightbox__close" aria-label="Close">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image" hidden>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 6 9 12l6 6" />
      </svg>
    </button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next image" hidden>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </button>
    <figure class="lightbox__stage">
      <img class="lightbox__img" alt="" />
      <figcaption class="lightbox__caption"></figcaption>
      <div class="lightbox__counter" aria-hidden="true"></div>
    </figure>
  `;
  document.body.appendChild(dialog);

  const imgEl = dialog.querySelector('.lightbox__img');
  const captionEl = dialog.querySelector('.lightbox__caption');
  const counterEl = dialog.querySelector('.lightbox__counter');
  const closeBtn = dialog.querySelector('.lightbox__close');
  const prevBtn = dialog.querySelector('.lightbox__nav--prev');
  const nextBtn = dialog.querySelector('.lightbox__nav--next');

  let group = []; // current sibling list
  let index = 0;

  // Click on prose images opens lightbox. Decorator left captions in figcaptions
  // or in <p data-caption=...>; gather them as needed.
  proseEl.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img || !proseEl.contains(img)) return;
    e.preventDefault();
    open(img);
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(+1));

  dialog.addEventListener('click', (e) => {
    // click directly on the dialog (i.e. on backdrop area) closes
    if (e.target === dialog) close();
  });

  window.addEventListener('keydown', (e) => {
    if (!dialog.open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(+1);
    }
  });

  function open(img) {
    const galleryTrack = img.closest('.gallery__track');
    if (galleryTrack) {
      group = [...galleryTrack.querySelectorAll('img')];
    } else {
      group = [img];
    }
    index = group.indexOf(img);
    render();
    if (!dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
  }

  function close() {
    if (dialog.open) dialog.close();
    document.body.style.overflow = '';
  }

  function step(delta) {
    if (group.length <= 1) return;
    index = (index + delta + group.length) % group.length;
    render();
  }

  function render() {
    const src = group[index];
    imgEl.src = src.src;
    imgEl.alt = src.alt || '';

    const captionText = readCaption(src);
    if (captionText) {
      captionEl.textContent = captionText;
      captionEl.hidden = false;
    } else {
      captionEl.hidden = true;
    }

    const many = group.length > 1;
    prevBtn.hidden = !many;
    nextBtn.hidden = !many;
    if (many) {
      counterEl.textContent = `${pad(index + 1)} / ${pad(group.length)}`;
      counterEl.hidden = false;
    } else {
      counterEl.hidden = true;
    }
  }

  function readCaption(img) {
    // 1. figcaption inside the same figure (gallery item)
    const figure = img.closest('figure');
    if (figure) {
      const cap = figure.querySelector(':scope > figcaption');
      if (cap && cap.textContent.trim()) return cap.textContent.trim();
    }
    // 2. data-caption set on the wrapping <p> by decorate-chapter.js
    const p = img.closest('p[data-caption]');
    if (p) return p.getAttribute('data-caption');
    // 3. fall back to alt
    return img.alt || '';
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }
}
