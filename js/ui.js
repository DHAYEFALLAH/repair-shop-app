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

                ${editClientHtml}
            `;
            break;

            case 'repairs': {
            // ===== صفحة الطلبات/التذاكر =====
            const clientsList = getClients();
            const repairs = getRepairs();

            // إذا ما كايناش عملاء، ما نقدروش نضيفو طلب
            if (clientsList.length === 0) {
                innerHTML = `
                    <h1 data-i18n="repairsTitle">${dict.repairsTitle}</h1>
                    <p data-i18n="repairsSubtitle">${dict.repairsSubtitle}</p>
                    <div class="warning-box" data-i18n="noClientsWarning">${dict.noClientsWarning}</div>
                `;
                break;
            }

            const deviceTypes = [
                { value: 'phone', key: 'deviceTypePhone' },
                { value: 'laptop', key: 'deviceTypeLaptop' },
                { value: 'desktop', key: 'deviceTypeDesktop' },
                { value: 'tablet', key: 'deviceTypeTablet' },
                { value: 'other', key: 'deviceTypeOther' }
            ];

            const statusList = ['received', 'diagnosing', 'repairing', 'waiting_parts', 'ready', 'delivered'];
            const statusKeyMap = {
                received: 'statusReceived',
                diagnosing: 'statusDiagnosing',
                repairing: 'statusRepairing',
                waiting_parts: 'statusWaitingParts',
                ready: 'statusReady',
                delivered: 'statusDelivered'
            };

            innerHTML = `
                <h1 data-i18n="repairsTitle">${dict.repairsTitle}</h1>
                <p data-i18n="repairsSubtitle">${dict.repairsSubtitle}</p>

                <div class="client-form-container">
                    <h3 data-i18n="addRepair">${dict.addRepair}</h3>
                    <form id="repairForm" onsubmit="return addRepair(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="repairClient" data-i18n="selectClient">${dict.selectClient}</label>
                                <select id="repairClient" required>
                                    ${clientsList.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="repairDeviceType" data-i18n="deviceType">${dict.deviceType}</label>
                                <select id="repairDeviceType">
                                    ${deviceTypes.map(d => `<option value="${d.value}">${dict[d.key]}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="repairDeviceModel" data-i18n="deviceModel">${dict.deviceModel}</label>
                                <input type="text" id="repairDeviceModel" placeholder="${lang === 'ar' ? 'مثال: iPhone 12' : 'ex: iPhone 12'}" />
                            </div>
                            <div class="form-group">
                                <label for="repairCost" data-i18n="estimatedCost">${dict.estimatedCost}</label>
                                <input type="number" id="repairCost" min="0" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="repairIssue" data-i18n="issueDescription">${dict.issueDescription}</label>
                            <input type="text" id="repairIssue" required />
                        </div>
                        <button type="submit" class="btn-primary" data-i18n="addBtn">${dict.addBtn}</button>
                    </form>
                </div>

                <div class="clients-list">
                    <h3 data-i18n="repairsList">${dict.repairsList}</h3>
                    ${repairs.length === 0 ? `<p class="no-clients" data-i18n="noRepairs">${dict.noRepairs}</p>` : `
                    <div class="table-wrapper">
                        <table class="clients-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th data-i18n="client">${dict.client}</th>
                                    <th data-i18n="device">${dict.device}</th>
                                    <th data-i18n="issueDescription">${dict.issueDescription}</th>
                                    <th data-i18n="repairStatus">${dict.repairStatus}</th>
                                    <th data-i18n="actions">${dict.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${repairs.map((r, index) => {
                                    const clientObj = clientsList.find(c => c.id === r.clientId);
                                    const clientName = clientObj ? clientObj.name : '-';
                                    const deviceLabel = dict[deviceTypes.find(d => d.value === r.deviceType)?.key] || r.deviceType;
                                    return `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>${clientName}</td>
                                            <td>${deviceLabel} — ${r.deviceModel || ''}</td>
                                            <td>${r.issue}</td>
                                            <td>
                                                <select class="status-select status-${r.status}" onchange="updateRepairStatus(${r.id}, this.value)">
                                                    ${statusList.map(s => `<option value="${s}" ${r.status === s ? 'selected' : ''}>${dict[statusKeyMap[s]]}</option>`).join('')}
                                                </select>
                                            </td>
                                            <td>
                                                <button class="btn-danger" onclick="deleteRepair(${r.id})">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    `}
                </div>
            `;
            break;
        }

        case 'inventory': {
            // ===== صفحة المخزون =====
            const LOW_STOCK_THRESHOLD = 5;
            const parts = getParts();
            const totalValue = parts.reduce((sum, p) => sum + (p.quantity * p.price), 0);

            innerHTML = `
                <h1 data-i18n="inventoryTitle">${dict.inventoryTitle}</h1>
                <p data-i18n="inventorySubtitle">${dict.inventorySubtitle}</p>

                <div class="client-form-container">
                    <h3 data-i18n="addPart">${dict.addPart}</h3>
                    <form id="partForm" onsubmit="return addPart(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="partName" data-i18n="partName">${dict.partName}</label>
                                <input type="text" id="partName" required />
                            </div>
                            <div class="form-group">
                                <label for="partQuantity" data-i18n="partQuantity">${dict.partQuantity}</label>
                                <input type="number" id="partQuantity" min="0" value="0" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="partPrice" data-i18n="partPrice">${dict.partPrice}</label>
                            <input type="number" id="partPrice" min="0" step="0.01" value="0" required />
                        </div>
                        <button type="submit" class="btn-primary" data-i18n="addBtn">${dict.addBtn}</button>
                    </form>
                </div>

                ${parts.length > 0 ? `
                <div class="parts-summary">
                    <span data-i18n="totalValue">${dict.totalValue}</span>
                    <span class="value">${totalValue.toLocaleString()}</span>
                </div>` : ''}

                <div class="clients-list">
                    <h3 data-i18n="partsList">${dict.partsList}</h3>
                    ${parts.length === 0 ? `<p class="no-clients" data-i18n="noParts">${dict.noParts}</p>` : `
                    <div class="table-wrapper">
                        <table class="clients-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th data-i18n="partName">${dict.partName}</th>
                                    <th data-i18n="partQuantity">${dict.partQuantity}</th>
                                    <th data-i18n="partPrice">${dict.partPrice}</th>
                                    <th data-i18n="actions">${dict.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${parts.map((p, index) => {
                                    const isLow = p.quantity <= LOW_STOCK_THRESHOLD;
                                    return `
                                        <tr class="${isLow ? 'low-stock-row' : ''}">
                                            <td>${index + 1}</td>
                                            <td>
                                                ${isLow ? `<span class="low-stock-badge" data-i18n="lowStock">${dict.lowStock}</span>` : ''}
                                                ${p.name}
                                            </td>
                                            <td>
                                                <div class="qty-control">
                                                    <button type="button" class="qty-btn" onclick="adjustPartQuantity(${p.id}, -1)">−</button>
                                                    <span class="qty-value">${p.quantity}</span>
                                                    <button type="button" class="qty-btn" onclick="adjustPartQuantity(${p.id}, 1)">+</button>
                                                </div>
                                            </td>
                                            <td>${p.price.toLocaleString()}</td>
                                            <td>
                                                <button class="btn-danger" onclick="deletePart(${p.id})">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    `}
                </div>
            `;
            break;
        }

        case 'dashboard': {
            const clientsList = getClients();
            const repairs = getRepairs();
            const parts = getParts();

            const activeRepairs = repairs.filter(r => r.status !== 'delivered').length;
            const readyRepairs = repairs.filter(r => r.status === 'ready').length;
            const revenue = repairs
                .filter(r => r.status === 'delivered')
                .reduce((sum, r) => sum + (parseFloat(r.cost) || 0), 0);
            const lowStockCount = parts.filter(p => p.quantity <= 5).length;

            const statusKeyMap = {
                received: 'statusReceived',
                diagnosing: 'statusDiagnosing',
                repairing: 'statusRepairing',
                waiting_parts: 'statusWaitingParts',
                ready: 'statusReady',
                delivered: 'statusDelivered'
            };

            const recent = [...repairs].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

            innerHTML = `
                <h1 data-i18n="title">${dict.title}</h1>
                <p data-i18n="welcome">${dict.welcome}</p>

                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="stat-number">${activeRepairs}</div>
                        <div class="stat-label" data-i18n="statActiveRepairs">${dict.statActiveRepairs}</div>
                    </div>
                    <div class="stat-box success">
                        <div class="stat-number">${readyRepairs}</div>
                        <div class="stat-label" data-i18n="statReady">${dict.statReady}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${revenue.toLocaleString()}</div>
                        <div class="stat-label" data-i18n="statRevenue">${dict.statRevenue}</div>
                    </div>
                    <div class="stat-box ${lowStockCount > 0 ? 'warn' : ''}">
                        <div class="stat-number">${lowStockCount}</div>
                        <div class="stat-label" data-i18n="statLowStock">${dict.statLowStock}</div>
                    </div>
                </div>

                <div class="recent-section">
                    <h3 data-i18n="recentRepairs">${dict.recentRepairs}</h3>
                    ${recent.length === 0 ? `<p class="no-clients" data-i18n="noRecentRepairs">${dict.noRecentRepairs}</p>` : recent.map(r => {
                        const clientObj = clientsList.find(c => c.id === r.clientId);
                        const clientName = clientObj ? clientObj.name : '-';
                        return `
                            <div class="recent-item">
                                <div class="recent-main">
                                    <span class="recent-client">${clientName}</span>
                                    <span class="recent-device">${r.deviceModel || ''} — ${r.issue}</span>
                                </div>
                                <span class="status-badge status-${r.status}">${dict[statusKeyMap[r.status]]}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            break;
        }

        default:
            // باقي الصفحات (dashboard, repairs, inventory)
            const titles = {
                dashboard: { ar: 'الرئيسية', fr: 'Accueil' }
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
// دوال SweetAlert2 (نوافذ منبثقة احترافية)
// ==========================================

/**
 * عرض نافذة تأكيد (حذف، عمليات خطيرة)
 * @param {string} message - النص المعروض
 * @param {function} onConfirm - الدالة المنفذة عند التأكيد
 */
function showConfirmDialog(message, onConfirm) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    Swal.fire({
        title: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: dict.confirmBtn || 'تأكيد',
        cancelButtonText: dict.cancelBtn || 'إلغاء',
        reverseButtons: lang === 'ar' // في العربية: تأكيد على اليمين
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm();
        }
    });
}

/**
 * عرض نافذة تنبيه (رسائل خطأ أو تحذير)
 * @param {string} message - النص المعروض
 * @param {string} icon - نوع الأيقونة: 'error', 'warning', 'info', 'success'
 */
function showAlert(message, icon = 'error') {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    Swal.fire({
        title: message,
        icon: icon,
        confirmButtonColor: '#1e2a4a',
        confirmButtonText: dict.okBtn || 'موافق'
    });
}

/**
 * عرض نافذة نجاح (عملية ناجحة)
 * @param {string} message - النص المعروض
 */
function showSuccess(message) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    Swal.fire({
        title: message,
        icon: 'success',
        confirmButtonColor: '#16a34a',
        confirmButtonText: dict.okBtn || 'موافق',
        timer: 2000,
        timerProgressBar: true
    });
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
 * حذف عميل بواسطة المعرف مع التحقق من الطلبات المرتبطة
 */
function deleteClient(id) {
    const repairs = getRepairs();
    const clientRepairs = repairs.filter(r => r.clientId === id);
    
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;
    
    // حالة 1: لديه طلبات
    if (clientRepairs.length > 0) {
        // استبدال {count} بعدد الطلبات
        const msg = dict.deleteClientHasRepairs.replace('{count}',clientRepairs.length);
        showAlert(msg,'error');
        return;
    }
    
    // حالة 2: ليس لديه أي طلبات => حذف عادي
    showConfirmDialog(dict.confirmDeleteClients,function() {
        let clients = getClients();
        clients = clients.filter(c => c.id !== id);
        saveClients(clients);
        navigateTo('clients');
        showSuccess(dict.clientDeleted || 'تم حذف العميل بنجاح.');
    })
    
}
//==================================================

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


// ==========================================
// دوال إدارة طلبات الإصلاح (Repairs CRUD)
// ==========================================

const REPAIRS_STORAGE_KEY = 'repairs';

function getRepairs() {
    const data = localStorage.getItem(REPAIRS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveRepairs(repairs) {
    localStorage.setItem(REPAIRS_STORAGE_KEY, JSON.stringify(repairs));
}

function addRepair(event) {
    event.preventDefault();

    const clientId = parseInt(document.getElementById('repairClient').value);
    const deviceType = document.getElementById('repairDeviceType').value;
    const deviceModel = document.getElementById('repairDeviceModel').value.trim();
    const cost = document.getElementById('repairCost').value;
    const issue = document.getElementById('repairIssue').value.trim();

    if (!issue) {
        alert('الرجاء وصف العطل');
        return false;
    }

    const repairs = getRepairs();
    repairs.push({
        id: Date.now(),
        clientId: clientId,
        deviceType: deviceType,
        deviceModel: deviceModel,
        cost: cost || 0,
        issue: issue,
        status: 'received',
        createdAt: Date.now()
    });
    saveRepairs(repairs);

    navigateTo('repairs');
    return false;
}

function deleteRepair(id) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;

    showConfirmDialog(dict.confirmDeleteRepair,function() {
        let repairs = getRepairs();
        repairs = repairs.filter(r => r.id !== id);
        saveRepairs(repairs);
        navigateTo('repairs');
        showSuccess(dict.repairDeleted || 'تم حذف الطلب بنجاح');
    })
    
}

function updateRepairStatus(id, newStatus) {
    const repairs = getRepairs();
    const repair = repairs.find(r => r.id === id);
    if (!repair) return;
    repair.status = newStatus;
    saveRepairs(repairs);
    navigateTo('repairs');
}
// ==========================================


// ==========================================
// دوال إدارة المخزون (Inventory CRUD)
// ==========================================

const PARTS_STORAGE_KEY = 'parts';

function getParts() {
    const data = localStorage.getItem(PARTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveParts(parts) {
    localStorage.setItem(PARTS_STORAGE_KEY, JSON.stringify(parts));
}

function addPart(event) {
    event.preventDefault();

    const name = document.getElementById('partName').value.trim();
    const quantity = parseInt(document.getElementById('partQuantity').value);
    const price = parseFloat(document.getElementById('partPrice').value);

    if (!name) {
        alert('الرجاء إدخال اسم القطعة');
        return false;
    }

    const parts = getParts();
    parts.push({
        id: Date.now(),
        name: name,
        quantity: quantity || 0,
        price: price || 0
    });
    saveParts(parts);

    navigateTo('inventory');
    return false;
}

function deletePart(id) {
    const lang = document.documentElement.lang || 'ar';
    const dict = (lang === 'ar') ? translations.ar : translations.fr;
    
    showConfirmDialog(dict.confirmDeletePart, function() {
        let parts = getParts();
        parts = parts.filter(p => p.id !== id);
        saveParts(parts);
        navigateTo('inventory');
        showSuccess(dict.partDeleted || 'تم حذف القطعة بنجاح');
    });
}

function adjustPartQuantity(id, delta) {
    const parts = getParts();
    const part = parts.find(p => p.id === id);
    if (!part) return;
    part.quantity = Math.max(0, part.quantity + delta);
    saveParts(parts);
    navigateTo('inventory');
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