(() => {
  const languageButtons = document.querySelectorAll('[data-lang]');
  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-es]').forEach(element => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll('[data-alt-en][data-alt-es]').forEach(element => {
      element.alt = language === 'es' ? element.dataset.altEs : element.dataset.altEn;
    });
    document.querySelectorAll('[data-label-en][data-label-es]').forEach(element => {
      element.setAttribute('aria-label', language === 'es' ? element.dataset.labelEs : element.dataset.labelEn);
    });
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    const title = document.querySelector('title[data-en]');
    if (title) document.querySelector('[property="og:title"]')?.setAttribute('content', title.textContent);
    const description = document.querySelector('meta[name="description"][data-en]');
    if (description) {
      description.content = description.dataset[language];
      document.querySelector('[property="og:description"]')?.setAttribute('content', description.content);
    }
    try { localStorage.setItem('clr91dev-site-language', language); } catch (_) {}
  }
  let initialLanguage = navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
  try {
    const saved = localStorage.getItem('clr91dev-site-language');
    if (saved === 'en' || saved === 'es') initialLanguage = saved;
  } catch (_) {}
  applyLanguage(initialLanguage);
  languageButtons.forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));

  const menuButton = document.querySelector('.menu-toggle');
  const menuPanel = document.querySelector('.menu-panel');
  function closeMenu(returnFocus = false) {
    if (!menuButton || !menuPanel) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuPanel.hidden = true;
    document.body.classList.remove('menu-open');
    if (returnFocus) menuButton.focus();
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuPanel.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  });
  menuPanel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header, .menu-panel')) closeMenu();
  });

  const rail = document.querySelector('.project-rail');
  if (!rail) return;
  const cards = [...rail.querySelectorAll('.project-card')];
  const previous = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const count = document.querySelector('.gallery-count');
  const progress = document.querySelector('.gallery-progress span');
  progress.style.width = `${100 / cards.length}%`;
  let current = 0;
  function updateGallery() {
    const center = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    current = cards.reduce((best, card, index) => {
      const rect = card.getBoundingClientRect();
      const bestRect = cards[best].getBoundingClientRect();
      return Math.abs(rect.left + rect.width / 2 - center) < Math.abs(bestRect.left + bestRect.width / 2 - center) ? index : best;
    }, 0);
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    progress.style.left = `${current * 100 / cards.length}%`;
  }
  function move(direction) {
    const target = cards[Math.max(0, Math.min(cards.length - 1, current + direction))];
    const padding = parseFloat(getComputedStyle(rail).paddingLeft);
    rail.scrollTo({left: rail.scrollLeft + target.getBoundingClientRect().left - rail.getBoundingClientRect().left - padding,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  rail.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  rail.addEventListener('scroll', updateGallery, {passive: true});
  window.addEventListener('resize', updateGallery);
  updateGallery();
})();
