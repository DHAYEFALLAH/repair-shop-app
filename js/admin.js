// ==========================================
// لوحة الإدارة العامة — للمدير العام فقط
// ==========================================

async function checkAdminAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'login.html';
        return;
    }

    const { data: profile } = await supabaseClient
        .from('profiles')
        .select('is_super_admin')
        .eq('id', session.user.id)
        .single();

    if (!profile || !profile.is_super_admin) {
        window.location.href = 'index.html';
        return;
    }

    loadShops();
}

async function loadShops() {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    const { data: shops, error } = await supabaseClient
        .from('shops')
        .select('id, name, subscription_status, trial_ends_at, subscription_expires_at, payment_claimed_at, payment_claimed_months, created_at')
        .order('created_at', { ascending: false });

    const { data: profiles } = await supabaseClient
        .from('profiles')
        .select('shop_id, email, role');

    const tbody = document.getElementById('shopsTableBody');

    if (error || !shops) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Error</td></tr>`;
        return;
    }

    const now = new Date();

    tbody.innerHTML = shops.map(s => {
        const owner = (profiles || []).find(p => p.shop_id === s.id && p.role === 'owner');
        const memberCount = (profiles || []).filter(p => p.shop_id === s.id).length;

        const isActive = (s.subscription_status === 'active' && s.subscription_expires_at && new Date(s.subscription_expires_at) > now)
            || (s.subscription_status === 'trial' && s.trial_ends_at && new Date(s.trial_ends_at) > now);

        const relevantDate = s.subscription_status === 'active' ? s.subscription_expires_at : s.trial_ends_at;
        const daysLeft = relevantDate ? Math.ceil((new Date(relevantDate) - now) / (1000 * 60 * 60 * 24)) : null;

        let statusHtml;
        if (!isActive) {
            statusHtml = `<span class="role-badge" style="background:#fee2e2;color:#b91c1c;">${dict.statusExpired}</span>`;
        } else if (s.subscription_status === 'trial') {
            statusHtml = `<span class="role-badge role-employee">${dict.statusTrial}</span>`;
        } else {
            statusHtml = `<span class="role-badge" style="background:#dcfce7;color:#15803d;">${dict.statusActive}</span>`;
        }

        const daysText = daysLeft !== null ? `${daysLeft} ${lang === 'ar' ? 'يوم' : 'j'}` : '-';
        const shopNameSafe = s.name.replace(/'/g, "\\'");

        const paymentBadge = s.payment_claimed_at
            ? `<div style="font-size:0.75rem;color:#b45309;margin-top:4px;">
                 <i class="fas fa-bell"></i> ${lang === 'ar' ? 'ادّعى دفع' : 'A déclaré un paiement'} ${s.payment_claimed_months} ${lang === 'ar' ? 'شهر' : 'mois'}
                 <br/>${new Date(s.payment_claimed_at).toLocaleString(lang === 'ar' ? 'ar-DZ' : 'fr-FR')}
               </div>`
            : '';

        const rowStyle = s.payment_claimed_at ? 'style="background:#fffbeb;"' : '';

        return `
            <tr ${rowStyle}>
                <td>${s.name}</td>
                <td>${owner ? owner.email : '-'}</td>
                <td>${memberCount}</td>
                <td>${statusHtml}${paymentBadge}</td>
                <td>${daysText}</td>
                <td><button class="btn-primary" onclick="activateShop('${s.id}', '${shopNameSafe}', ${s.payment_claimed_months || 1})">${dict.activateBtn}</button></td>
            </tr>
        `;
    }).join('');
}

async function activateShop(shopId, shopName, suggestedMonths = 1) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    const { value: months } = await Swal.fire({
        title: `${dict.activateBtn} — ${shopName}`,
        input: 'number',
        inputLabel: dict.activateMonthsLabel,
        inputValue: suggestedMonths,
        inputAttributes: { min: 1, max: 24 },
        showCancelButton: true
    });

    if (!months) return;

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + parseInt(months));

    const { error } = await supabaseClient
        .from('shops')
        .update({
            subscription_status: 'active',
            subscription_expires_at: expiresAt.toISOString(),
            payment_claimed_at: null,
            payment_claimed_months: null
        })
        .eq('id', shopId);

    if (error) {
        Swal.fire({ icon: 'error', text: 'Error' });
        return;
    }

    Swal.fire({ icon: 'success', text: dict.activateSuccess, timer: 1500, showConfirmButton: false });
    loadShops();
}

function adminLogout() {
    supabaseClient.auth.signOut().then(() => window.location.href = 'login.html');
}

checkAdminAuth();