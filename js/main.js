document.addEventListener('DOMContentLoaded', () => {
  // ===== Navbar reveal on load
  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');

  // show navbar
  requestAnimationFrame(() => navbar?.classList.add('visible'));

  // ===== Mobile menu toggle (+ lock scroll)
  const setMenu = (open) => {
    if (!links || !burger || !navbar) return;
    links.classList.toggle('open', open);
    navbar.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  burger?.addEventListener('click', () => {
    const open = !links?.classList.contains('open');
    setMenu(open);
  });

  // Close on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setMenu(false));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar || !links) return;
    const clickedInside = navbar.contains(e.target);
    if (!clickedInside && links.classList.contains('open')) setMenu(false);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links?.classList.contains('open')) setMenu(false);
  });

  // Remove "open" when resizing to desktop
  const mql = window.matchMedia('(min-width: 901px)');
  const handleResize = () => { if (mql.matches) setMenu(false); };
  mql.addEventListener?.('change', handleResize);
  window.addEventListener('resize', handleResize);

  // ===== Add shadow when scrolled
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.style.boxShadow = window.scrollY > 4 ? 'var(--shadow, 0 6px 18px rgba(0,0,0,.06))' : 'none';
  });

  // ===== IntersectionObserver for reveals
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.reveal, .slide-right').forEach(el => io.observe(el));

  // ===== Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ===== Gallery lazy reveal
  const pictures = document.querySelectorAll('.gallery-grid picture');
  const galleryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  pictures.forEach(p => galleryObserver.observe(p));
});
