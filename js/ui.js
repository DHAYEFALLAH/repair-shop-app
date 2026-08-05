// ==========================================
// تفاعلات واجهة المستخدم (UI Interactions)
// ==========================================

/**
 * فتح/غلق القائمة الجانبية (للشاشات الصغيرة)
 */
function toggleSideMenu() {
    const menu = document.getElementById('sideMenu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

/**
 * إغلاق القائمة تلقائياً عند النقر على رابط (للجوال)
 */
function setupAutoCloseMenu() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const menu = document.getElementById('sideMenu');
                if (menu) menu.classList.remove('open');
            }
        });
    });
}

/**
 * التنقل بين الصفحات (محاكاة)
 */
function navigateTo(page) {
    // تحديث العنصر النشط في القائمة
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    const activeItem = document.querySelector(`.menu-item[data-page="${page}"]`);
    if (activeItem) activeItem.classList.add('active');

    const content = document.getElementById('pageContent');
    if (!content) return;

    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    let innerHTML = '';

    if (page === 'settings') {
        // ===== صفحة الإعدادات مع قائمة منسدلة للغة =====
        const selected = lang;
        innerHTML = `
            <h1 data-i18n="menuSettings">${dict.menuSettings}</h1>
            <p data-i18n="settingsSubtitle">${(lang === 'ar') ? 'اختر لغة التطبيق' : 'Choisissez la langue de l\'application'}</p>
            <div class="settings-container">
                <label for="languageSelect" class="settings-label">
                    ${(lang === 'ar') ? 'اللغة' : 'Langue'}
                </label>
                <select id="languageSelect" class="language-select">
                    <option value="ar" ${selected === 'ar' ? 'selected' : ''}>العربية</option>
                    <option value="fr" ${selected === 'fr' ? 'selected' : ''}>Français</option>
                </select>
            </div>
            <div class="settings-info">
                <p>${(lang === 'ar') ? 'يمكنك تغيير اللغة في أي وقت، وسيتم حفظ اختيارك تلقائياً.' : 'Vous pouvez changer la langue à tout moment, votre choix sera sauvegardé automatiquement.'}</p>
            </div>
        `;
    } else {
        // باقي الصفحات
        const titles = {
            dashboard: { ar: 'الرئيسية', fr: 'Accueil' },
            repairs: { ar: 'الطلبات', fr: 'Demandes' },
            clients: { ar: 'العملاء', fr: 'Clients' },
            inventory: { ar: 'المخزون', fr: 'Stock' }
        };
        const pageName = titles[page]?.[lang] || page;
        innerHTML = `
            <h1>${pageName}</h1>
            <p data-i18n="subtitle">${(lang === 'ar') ? 'هذه صفحة ' + pageName : 'Ceci est la page ' + pageName}</p>
            <div class="page-placeholder">
                <p>${(lang === 'ar') ? 'محتوى الصفحة قيد التطوير...' : 'Contenu de la page en cours de développement...'}</p>
            </div>
        `;
    }

    content.innerHTML = innerHTML;

    // إعادة تطبيق الترجمة على العناصر التي تحمل data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    // إضافة مستمع الحدث للقائمة المنسدلة (إذا كانت موجودة)
    const select = document.getElementById('languageSelect');
    if (select) {
        select.addEventListener('change', function() {
            const newLang = this.value;
            setLanguage(newLang);
            // إعادة تحميل صفحة الإعدادات لتحديث النصوص والقيمة المحددة
            navigateTo('settings');
        });
    }
}

/**
 * تهيئة القائمة عند تحميل الصفحة
 */
function initActivePage() {
    const firstActive = document.querySelector('.menu-item.active');
    if (firstActive) {
        const page = firstActive.getAttribute('data-page');
        if (page) navigateTo(page);
    }
}

// ==========================================
// تشغيل الإعدادات التلقائية
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    setupAutoCloseMenu();
    initActivePage();
});