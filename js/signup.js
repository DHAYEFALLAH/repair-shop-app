// ==========================================
// إنشاء حساب محل جديد، أو الانضمام لمحل موجود عبر دعوة
// ==========================================

const urlParams = new URLSearchParams(window.location.search);
const inviteShopId = urlParams.get('invite');

if (inviteShopId) {
    const shopNameGroup = document.getElementById('shopNameGroup');
    const heading = document.getElementById('signupHeading');
    if (shopNameGroup) shopNameGroup.style.display = 'none';
    if (heading) heading.setAttribute('data-i18n', 'joinTeamTitle');
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

    let userId = null;

    // 1) نحاول إنشاء حساب جديد أولاً
    const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
        email, password
    });

    if (signUpError) {
        const msg = (signUpError.message || '').toLowerCase();
        const isExisting = msg.includes('already registered') || msg.includes('already exists');

        if (!isExisting) {
            showSignupError('signupError', signUpError.message);
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }

        // ===== الحساب موجود مسبقاً (ربما عضو سابق أُزيل) — نحاول تسجيل دخوله =====
        const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
            email, password
        });

        if (signInError) {
            showSignupError('existingAccountWrongPassword');
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }

        userId = signInData.user.id;

        // تحقق: هل هذا الحساب مرتبط بمحل آخر أصلاً؟
        const { data: existingProfile } = await supabaseClient
            .from('profiles')
            .select('shop_id')
            .eq('id', userId)
            .single();

        if (existingProfile) {
            if (inviteShopId && existingProfile.shop_id === inviteShopId) {
                // مرتبط بنفس المحل أصلاً (لم يُحذف فعلياً) — نوديه للرئيسية مباشرة
                window.location.href = 'index.html';
                return false;
            }
            showSignupError('alreadyInShop');
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }
    } else {
        userId = signUpData.user.id;
    }

    // 2) عندنا الآن userId صالح (حساب جديد، أو حساب موجود بلا محل حالياً) — نربطه بمحل
    if (inviteShopId) {
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert({ id: userId, shop_id: inviteShopId, role: 'employee', email: email });

        if (profileError) {
            showSignupError('signupError', profileError.message);
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }
    } else {
        const shopName = document.getElementById('shopName').value.trim();
        if (!shopName) {
            const lang = document.documentElement.lang || 'ar';
            errorEl.textContent = lang === 'ar' ? 'الرجاء إدخال اسم المحل' : "Veuillez entrer le nom de l'atelier";
            errorEl.style.display = 'block';
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }

        const shopId = crypto.randomUUID();

        const { error: shopError } = await supabaseClient
            .from('shops')
            .insert({ id: shopId, name: shopName });

        if (shopError) {
            showSignupError('signupError', shopError.message);
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }

        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert({ id: userId, shop_id: shopId, role: 'owner', email: email });

        if (profileError) {
            showSignupError('signupError', profileError.message);
            if (submitBtn) submitBtn.disabled = false;
            return false;
        }
    }

    window.location.href = 'index.html';
    return false;
}

function showSignupError(key, rawMessage) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = dict[key] || dict.signupError;
    errorEl.style.display = 'block';
    if (rawMessage) console.error(rawMessage);
}