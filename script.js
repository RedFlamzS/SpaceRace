document.addEventListener('DOMContentLoaded', () => {
  // ===== Highlight active tab =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.tab-link').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== Dark mode toggle (switch) =====
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    root.dataset.theme = savedTheme;
  } else {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    root.dataset.theme = prefersDark ? 'dark' : 'light';
  }

  // Set switch position based on theme
  if (toggle) {
    toggle.checked = root.dataset.theme === 'dark';

    toggle.addEventListener('change', () => {
      const newTheme = toggle.checked ? 'dark' : 'light';
      root.dataset.theme = newTheme;
      localStorage.setItem('theme', newTheme);
    });
  }
});

(function () {
  const overlay = document.createElement('div');
  overlay.className = 'image-overlay';
  overlay.innerHTML = `
    <div class="image-popup">
      <button class="popup-close" aria-label="Close">&#x2715;</button>
    </div>`;
  document.body.appendChild(overlay);

  const popup = overlay.querySelector('.image-popup');
  const closeBtn = overlay.querySelector('.popup-close');

  function openPopup(sourceEl) {
    const existing = popup.querySelector('img, video, .image-popup-content');
    if (existing) existing.remove();

    const img = sourceEl.querySelector('img');
    if (img) {
      const clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt || '';
      popup.appendChild(clone);
    } else {
      const wrapper = document.createElement('div');
      wrapper.className = 'image-popup-content';
      wrapper.innerHTML = sourceEl.innerHTML;
      popup.appendChild(wrapper);
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.image').forEach(el => {
    el.addEventListener('click', () => openPopup(el));
  });

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePopup();
  });
})();

(function () {
  const overlay = document.createElement('div');
  overlay.className = 'image-overlay';
  overlay.innerHTML = `
    <div class="image-popup">
      <button class="popup-close" aria-label="Close">&#x2715;</button>
    </div>`;
  document.body.appendChild(overlay);

  const popup = overlay.querySelector('.image-popup');
  const closeBtn = overlay.querySelector('.popup-close');

  function openPopup(sourceEl) {
    const existing = popup.querySelector('img, video, .image-popup-content');
    if (existing) existing.remove();

    const img = sourceEl.querySelector('img') || (sourceEl.tagName === 'IMG' ? sourceEl : null);
    if (img) {
      const clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt || '';
      popup.appendChild(clone);
    } else {
      const wrapper = document.createElement('div');
      wrapper.className = 'image-popup-content';
      wrapper.innerHTML = sourceEl.innerHTML;
      popup.appendChild(wrapper);
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.card-image').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => openPopup(el));
  });

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePopup();
  });
})();
