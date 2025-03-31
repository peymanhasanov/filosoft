/**
 * Common JavaScript functionality for FiloSoft platform
 */

/**
 * Tailwind configuration
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#304d90',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'button': '8px',
      }
    }
  }
};

/**
 * Initialize common elements like navigation, footer, etc.
 */
document.addEventListener('DOMContentLoaded', () => {
  const userMenuButton = document.getElementById('userMenuButton');
  const userMenu = document.getElementById('userMenu');
  
  if (userMenuButton && userMenu) {
    userMenuButton.addEventListener('click', () => {
      userMenu.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
      if (!userMenuButton.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.add('hidden');
      }
    });
  }
  
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}); 