// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to set the theme
  const setTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
        themeToggle.querySelector('.sun-icon').style.display = 'none';
        themeToggle.querySelector('.moon-icon').style.display = 'block';
      }
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        themeToggle.querySelector('.sun-icon').style.display = 'block';
        themeToggle.querySelector('.moon-icon').style.display = 'none';
      }
    }
  };

  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    setTheme(true);
  } else if (savedTheme === 'light') {
    setTheme(false);
  } else {
    setTheme(prefersDarkScheme.matches);
  }

  // Add event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDarkTheme = document.documentElement.classList.contains('dark-theme');
      setTheme(!isDarkTheme);
    });
  }

  // Listen for changes in system preference
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });
});
