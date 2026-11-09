// GLG THE COLLECTION - CLIENT SCRIPTS

const spaceDetails = {
  'spa': {
    title: 'GLG Spa & Wellness',
    description: 'Không gian tĩnh lặng dành cho những phút nghỉ ngơi và trị liệu phục hồi. Liệu trình thảo dược truyền thống, massage thư giãn, xông hơi và chăm sóc da chuyên sâu giúp tái tạo năng lượng trọn vẹn.',
    photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=82'
  },
  'mam-non': {
    title: 'Mầm non GLG (GLG Kindergarten)',
    description: 'Không gian giáo dục mầm non chất lượng cao, nơi các em được tự do khám phá thế giới xung quanh, phát triển kỹ năng xã hội, tư duy ngôn ngữ và nuôi dưỡng sự sáng tạo theo nhịp tự nhiên của từng lứa tuổi.',
    photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=82'
  },
  'gym': {
    title: 'GLG Fitness & Gym',
    description: 'Phòng tập thể hình chuẩn quốc tế với hệ thống máy móc tập luyện tiên tiến, khu tạ tự do, các lớp rèn luyện thể lực và đội ngũ huấn luyện viên chuyên nghiệp đồng hành mỗi ngày.',
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=82'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. MODAL PREVIEW DIALOG
  const dialog = document.querySelector('#preview');
  if (dialog) {
    const dialogImg = dialog.querySelector('img');
    const dialogTitle = dialog.querySelector('#preview-title');
    const dialogDesc = dialog.querySelector('.description');
    const closeBtn = dialog.querySelector('.close');
    const actionCloseBtn = dialog.querySelector('.btn-close-dialog');

    let opener = null;

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-open]');
      if (!trigger) return;
      const slug = trigger.dataset.open;
      const data = spaceDetails[slug];
      if (!data) return;

      opener = trigger;
      dialogImg.src = data.photo;
      dialogImg.alt = data.title;
      dialogTitle.textContent = data.title;
      dialogDesc.textContent = data.description;
      dialog.showModal();
    });

    closeBtn?.addEventListener('click', () => dialog.close());
    actionCloseBtn?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  }

  // 2. CARDS CAROUSEL ("CARD CHẠY QUA")
  const track = document.querySelector('#cardsTrack');
  const btnPrev = document.querySelector('#btnPrev');
  const btnNext = document.querySelector('#btnNext');
  const dots = document.querySelectorAll('#carouselDots .dot');
  const counter = document.querySelector('#cardCounter');
  const toggleAutoplayBtn = document.querySelector('#toggleAutoplay');
  const autoplayIndicator = document.querySelector('.autoplay-indicator');
  const autoplayLabel = document.querySelector('#autoplayLabel');

  if (track) {
    const cards = [...track.querySelectorAll('.space-card')];
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoplayActive = true;
    let autoplayTimer = null;
    let isUserInteracting = false;

    function getCardWidth() {
      if (!cards[0]) return 360;
      const cardRect = cards[0].getBoundingClientRect();
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 24;
      return cardRect.width + gap;
    }

    function updateActiveState(index) {
      currentIndex = index;
      if (counter) {
        counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(totalCards).padStart(2, '0')}`;
      }
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    }

    function scrollToIndex(index, behavior = 'smooth') {
      if (index < 0) index = 0;
      if (index >= totalCards) index = 0;
      const card = cards[index];
      if (card) {
        const trackLeft = track.getBoundingClientRect().left;
        const cardLeft = card.getBoundingClientRect().left;
        const offset = cardLeft - trackLeft + track.scrollLeft;
        // Center the card slightly or align to start
        const centerPadding = Math.max(0, (track.clientWidth - card.offsetWidth) / 2);
        track.scrollTo({
          left: Math.max(0, offset - centerPadding),
          behavior: behavior
        });
      }
      updateActiveState(index);
    }

    // Next / Prev button actions
    btnNext?.addEventListener('click', () => {
      pauseAutoplayTemp();
      const nextIndex = (currentIndex + 1) % totalCards;
      scrollToIndex(nextIndex);
    });

    btnPrev?.addEventListener('click', () => {
      pauseAutoplayTemp();
      const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
      scrollToIndex(prevIndex);
    });

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        pauseAutoplayTemp();
        scrollToIndex(index);
      });
    });

    // Update index on manual scroll/swipe
    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const centerPoint = track.getBoundingClientRect().left + track.clientWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(centerPoint - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });

        updateActiveState(closestIndex);
      }, 50);
    }, { passive: true });

    // Autoplay functionality ("Card tự động chạy qua")
    function startAutoplay() {
      stopAutoplay();
      if (!autoplayActive) return;
      autoplayTimer = setInterval(() => {
        if (!isUserInteracting && autoplayActive) {
          const nextIndex = (currentIndex + 1) % totalCards;
          scrollToIndex(nextIndex);
        }
      }, 3400); // 3.4 seconds per slide
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function pauseAutoplayTemp() {
      isUserInteracting = true;
      clearTimeout(window.__userInteractTimeout);
      window.__userInteractTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 5000);
    }

    // Hover & touch handling to pause while viewing
    track.addEventListener('pointerenter', () => { isUserInteracting = true; });
    track.addEventListener('pointerleave', () => { isUserInteracting = false; });
    track.addEventListener('touchstart', () => { isUserInteracting = true; }, { passive: true });
    track.addEventListener('touchend', () => { pauseAutoplayTemp(); }, { passive: true });

    // Toggle button
    toggleAutoplayBtn?.addEventListener('click', () => {
      autoplayActive = !autoplayActive;
      if (autoplayActive) {
        autoplayIndicator?.classList.remove('paused');
        if (autoplayLabel) autoplayLabel.textContent = 'Đang tự động chạy';
        startAutoplay();
      } else {
        autoplayIndicator?.classList.add('paused');
        if (autoplayLabel) autoplayLabel.textContent = 'Đã tạm dừng';
        stopAutoplay();
      }
    });

    // Start auto glide
    startAutoplay();
  }
});
