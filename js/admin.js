// ==========================================
// لوحة الإدارة العامة — للمدير العام فقط
// ==========================================

const PRICE_PER_MONTH_DZD = 500;
let allShopsData = []; // نخزّن البيانات كاملة هنا، ونفلتر/نرتّب منها محلياً

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

/**
 * حساب حالة نشاط محل واحد (تطابق منطق shop_is_active فـ قاعدة البيانات)
 */
function computeShopState(s) {
    const now = new Date();
    if (s.suspended) return 'suspended';
    if (s.subscription_status === 'active' && s.subscription_expires_at && new Date(s.subscription_expires_at) > now) return 'active';
    if (s.subscription_status === 'trial' && s.trial_ends_at && new Date(s.trial_ends_at) > now) return 'trial';
    return 'expired';
}

async function loadShops() {
    const { data: shops, error } = await supabaseClient
        .from('shops')
        .select('id, name, subscription_status, trial_ends_at, subscription_expires_at, payment_claimed_at, payment_claimed_months, suspended, created_at')
        .order('created_at', { ascending: false });

    const { data: profiles } = await supabaseClient
        .from('profiles')
        .select('shop_id, email, role');

    if (error || !shops) {
        console.error(error);
        return;
    }

    // نجيب عدد العملاء/الطلبات/القطع لكل محل بثلاث استعلامات مجمّعة (بدل استعلام لكل محل)
    const [{ data: clientsAll }, { data: repairsAll }, { data: partsAll }] = await Promise.all([
        supabaseClient.from('clients').select('shop_id'),
        supabaseClient.from('repairs').select('shop_id'),
        supabaseClient.from('parts').select('shop_id')
    ]);

    const countBy = (rows, shopId) => (rows || []).filter(r => r.shop_id === shopId).length;

    allShopsData = shops.map(s => {
        const owner = (profiles || []).find(p => p.shop_id === s.id && p.role === 'owner');
        const memberCount = (profiles || []).filter(p => p.shop_id === s.id).length;
        return {
            ...s,
            ownerEmail: owner ? owner.email : '-',
            memberCount,
            state: computeShopState(s),
            clientsCount: countBy(clientsAll, s.id),
            repairsCount: countBy(repairsAll, s.id),
            partsCount: countBy(partsAll, s.id)
        };
    });

    renderStats();
    applyFilters();
}

function renderStats() {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    const total = allShopsData.length;
    const active = allShopsData.filter(s => s.state === 'active').length;
    const trial = allShopsData.filter(s => s.state === 'trial').length;
    const expiredOrSuspended = allShopsData.filter(s => s.state === 'expired' || s.state === 'suspended').length;
    const pending = allShopsData.filter(s => s.payment_claimed_at).length;
    const mrr = active * PRICE_PER_MONTH_DZD;

    document.getElementById('adminStats').innerHTML = `
        <div class="stat-box"><div class="stat-number">${total}</div><div class="stat-label">${dict.statTotalShops}</div></div>
        <div class="stat-box success"><div class="stat-number">${active}</div><div class="stat-label">${dict.statActiveShops}</div></div>
        <div class="stat-box"><div class="stat-number">${trial}</div><div class="stat-label">${dict.statTrialShops}</div></div>
        <div class="stat-box warn"><div class="stat-number">${expiredOrSuspended}</div><div class="stat-label">${dict.statExpiredShops}</div></div>
        <div class="stat-box warn"><div class="stat-number">${pending}</div><div class="stat-label">${dict.statPendingPayments}</div></div>
        <div class="stat-box success"><div class="stat-number">${mrr.toLocaleString()}</div><div class="stat-label">${dict.statMRR}</div></div>
    `;
}

/**
 * تطبيق البحث + الفلترة + الترتيب الذكي، ثم إعادة الرسم
 */
function applyFilters() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    let filtered = allShopsData.filter(s => {
        const matchesSearch = !query || s.name.toLowerCase().includes(query) || s.ownerEmail.toLowerCase().includes(query);
        if (!matchesSearch) return false;

        if (statusFilter === 'all') return true;
        if (statusFilter === 'pending') return !!s.payment_claimed_at;
        return s.state === statusFilter;
    });

    // ترتيب ذكي: أولاً المحلات اللي ادّعت دفع، ثم الأقرب للانتهاء، ثم الباقي
    filtered.sort((a, b) => {
        const aPending = a.payment_claimed_at ? 1 : 0;
        const bPending = b.payment_claimed_at ? 1 : 0;
        if (aPending !== bPending) return bPending - aPending;

        const aDate = a.state === 'active' ? a.subscription_expires_at : a.trial_ends_at;
        const bDate = b.state === 'active' ? b.subscription_expires_at : b.trial_ends_at;
        if (aDate && bDate) return new Date(aDate) - new Date(bDate);
        if (aDate) return -1;
        if (bDate) return 1;
        return 0;
    });

    renderTable(filtered);
}

function renderTable(shops) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;
    const tbody = document.getElementById('shopsTableBody');
    const now = new Date();

    if (shops.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:20px;color:#6b7280;">${dict.noShopsFound}</td></tr>`;
        return;
    }

    tbody.innerHTML = shops.map(s => {
        const relevantDate = s.state === 'active' ? s.subscription_expires_at : s.trial_ends_at;
        const daysLeft = relevantDate ? Math.ceil((new Date(relevantDate) - now) / (1000 * 60 * 60 * 24)) : null;
        const daysText = (s.state !== 'suspended' && daysLeft !== null) ? `${daysLeft} ${lang === 'ar' ? 'يوم' : 'j'}` : '-';

        const statusMap = {
            active: `<span class="role-badge" style="background:#dcfce7;color:#15803d;">${dict.statusActive}</span>`,
            trial: `<span class="role-badge role-employee">${dict.statusTrial}</span>`,
            expired: `<span class="role-badge" style="background:#fee2e2;color:#b91c1c;">${dict.statusExpired}</span>`,
            suspended: `<span class="role-badge" style="background:#e5e7eb;color:#374151;">${dict.statusSuspended}</span>`
        };

        const paymentBadge = s.payment_claimed_at
            ? `<div style="font-size:0.75rem;color:#b45309;margin-top:4px;">
                 <i class="fas fa-bell"></i> ${lang === 'ar' ? 'ادّعى دفع' : 'A déclaré'} ${s.payment_claimed_months} ${lang === 'ar' ? 'شهر' : 'mois'}
                 <br/>${new Date(s.payment_claimed_at).toLocaleString(lang === 'ar' ? 'ar-DZ' : 'fr-FR')}
               </div>`
            : '';

        const rowStyle = s.payment_claimed_at ? 'style="background:#fffbeb;"' : '';
        const shopNameSafe = s.name.replace(/'/g, "\\'");

        return `
            <tr ${rowStyle}>
                <td>
                    <div style="font-weight:700;">${s.name}</div>
                    <button class="btn-secondary" style="padding:3px 10px;font-size:0.75rem;margin-top:4px;" onclick="toggleDetails('${s.id}')">
                        <i class="fas fa-chevron-down"></i> ${dict.viewDetails}
                    </button>
                    <div id="details-${s.id}" style="display:none;font-size:0.78rem;color:#6b7280;margin-top:6px;">
                        ${s.clientsCount} ${dict.detailClients} · ${s.repairsCount} ${dict.detailRepairs} · ${s.partsCount} ${dict.detailParts}
                    </div>
                </td>
                <td>${s.ownerEmail}</td>
                <td>${s.memberCount}</td>
                <td>${statusMap[s.state]}${paymentBadge}</td>
                <td>${daysText}</td>
                <td>
                    <div style="display:flex;flex-direction:column;gap:5px;">
                        <button class="btn-primary" style="padding:6px 10px;font-size:0.8rem;" onclick="activateShop('${s.id}', '${shopNameSafe}', ${s.payment_claimed_months || 1})">${dict.activateBtn}</button>
                        ${s.suspended
                            ? `<button class="btn-secondary" style="padding:6px 10px;font-size:0.8rem;" onclick="reactivateShop('${s.id}', '${shopNameSafe}')">${dict.reactivateBtn}</button>`
                            : `<button class="btn-danger" style="padding:6px 10px;font-size:0.8rem;" onclick="suspendShop('${s.id}', '${shopNameSafe}')">${dict.suspendBtn}</button>`
                        }
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function toggleDetails(shopId) {
    const el = document.getElementById(`details-${shopId}`);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
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

async function suspendShop(shopId, shopName) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    const result = await Swal.fire({
        title: shopName,
        text: dict.confirmSuspend,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626'
    });

    if (!result.isConfirmed) return;

    const { error } = await supabaseClient.from('shops').update({ suspended: true }).eq('id', shopId);
    if (error) { Swal.fire({ icon: 'error', text: 'Error' }); return; }

    Swal.fire({ icon: 'success', text: dict.shopSuspended, timer: 1500, showConfirmButton: false });
    loadShops();
}

async function reactivateShop(shopId, shopName) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    const result = await Swal.fire({
        title: shopName,
        text: dict.confirmReactivate,
        icon: 'question',
        showCancelButton: true
    });

    if (!result.isConfirmed) return;

    const { error } = await supabaseClient.from('shops').update({ suspended: false }).eq('id', shopId);
    if (error) { Swal.fire({ icon: 'error', text: 'Error' }); return; }

    Swal.fire({ icon: 'success', text: dict.shopReactivated, timer: 1500, showConfirmButton: false });
    loadShops();
}

function adminLogout() {
    supabaseClient.auth.signOut().then(() => window.location.href = 'login.html');
}

checkAdminAuth();