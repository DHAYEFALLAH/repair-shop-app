// ==========================================
// إنشاء حساب محل جديد، أو الانضمام لمحل موجود عبر دعوة
// ==========================================

// هل نحن في وضع "دعوة"؟ نتحقق من رابط الصفحة
const urlParams = new URLSearchParams(window.location.search);
const inviteShopId = urlParams.get('invite');

// تعديل الواجهة فوراً إذا كنا في وضع الدعوة
if (inviteShopId) {
    const shopNameGroup = document.getElementById('shopNameGroup');
    const heading = document.getElementById('signupHeading');
    if (shopNameGroup) shopNameGroup.style.display = 'none';
    if (heading) heading.setAttribute('data-i18n', 'joinTeamTitle');
    // إعادة تطبيق الترجمة فوراً إذا كانت الدالة متوفرة
    if (typeof translations !== 'undefined') {
        const lang = document.documentElement.lang || 'ar';
        heading.textContent = translations[lang].joinTeamTitle;
    }
}

async function handleSignup(event) {
    event.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    errorEl.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;

    // 1) إنشاء حساب المستخدم (نفس الخطوة دائماً)
    const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
        email, password
    });

    if (signUpError || !signUpData.user) {
        showSignupError(signUpError?.message);
        if (submitBtn) submitBtn.disabled = false;
        return false;
    }

    const userId = signUpData.user.id;

    if (inviteShopId) {
        // ===== وضع الانضمام لمحل موجود =====
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert({ id: userId, shop_id: inviteShopId, role: 'employee', email: email });

        if (profileError) {
            showSignupError(profileError.message);
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }
    } else {
        // ===== وضع إنشاء محل جديد =====
        const shopName = document.getElementById('shopName').value.trim();
        if (!shopName) {
            showSignupError('الرجاء إدخال اسم المحل');
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }

        const shopId = crypto.randomUUID();

        const { error: shopError } = await supabaseClient
            .from('shops')
            .insert({ id: shopId, name: shopName });

        if (shopError) {
            showSignupError(shopError.message);
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }

        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert({ id: userId, shop_id: shopId, role: 'owner', email: email });

        if (profileError) {
            showSignupError(profileError.message);
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }
    }

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