/**
 * Smooth scroll implementation for FiloSoft platform
 */

/**
 * Initialize smooth scrolling for all anchor links
 */
(function() {
  document.addEventListener('DOMContentLoaded', initSmoothScroll);

  /**
   * Set up click handlers for anchor links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });
  }

  /**
   * Handle anchor link clicks
   * @param {Event} e - Click event
   */
  function handleAnchorClick(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (!targetElement) return;
    
    scrollToElement(targetElement);
  }

  /**
   * Smoothly scroll to element
   * @param {Element} element - Target DOM element
   * @param {number} duration - Animation duration in ms
   */
  function scrollToElement(element, duration = 500) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollProgress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(scrollProgress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  /**
   * Easing function for smooth animation
   * @param {number} t - Current time progress (0-1)
   * @returns {number} Eased value
   */
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
})(); 