// Shared UI behavior for the static knowledge base.
(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const backTop = document.getElementById('backTop');
  const sections = document.querySelectorAll('.section[id]');
  const tocLinks = document.querySelectorAll('.toc-sidebar a');

  function closeMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;

      if (nav) nav.classList.toggle('scrolled', y > 8);
      if (backTop) backTop.classList.toggle('show', y > 360);

      if (sections.length && tocLinks.length) {
        let current = '';
        sections.forEach((section) => {
          if (y >= section.offsetTop - 120) current = section.id;
        });

        tocLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
      }

      ticking = false;
    });
  }, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }
})();
