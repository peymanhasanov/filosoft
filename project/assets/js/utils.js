/**
 * Utility functions for FiloSoft platform
 */

/**
 * Format date to localized string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Toggle visibility of an element
 * @param {string} elementId - Element ID to toggle
 */
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const currentDisplay = window.getComputedStyle(element).display;
  element.style.display = currentDisplay === 'none' ? 'block' : 'none';
}

/**
 * Add event listener with error handling
 * @param {Element} element - DOM element
 * @param {string} event - Event name
 * @param {Function} callback - Event handler
 */
function safeAddEventListener(element, event, callback) {
  if (!element) return;
  
  element.addEventListener(event, (e) => {
    try {
      callback(e);
    } catch (error) {
      console.error('Event handler error:', error);
    }
  });
} 