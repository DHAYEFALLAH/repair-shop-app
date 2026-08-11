// ==========================================
// إنشاء حساب محل جديد
// ==========================================

async function handleSignup(event) {
    event.preventDefault();

    const shopName = document.getElementById('shopName').value.trim();
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    errorEl.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;

    // 1) إنشاء حساب المستخدم
    const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
        email, password
    });

    if (signUpError || !signUpData.user) {
        showSignupError(signUpError?.message);
        if (submitBtn) submitBtn.disabled = false;
        return false;
    }

    const userId = signUpData.user.id;

    // 2) إنشاء المحل — نولّد المعرّف بأنفسنا لتفادي مشكلة القراءة الفورية عبر RLS
    const shopId = crypto.randomUUID();

    const { error: shopError } = await supabaseClient
        .from('shops')
        .insert({ id: shopId, name: shopName });

    if (shopError) {
        showSignupError(shopError.message);
        if (submitBtn) submitBtn.disabled = false;
        return false;
    }

    // 3) ربط المستخدم بالمحل عبر جدول profiles
    const { error: profileError } = await supabaseClient
        .from('profiles')
        .insert({ id: userId, shop_id: shopId });

    if (profileError) {
        showSignupError(profileError.message);
        if (submitBtn) submitBtn.disabled = false;
        return false;
    }

    // نجح كل شيء
    window.location.href = 'index.html';
    return false;
}

function showSignupError(message) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = dict.signupError || 'حدث خطأ أثناء إنشاء الحساب';
    errorEl.style.display = 'block';
    console.error(message);
}