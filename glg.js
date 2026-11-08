const photo = (id, width) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const spaces = [
  { slug: 'khach-san', name: 'Khách sạn', line: 'Một nơi để chậm lại và nghỉ ngơi.', photo: 'photo-1611892440504-42a792e24d32', tone: '#604236', published: true },
  { slug: 'ca-phe', name: 'Cà phê', line: 'Một góc quen cho những cuộc gặp.', description: 'Một tách cà phê và một chỗ ngồi để câu chuyện có thêm thời gian.', photo: 'photo-1501339847302-ac426a4a7cbb', tone: '#704b31', published: true },
  { slug: 'mam-non', name: 'Mầm non', line: 'Mỗi ngày là một khám phá nhỏ.', description: 'Một không gian dành cho những năm đầu đời, nơi các em được chơi và khám phá theo nhịp riêng.', photo: 'photo-1503454537195-1dcabb73ffb9', tone: '#69543c' },
  { slug: 'yoga', name: 'Yoga', line: 'Dành thời gian để trở về với mình.', description: 'Khám phá thực hành, lớp học và chương trình đào tạo cùng GLG Yoga School.', photo: 'photo-1544367567-0f2fcb009e0b', tone: '#4c523a' },
  { slug: 'spa', name: 'Spa', line: 'Một khoảng lặng để cơ thể được chăm sóc.', description: 'Một không gian dành cho những phút nghỉ ngơi và chăm sóc cơ thể.', photo: 'photo-1540555700478-4be289fbecef', tone: '#635049' },
];

const home = document.body.dataset.page === 'home';
const base = home ? './' : '../';
const dialog = document.querySelector('#preview');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const number = (index) => String(index + 1).padStart(2, '0');

function destination(space) {
  return space.published ? `href="${base}${space.slug}/"` : `type="button" data-open="${space.slug}"`;
}

function link(space, content, attributes = '') {
  const tag = space.published ? 'a' : 'button';
  return `<${tag} ${destination(space)} ${attributes}>${content}</${tag}>`;
}

document.querySelector('footer nav').innerHTML = spaces.map((space) => link(space, space.name)).join('');
document.querySelectorAll('[data-open]').forEach((element) => {
  const space = spaces.find((item) => item.slug === element.dataset.open);
  if (space.published) element.outerHTML = link(space, element.textContent);
});

let opener;
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open]');
  if (!trigger) return;
  const space = spaces.find((item) => item.slug === trigger.dataset.open);
  opener = trigger;
  dialog.querySelector('img').src = photo(space.photo, 850);
  dialog.querySelector('h2').textContent = space.name;
  dialog.querySelector('.description').textContent = space.description;
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));

if (home) {
  const strip = document.querySelector('.doors');
  const steps = document.querySelector('.steps');
  const mobile = matchMedia('(max-width: 760px)');
  let active = 0;
  strip.innerHTML = spaces.map((space, index) => link(space, `
    <img src="${photo(space.photo, 1000)}" alt="" ${index === 0 ? 'fetchpriority="high"' : ''}>
    <span class="door-number">${number(index)} / 05</span>
    <span class="door-copy"><strong>${space.name}</strong><span class="door-line">${space.line}</span>
    <span class="door-action">${space.published ? 'Khám phá' : 'Sắp ra mắt'} <span aria-hidden="true">↗</span></span></span>`,
    `class="door" data-slug="${space.slug}" style="--tone:${space.tone}"`)).join('');
  steps.innerHTML = spaces.map((space, index) => `<button type="button" aria-label="Chọn ${space.name}">${number(index)}</button>`).join('');
  const doors = [...strip.children];

  function select(index) {
    active = index;
    doors.forEach((door, position) => {
      door.classList.toggle('active', index === position);
      steps.children[position].setAttribute('aria-pressed', String(index === position));
    });
    document.querySelector('#counter').textContent = `${number(index)} / 05`;
  }

  doors.forEach((door, index) => {
    door.addEventListener('pointerenter', (event) => {
      if (!mobile.matches && event.pointerType === 'mouse') select(index);
    });
    door.addEventListener('focus', () => select(index));
    door.addEventListener('click', () => select(index));
    steps.children[index].addEventListener('click', () => {
      select(index);
      if (mobile.matches) strip.scrollTo({ left: door.offsetLeft - strip.firstElementChild.offsetLeft, behavior: reduced.matches ? 'instant' : 'smooth' });
    });
  });

  let frame;
  strip.addEventListener('scroll', () => {
    if (!mobile.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const left = strip.getBoundingClientRect().left;
      const distances = doors.map((door) => Math.abs(door.getBoundingClientRect().left - left));
      select(distances.indexOf(Math.min(...distances)));
    });
  }, { passive: true });
  addEventListener('pagehide', () => history.replaceState({ active, left: strip.scrollLeft }, ''));
  const previousSpace = spaces.findIndex((space) => location.hash === `#from-${space.slug}`);
  select(previousSpace >= 0 ? previousSpace : (history.state?.active ?? 0));
  if (mobile.matches && previousSpace >= 0) {
    strip.scrollLeft = doors[previousSpace].offsetLeft - doors[0].offsetLeft;
  }
  if (mobile.matches && previousSpace < 0 && history.state?.left) strip.scrollLeft = history.state.left;
} else {
  const space = spaces.find((item) => item.slug === document.body.dataset.page);
  const cover = document.querySelector('.detail-cover');
  if (!cover.hasAttribute('src')) cover.src = photo(space.photo, 1600);
  const gallery = document.querySelector('.gallery img');
  if (gallery && !gallery.hasAttribute('src')) gallery.src = photo('photo-1631049307264-da0ec9d70304', 1400);
}
