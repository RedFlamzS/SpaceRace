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
