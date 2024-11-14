document.addEventListener('DOMContentLoaded', () => {
  interface Route {
    path: string
    label: string
    icon: string
  }

  const routes: Route[] = [
    { path: '/', label: 'Get Started', icon: 'play_arrow' },
    { path: '/playground.html', label: 'Playground', icon: 'ar_stickers' },
  ];

  // Function to render tabs
  const tabLinkContainer = document.querySelector('#tabLinkContent');
  if (tabLinkContainer) {
    routes.forEach(route => {
      const link = document.createElement('a');
      link.className = 'tab-link';
      link.href = route.path;

      const tabContent = document.createElement('span');
      tabContent.className = 'tab-content';

      const textLabel = document.createElement('span');
      textLabel.className = 'text-label';

      const icon = document.createElement('md-icon');
      icon.textContent = route.icon;

      const label = document.createElement('span');
      label.textContent = route.label;

      textLabel.appendChild(icon);
      textLabel.appendChild(label);
      tabContent.appendChild(textLabel);

      const tabIndicator = document.createElement('span');
      tabIndicator.className = 'tab-indicator';

      const underline = document.createElement('span');
      underline.className = 'underline';

      tabIndicator.appendChild(underline);
      tabContent.appendChild(tabIndicator);

      link.appendChild(tabContent);
      tabLinkContainer.appendChild(link);

      // Check if the current URL matches the link's href
      if (window.location.pathname === route.path) {
        link.classList.toggle('active');
      }
    });
  }

  const updateThemeIcon = (isDarkMode: boolean) => {
    const themeToggleButton = document.querySelector('#themeToggle md-icon');
    if (themeToggleButton) {
      themeToggleButton.textContent = isDarkMode ? 'lightbulb' : 'light_off';
    }
  };

  // Theme toggle functionality
  const themeToggleButton = document.querySelector('#themeToggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');

      // Store in local storage
      const isDarkMode = document.body.classList.contains('dark');
      localStorage.setItem(
        'codemirror-theme:theme',
        isDarkMode ? 'dark' : 'light',
      );

      // Update the theme icon
      updateThemeIcon(isDarkMode);
    });
  }

  // Get the theme from local storage
  const currentTheme = localStorage.getItem('codemirror-theme:theme');
  if (currentTheme) {
    document.body.classList.add(currentTheme);
    document.body.classList.remove(currentTheme === 'dark' ? 'light' : 'dark');
    updateThemeIcon(currentTheme === 'dark');
  } else {
    // Optionally handle the case where no theme is set
    document.body.classList.add('light'); // Default to light theme
    document.body.classList.remove('dark');
    updateThemeIcon(false);
  }

  // Scroll up button functionality
  const scrollUpButton = document.querySelector('#scrollUpButton');
  if (scrollUpButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollUpButton.classList.add('show');
      } else {
        scrollUpButton.classList.remove('show');
      }
    });

    scrollUpButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});