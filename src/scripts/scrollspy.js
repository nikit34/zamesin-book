// Highlight the current sub-heading in the middle column as the reader scrolls.

export function initScrollSpy({ proseEl, subnavEl }) {
  if (!proseEl || !subnavEl) return;

  const headings = [...proseEl.querySelectorAll('h2[id], h3[id]')];
  if (headings.length === 0) return;

  const linkByHash = new Map(
    [...subnavEl.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a])
  );

  let activeSlug = null;

  function setActive(slug) {
    if (slug === activeSlug) return;
    activeSlug = slug;
    subnavEl.querySelectorAll('a').forEach((a) => {
      a.classList.toggle('is-current', a.getAttribute('href') === `#${slug}`);
    });
  }

  // Use scroll math directly — IntersectionObserver works well for "is on screen?"
  // but the brief calls for "current section" which is the last heading whose top
  // has crossed the reading line (~28% from the top of the viewport).
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const line = window.scrollY + window.innerHeight * 0.28;
      let current = headings[0];
      for (const h of headings) {
        if (h.offsetTop <= line) current = h;
        else break;
      }
      if (current) setActive(current.id);
      ticking = false;
    });
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll on click + update URL hash without triggering a jump.
  subnavEl.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const slug = a.getAttribute('href').slice(1);
    const target = document.getElementById(slug);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${slug}`);
    }
  });
}
