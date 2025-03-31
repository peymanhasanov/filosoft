// Auth state management
const AUTH_KEY = "filosoft_auth";

// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) !== null;
}

// Function to save login state
function saveLogin(userData) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
}

// Function to get user data
function getUserData() {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
}

// Function to logout
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "index.html";
}

// Simulate test data for user profile
function getTestData() {
    const userData = getUserData();
    
    if (!userData) return null;
    
    // If user doesn't have test data yet, create mock data
    if (!userData.tests) {
        userData.tests = [
            { id: 1, name: "Vəkillik Testi", score: 85, completedAt: new Date().toISOString(), totalQuestions: 50, correctAnswers: 42 },
            { id: 2, name: "Məhkəmə Sınağı", score: 78, completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), totalQuestions: 40, correctAnswers: 31 },
            { id: 3, name: "MIQ Hazırlıq", status: "enrolled", enrolledAt: new Date().toISOString() }
        ];
        
        // Save updated user data
        saveLogin(userData);
    }
    
    return userData.tests;
}

// Handle login form submission - update auth.html to use this
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // In a real app, this would validate against a backend
    if (email && password) {
        const userData = {
            name: "İstifadəçi",
            email: email,
            createdAt: new Date().toISOString()
        };
        
        saveLogin(userData);
        
        // Redirect to home page after login
        window.location.href = "index.html";
    } else {
        // Show error if login fails
        const loginError = document.getElementById('loginError');
        if (loginError) {
            loginError.style.display = 'block';
        }
    }
}

// Handle registration form submission - update auth.html to use this
function handleRegister(event) {
    event.preventDefault();
    
    const nameInput = document.querySelector('.sign-up input[placeholder="Ad-Soyad"]');
    const emailInput = document.querySelector('.sign-up input[placeholder="Mail"]');
    const passwordInput = document.querySelector('.sign-up input[placeholder="Şifrə"]');
    
    if (nameInput && emailInput && passwordInput) {
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (name && email && password) {
            const userData = {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            };
            
            saveLogin(userData);
            
            // Redirect to home page after registration
            window.location.href = "index.html";
        }
    }
    
    // If registration fails or is incomplete
    const registerError = document.getElementById('registerError');
    if (registerError) {
        registerError.style.display = 'block';
    }
}

// Render user profile data
function renderProfile(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const userData = getUserData();
    if (!userData) {
        window.location.href = "auth.html";
        return;
    }

    const tests = getTestData();
    
    // Create profile HTML
    const completedTests = tests.filter(test => test.score !== undefined).length;
    const enrolledTests = tests.filter(test => test.status === "enrolled").length;
    
    let html = `
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                    <i class="ri-user-fill text-white text-4xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold">${userData.name}</h3>
                    <p class="text-gray-600">${userData.email}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="text-gray-700 font-medium mb-1">Tamamlanan Testlər</h4>
                    <p class="text-2xl font-bold text-primary">${completedTests}</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="text-gray-700 font-medium mb-1">Qeydiyyat Olunan</h4>
                    <p class="text-2xl font-bold text-primary">${enrolledTests}</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="text-gray-700 font-medium mb-1">Ortalama Bal</h4>
                    <p class="text-2xl font-bold text-primary">
                        ${completedTests > 0 ? 
                          Math.round(tests.filter(t => t.score !== undefined).reduce((sum, t) => sum + t.score, 0) / completedTests) 
                          : 0}
                    </p>
                </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-semibold mb-4">Test Tarixçəsi</h3>
                
                <div class="overflow-hidden bg-white rounded-lg border border-gray-200">
                    ${tests.length > 0 ? tests.map(test => `
                        <div class="p-4 border-b border-gray-200 last:border-b-0">
                            <div class="flex justify-between items-center">
                                <h4 class="font-medium">${test.name}</h4>
                                ${test.score !== undefined ? 
                                  `<span class="px-3 py-1 bg-${test.score >= 80 ? 'green' : test.score >= 60 ? 'blue' : 'orange'}-100 text-${test.score >= 80 ? 'green' : test.score >= 60 ? 'blue' : 'orange'}-800 rounded-full text-sm">
                                     ${test.score}/100
                                   </span>` 
                                 : 
                                  '<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Qeydiyyatlı</span>'
                                }
                            </div>
                            ${test.score !== undefined ? 
                              `<p class="text-sm text-gray-600 mt-1">
                                 ${new Date(test.completedAt).toLocaleDateString()} · ${test.correctAnswers}/${test.totalQuestions} doğru cavab
                               </p>` 
                             : 
                              `<p class="text-sm text-gray-600 mt-1">
                                 ${new Date(test.enrolledAt).toLocaleDateString()}'də qeydiyyatdan keçib
                               </p>`
                            }
                        </div>
                    `).join('') : '<p class="p-4 text-gray-500">Hələ test tarixçəniz yoxdur.</p>'}
                </div>
            </div>
            
            <div class="mt-6 text-right">
                <button id="logoutBtn" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    Çıxış
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Add logout event listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', function() {
    // Attach login and register handlers to forms in auth.html
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Check for profile container on index page
    const profileContainer = document.getElementById('profileContainer');
    if (profileContainer) {
        renderProfile('profileContainer');
    }
}); 