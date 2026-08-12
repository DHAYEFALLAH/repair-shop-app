// ==========================================
// صفحة تتبّع الزبون — بحث آمن عبر دالة SQL
// ==========================================

const DEVICE_TYPE_KEYS = {
    phone: 'deviceTypePhone',
    laptop: 'deviceTypeLaptop',
    desktop: 'deviceTypeDesktop',
    tablet: 'deviceTypeTablet',
    other: 'deviceTypeOther'
};

const STATUS_KEYS = {
    received: 'statusReceived',
    diagnosing: 'statusDiagnosing',
    repairing: 'statusRepairing',
    waiting_parts: 'statusWaitingParts',
    ready: 'statusReady',
    delivered: 'statusDelivered'
};

async function searchRepairs(event) {
    event.preventDefault();

    const phone = document.getElementById('trackPhone').value.trim();
    const resultsEl = document.getElementById('trackResults');
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    resultsEl.innerHTML = `<p style="text-align:center;color:#6b7280;">${dict.searching}</p>`;

    // نستدعي الدالة الآمنة بدل قراءة الجدول مباشرة
    const { data, error } = await supabaseClient.rpc('search_repairs_by_phone', {
        p_phone: phone
    });

    if (error) {
        console.error(error);
        resultsEl.innerHTML = `<p class="no-clients" style="color:#dc2626;">${dict.trackError}</p>`;
        return false;
    }

    if (!data || data.length === 0) {
        resultsEl.innerHTML = `<p class="no-clients">${dict.noResults}</p>`;
        return false;
    }

    resultsEl.innerHTML = data.map(r => {
        const deviceLabel = dict[DEVICE_TYPE_KEYS[r.device_type]] || r.device_type;
        const statusLabel = dict[STATUS_KEYS[r.status]] || r.status;
        return `
            <div class="repair-card">
                <div class="repair-card-shop">
                    <i class="fas fa-store"></i> ${r.shop_name || ''}
                </div>
                <div class="repair-card-head">
                    <span>${deviceLabel} — ${r.device_model || ''}</span>
                    <span class="status-badge status-${r.status}">${statusLabel}</span>
                </div>
                <p class="repair-card-issue">${r.issue}</p>
                ${r.cost > 0 ? `<p class="repair-card-cost">${r.cost} DZD</p>` : ''}
            </div>
        `;
    }).join('');

    return false;
}