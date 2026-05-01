// ===== Shared JS for all pages =====

// Back to top button visibility
window.addEventListener('scroll', () => {
  const backTop = document.getElementById('backTop');
  if (backTop) {
    backTop.classList.toggle('show', window.scrollY > 300);
  }

  // TOC active link highlighting (for pages with sidebar)
  const sections = document.querySelectorAll('.section[id]');
  const links = document.querySelectorAll('.toc-sidebar a');
  if (sections.length && links.length) {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
});
