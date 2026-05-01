// ===== OPPO Design System v2 - Shared JS =====
(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const backTop = document.getElementById('backTop');
  const sections = document.querySelectorAll('.section[id]');
  const tocLinks = document.querySelectorAll('.toc-sidebar a');

  // Scroll handler: nav shadow + back-to-top + TOC active
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (nav) nav.classList.toggle('scrolled', y > 10);
        if (backTop) backTop.classList.toggle('show', y > 300);
        if (sections.length && tocLinks.length) {
          let current = '';
          sections.forEach(s => { if (y >= s.offsetTop - 100) current = s.id; });
          tocLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll-reveal via IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();
