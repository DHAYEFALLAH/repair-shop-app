// ==========================================
// إدارة المصادقة عبر Firebase Authentication
// ==========================================

/**
 * التحقق من بيانات الدخول (يُستخدم في login.html)
 */
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    errorEl.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const lang = document.documentElement.lang || 'ar';
            const dict = (lang === 'ar') ? translations.ar : translations.fr;
            errorEl.textContent = dict.loginError || 'اسم المستخدم أو كلمة المرور غير صحيحة';
            errorEl.style.display = 'block';
            if (submitBtn) submitBtn.disabled = false;
        });

    return false;
}

/**
 * التحقق من حالة تسجيل الدخول (في index.html)
 * إذا لم يكن مسجلاً، يتم إعادة التوجيه إلى login.html
 */
function checkAuth() {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'login.html';
        }
    });
}

/**
 * تسجيل الخروج (في index.html)
 */
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
}

// تنفيذ التحقق تلقائياً إذا كنا في الصفحة الرئيسية
if (document.getElementById('sideMenu')) {
    checkAuth();
}

// إذا كنا في صفحة الدخول وهو مسجل دخول أصلاً، نوجهه للرئيسية مباشرة
if (document.getElementById('loginForm')) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            window.location.href = 'index.html';
        }
    });
}