// ==========================================
// إدارة المصادقة (Authentication)
// ==========================================

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';
const AUTH_STORAGE_KEY = 'isLoggedIn';

/**
 * التحقق من بيانات الدخول (يُستخدم في login.html)
 */
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        // إعادة التوجيه إلى الصفحة الرئيسية
        window.location.href = 'index.html';
        return false;
    } else {
        const lang = document.documentElement.lang || 'ar';
        const dict = (lang === 'ar') ? translations.ar : translations.fr;
        errorEl.textContent = dict.loginError || 'اسم المستخدم أو كلمة المرور غير صحيحة';
        errorEl.style.display = 'block';
        return false;
    }
}

/**
 * التحقق من حالة تسجيل الدخول (في index.html)
 * إذا لم يكن مسجلاً، يتم إعادة التوجيه إلى login.html
 */
function checkAuth() {
    const isLoggedIn = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

/**
 * تسجيل الخروج (في index.html)
 */
function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = 'login.html';
}

// تنفيذ التحقق تلقائياً إذا كنا في الصفحة الرئيسية
// نتحقق من وجود عناصر الصفحة الرئيسية (مثل sideMenu) لتحديد السياق
if (document.getElementById('sideMenu')) {
    // نحن في index.html
    checkAuth();
}

// إذا كنا في صفحة الدخول وهو مسجل دخول أصلاً، نوجهه للرئيسية مباشرة
if (document.getElementById('loginForm')) {
    if (localStorage.getItem(AUTH_STORAGE_KEY) === 'true') {
        window.location.href = 'index.html';
    }
}