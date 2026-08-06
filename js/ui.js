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

    switch (page) {
        case 'settings':
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

            break;

        case 'clients':
            // ===== صفحة العملاء =====
            const clients = getClients();

            // ==== نموذج تعديل مخفي ====
            const editClientHtml = `
                <div id="editClientModal" class="modal-overlay" style="display: none;">
                    <div class="modal-content">
                        <h3 data-i18n="editClient">${dict.editClient}</h3>
                        <form id="editClientForm" onsubmit="return updateClient(event)">
                            <input type="hidden" id="editClientId" />
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editClientName" data-i18n="clientName">${dict.clientName}</label>
                                    <input type="text" id="editClientName" required />
                                </div>
                                <div class="form-group">
                                    <label for="editClientPhone" data-i18n="clientPhone">${dict.clientPhone}</label>
                                    <input type="tel" id="editClientPhone" required />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="editClientEmail" data-i18n="clientEmail">${dict.clientEmail}</label>
                                <input type="email" id="editClientEmail" />
                            </div>
                            <div class="modal-actions">
                                <button type="submit" class="btn-primary" data-i18n="updateBtn">${dict.updateBtn}</button>
                                <button type="button" class="btn-secondary" onclick="closeEditModal()" data-i18n="cancelBtn">${dict.cancelBtn}</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            //===============================================

            innerHTML = `
                <h1 data-i18n="clientsTitle">${dict.clientsTitle}</h1>
                <p data-i18n="clientsSubtitle">${dict.clientsSubtitle}</p>

                <!-- نموذج إضافة عميل -->
                <div class="client-form-container">
                    <h3 data-i18n="addClient">${dict.addClient}</h3>
                    <form id="clientForm" onsubmit="return addClient(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="clientName" data-i18n="clientName">${dict.clientName}</label>
                                <input type="text" id="clientName" required placeholder="${(lang === 'ar') ? 'الاسم الكامل' : 'Nom complet'}" />
                            </div>
                            <div class="form-group">
                                <label for="clientPhone" data-i18n="clientPhone">${dict.clientPhone}</label>
                                <input type="tel" id="clientPhone" required placeholder="${(lang === 'ar') ? 'رقم الهاتف' : 'Téléphone'}" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="clientEmail" data-i18n="clientEmail">${dict.clientEmail}</label>
                            <input type="email" id="clientEmail" placeholder="${(lang === 'ar') ? 'البريد الإلكتروني (اختياري)' : 'Email (optionnel)'}" />
                        </div>
                        <button type="submit" class="btn-primary" data-i18n="addBtn">${dict.addBtn}</button>
                    </form>
                </div>

                <!-- قائمة العملاء -->
                <div class="clients-list">
                    <h3 data-i18n="clientsList">${dict.clientsList}</h3>
                    ${clients.length === 0 ? `<p class="no-clients">${dict.noClients}</p>` : `
                    <div class="table-wrapper">
                        <table class="clients-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th data-i18n="clientName">${dict.clientName}</th>
                                    <th data-i18n="clientPhone">${dict.clientPhone}</th>
                                    <th data-i18n="clientEmail">${dict.clientEmail}</th>
                                    <th data-i18n="actions">${dict.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${clients.map((c, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${c.name}</td>
                                        <td>${c.phone}</td>
                                        <td>${c.email || '-'}</td>
                                        <td>
                                            <button class="btn-edit" onclick="editClient(${c.id})" title="${dict.edit}">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn-danger" onclick="deleteClient(${c.id})">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    `}
                </div>
            `;
            break;

        default:
            // باقي الصفحات (dashboard, repairs, inventory)
            const titles = {
                dashboard: { ar: 'الرئيسية', fr: 'Accueil' },
                repairs: { ar: 'الطلبات', fr: 'Demandes' },
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
            break;



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

// ==========================================
// دوال إدارة العملاء (Clients CRUD)
// ==========================================

const CLIENTS_STORAGE_KEY = 'clients';

/**
 * الحصول على قائمة العملاء من localStorage
 */
function getClients() {
    const data = localStorage.getItem(CLIENTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * حفظ قائمة العملاء في localStorage
 */
function saveClients(clients) {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
}

/**
 * إضافة عميل جديد
 */
function addClient(event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();

    if (!name || !phone) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return false;
    }

    const clients = getClients();
    const newClient = {
        id: Date.now(), // معرف فريد
        name: name,
        phone: phone,
        email: email || ''
    };
    clients.push(newClient);
    saveClients(clients);

    // إعادة تحميل صفحة العملاء لتحديث القائمة
    navigateTo('clients');
    return false;
}

/**
 * حذف عميل بواسطة المعرف
 */
function deleteClient(id) {
    if (!confirm('هل أنت متأكد من حذف هذا العميل؟')) return;

    let clients = getClients();
    clients = clients.filter(c => c.id !== id);
    saveClients(clients);

    // إعادة تحميل صفحة العملاء
    navigateTo('clients');
}

/**
 * فتح نموذج تعديل العميل
 */
function editClient(id) {
    const clients = getClients();
    const client = clients.find(c => c.id === id);
    if (!client) return;

    document.getElementById('editClientId').value = client.id;
    document.getElementById('editClientName').value = client.name;
    document.getElementById('editClientPhone').value = client.phone;
    document.getElementById('editClientEmail').value = client.email || '';

    document.getElementById('editClientModal').style.display = 'flex';
}

/**
 * إغلاق نموذج التعديل
 */
function closeEditModal() {
    document.getElementById('editClientModal').style.display = 'none';
}

/**
 * تحديث بيانات العميل
 */
function updateClient(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('editClientId').value);
    const name = document.getElementById('editClientName').value.trim();
    const phone = document.getElementById('editClientPhone').value.trim();
    const email = document.getElementById('editClientEmail').value.trim();

    if (!name || !phone) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return false;
    }

    let clients = getClients();
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) return false;

    clients[index] = { id, name, phone, email: email || '' };
    saveClients(clients);

    closeEditModal();
    navigateTo('clients');
    return false;
}

// ==========================================


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