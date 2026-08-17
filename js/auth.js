// ==========================================
// إدارة المصادقة عبر Supabase Authentication
// ==========================================

let currentShopId = null;
let currentUserRole = null;
let currentUserId = null;
let currentShopName = null;
let currentShopStatus = null;
let currentTrialEndsAt = null;
let currentSubscriptionExpiresAt = null;
let isShopActive = false;
let isSuperAdmin = false;
let currentShopPaymentClaimedAt = null;

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

    const { data: profile } = await supabaseClient
        .from('profiles')
        .select('shop_id')
        .eq('id', signInData.user.id)
        .single();

    if (!profile) {
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
 * حساب هل المحل نشط حالياً (نفس منطق الدالة SQL، لأغراض الواجهة فقط)
 */
function computeIsActive(status, trialEndsAt, subExpiresAt) {
    const now = new Date();
    if (status === 'active' && subExpiresAt && new Date(subExpiresAt) > now) return true;
    if (status === 'trial' && trialEndsAt && new Date(trialEndsAt) > now) return true;
    return false;
}

/**
 * التحقق من حالة تسجيل الدخول + جلب معلومات المحل والاشتراك
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
        .select('shop_id, role, is_super_admin, shops(name, subscription_status, trial_ends_at, subscription_expires_at, payment_claimed_at)')
        .eq('id', session.user.id)
        .single();

    if (error || !profile) {
        await supabaseClient.auth.signOut();
        window.location.href = 'login.html?removed=1';
        return;
    }

    currentShopId = profile.shop_id;
    currentUserRole = profile.role;
    currentShopName = profile.shops?.name || '';
    currentShopStatus = profile.shops?.subscription_status || 'trial';
    currentTrialEndsAt = profile.shops?.trial_ends_at || null;
    currentSubscriptionExpiresAt = profile.shops?.subscription_expires_at || null;
    isShopActive = computeIsActive(currentShopStatus, currentTrialEndsAt, currentSubscriptionExpiresAt);
    isSuperAdmin = profile.is_super_admin === true;
    currentShopPaymentClaimedAt = profile.shops?.payment_claimed_at || null;

    const adminLink = document.getElementById('adminMenuLink');
    if (adminLink && isSuperAdmin) {
        adminLink.style.display = 'flex';
    }

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

if (document.getElementById('sideMenu')) {
    checkAuth();
}

if (document.getElementById('loginForm')) {
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

    const params = new URLSearchParams(window.location.search);
    if (params.get('removed') === '1') {
        document.addEventListener('DOMContentLoaded', () => {
            showLoginError('accountRemoved');
        });
    }
}