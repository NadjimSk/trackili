document.addEventListener('DOMContentLoaded', () => {
  // Navbar reveal on load
  const navbar = document.querySelector('.navbar');
  requestAnimationFrame(() => navbar?.classList.add('visible'));

  // Mobile menu toggle
  const burger = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => {
    links?.classList.toggle('open');
    burger.setAttribute('aria-expanded', links?.classList.contains('open') ? 'true' : 'false');
  });

  // Add shadow when scrolled
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const now = window.scrollY;
    if (navbar) navbar.style.boxShadow = now > 4 ? 'var(--shadow)' : 'none';
    lastY = now;
  });

  // IntersectionObserver for reveals
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  document.querySelectorAll('.reveal, .slide-right').forEach(el => io.observe(el));

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Gallery
  const pictures = document.querySelectorAll('.gallery-grid picture');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  pictures.forEach(picture => {
    observer.observe(picture);
  });
});