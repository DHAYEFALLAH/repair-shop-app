// ==========================================
// إدارة المصادقة عبر Supabase Authentication
// ==========================================

/**
 * التحقق من بيانات الدخول (يُستخدم في login.html)
 */
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    errorEl.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        const lang = document.documentElement.lang || 'ar';
        const dict = (lang === 'ar') ? translations.ar : translations.fr;
        errorEl.textContent = dict.loginError || 'اسم المستخدم أو كلمة المرور غير صحيحة';
        errorEl.style.display = 'block';
        if (submitBtn) submitBtn.disabled = false;
        return false;
    }

    window.location.href = 'index.html';
    return false;
}

// متغيّر عام يخزّن معرّف محل المستخدم الحالي، متاح لكل ملفات JS الأخرى
let currentShopId = null;
let currentUserRole = null;
let currentUserId = null;

async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'login.html';
        return;
    }

    currentUserId = session.user.id;

    // جلب معرّف المحل ودور المستخدم
    const { data: profile, error } = await supabaseClient
        .from('profiles')
        .select('shop_id, role')
        .eq('id', session.user.id)
        .single();

    if (error || !profile) {
        console.error('تعذر جلب بيانات المحل', error);
        window.location.href = 'login.html';
        return;
    }

    currentShopId = profile.shop_id;
    currentUserRole = profile.role;

    // إعادة تحميل الصفحة الرئيسية الآن بعد أن أصبح shop_id متوفراً
    if (typeof initActivePage === 'function') {
        initActivePage();
    }
}

/**
 * تسجيل الخروج (في index.html)
 */
async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
}

// تنفيذ التحقق تلقائياً إذا كنا في الصفحة الرئيسية
if (document.getElementById('sideMenu')) {
    checkAuth();
}

// إذا كنا في صفحة الدخول وهو مسجل دخول أصلاً، نوجهه للرئيسية مباشرة
if (document.getElementById('loginForm')) {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            window.location.href = 'index.html';
        }
    });
}