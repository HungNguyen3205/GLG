if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.16 });
  document.querySelectorAll('.feature').forEach((section) => observer.observe(section));
}

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const film = document.querySelector('.film');
let frameRequest = 0;

function renderFilm() {
  frameRequest = 0;
  if (motion.matches || !film) return;
  const stage = film.firstElementChild;
  const travel = Math.max(1, film.offsetHeight - stage.offsetHeight);
  const progress = Math.min(1, Math.max(0, -film.getBoundingClientRect().top / travel));
  film.style.setProperty('--frame', progress.toFixed(3));
}

function queueFilm() {
  if (!frameRequest) frameRequest = requestAnimationFrame(renderFilm);
}

function syncMotion() {
  document.documentElement.classList.toggle('film-ready', !motion.matches);
  queueFilm();
}

addEventListener('scroll', queueFilm, { passive: true });
addEventListener('resize', queueFilm);
motion.addEventListener('change', syncMotion);
syncMotion();
