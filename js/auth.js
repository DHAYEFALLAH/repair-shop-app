// ==========================================
// إدارة المصادقة عبر Supabase Authentication
// ==========================================

let currentShopId = null;
let currentUserRole = null;
let currentUserId = null;

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

    const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
        email, password
    });

    if (signInError) {
        showLoginError('loginError');
        if (submitBtn) submitBtn.disabled = false;
        return false;
    }

    // ===== تحقق فعلي: هل مازال هذا الحساب عضواً في أي محل؟ =====
    const { data: profile } = await supabaseClient
        .from('profiles')
        .select('shop_id')
        .eq('id', signInData.user.id)
        .single();

    if (!profile) {
        // تسجيل خروج فوري وحقيقي — لا نترك جلسة معلّقة
        await supabaseClient.auth.signOut();
        showLoginError('accountRemoved');
        if (submitBtn) submitBtn.disabled = false;
        return false;
    }

    window.location.href = 'index.html';
    return false;
}

function showLoginError(key) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = dict[key] || dict.loginError;
    errorEl.style.display = 'block';
}

/**
 * التحقق من حالة تسجيل الدخول (في index.html)
 */
async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'login.html';
        return;
    }

    currentUserId = session.user.id;

    const { data: profile, error } = await supabaseClient
        .from('profiles')
        .select('shop_id, role')
        .eq('id', session.user.id)
        .single();

    if (error || !profile) {
        // تمت إزالته من المحل بعد أن كانت له جلسة نشطة — نسجّل خروجه فعلياً
        await supabaseClient.auth.signOut();
        window.location.href = 'login.html?removed=1';
        return;
    }

    currentShopId = profile.shop_id;
    currentUserRole = profile.role;

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

// إذا كنا في صفحة الدخول
if (document.getElementById('loginForm')) {
    // إذا كان مسجل دخول أصلاً بجلسة صالحة (وعضويته مازالت قائمة)، وجّهه للرئيسية
    supabaseClient.auth.getSession().then(async ({ data: { session } }) => {
        if (session) {
            const { data: profile } = await supabaseClient
                .from('profiles')
                .select('shop_id')
                .eq('id', session.user.id)
                .single();
            if (profile) {
                window.location.href = 'index.html';
            }
        }
    });

    // إذا وصل من إعادة توجيه بسبب إزالته من المحل، نعرض رسالة واضحة فوراً
    const params = new URLSearchParams(window.location.search);
    if (params.get('removed') === '1') {
        document.addEventListener('DOMContentLoaded', () => {
            showLoginError('accountRemoved');
        });
    }
}