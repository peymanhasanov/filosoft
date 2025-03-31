/**
 * Authentication utilities for FiloSoft platform
 */

/**
 * Check if user is logged in
 * @returns {boolean} Authentication status
 */
function isLoggedIn() {
  // For testing purposes, setting a test auth item
  localStorage.setItem("filosoft_auth", JSON.stringify({
    name: "İstifadəçi",
    email: "user@example.com",
    role: "user",
    loggedIn: true
  }));
  
  // Check if auth data exists in localStorage
  return localStorage.getItem("filosoft_auth") !== null;
}

/**
 * Get current user data
 * @returns {Object} User information
 */
function getUserData() {
  return {
    name: "İstifadəçi",
    email: "user@example.com",
    role: "user"
  };
}

/**
 * Log out the current user
 */
function logout() {
  window.location.href = "index.html";
}

/**
 * Render user profile information
 * @param {string} containerId - Target container element ID
 */
function renderProfile(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const userData = getUserData();
  
  container.innerHTML = `
    <div class="bg-white rounded-xl shadow-md p-6">
      <div class="flex items-center mb-6">
        <div class="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
          <i class="ri-user-fill text-white text-4xl"></i>
        </div>
        <div class="ml-4">
          <h2 class="text-2xl font-bold text-gray-800">${userData.name}</h2>
          <p class="text-gray-600">${userData.email}</p>
        </div>
      </div>
    </div>
  `;
} 