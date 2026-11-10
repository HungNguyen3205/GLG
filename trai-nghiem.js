// GLG · Tiện ích dùng chung cho các phần trải nghiệm bên dưới mô hình 3D
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const XP = {
    vnd(n) { return new Intl.NumberFormat('vi-VN').format(Math.round(n)) + ' ₫'; },
    code(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 7).toUpperCase(); },
    toTop() { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); },

    // Wheel gating: the 3D build owns the wheel only while the page is at the top
    // and the build is not finished; after that the page scrolls to the sections.
    wheelDrivesBuild(e, target, current, max = 5) {
      if (window.scrollY > 2) return false;
      if (e.deltaY > 0) return !(target >= max && current > max - 0.15);
      return target > 1;
    }
  };

  function countUp(el) {
    const end = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const fmt = (v) => v.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (reduced) { el.firstChild.textContent = fmt(end); return; }
    const t0 = performance.now();
    const dur = 1400;
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      el.firstChild.textContent = fmt(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  // Images inside .xp-media fall back to a soft gradient if they fail to load
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' && e.target.closest('.xp-media, .xp-moment')) e.target.classList.add('is-broken');
  }, true);

  document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('is-in');
          if (el.dataset.count) countUp(el);
          if (el.classList.contains('xp-steps')) el.style.setProperty('--xp-progress', 1);
          io.unobserve(el);
        });
      }, { threshold: 0.18 });
      document.querySelectorAll('.xp-reveal, [data-count], .xp-steps').forEach((el) => io.observe(el));

      const links = [...document.querySelectorAll('.xp-subnav a[href^="#"]')];
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      links.forEach((a) => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });
    } else {
      document.querySelectorAll('.xp-reveal').forEach((el) => el.classList.add('is-in'));
    }

    const cue = document.querySelector('.xp-cue');
    cue?.addEventListener('click', () => {
      document.querySelector('.xp-root')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
    XP.setCue = (show) => cue?.classList.toggle('show', show && window.scrollY < 40);
    addEventListener('scroll', () => { if (window.scrollY >= 40) cue?.classList.remove('show'); }, { passive: true });
  });

  window.XP = XP;
})();
