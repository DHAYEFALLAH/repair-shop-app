const translations = {
  ar: {
    title: "ورشة الإصلاح",
    subtitle: "تسيير طلبات إصلاح الهواتف والحواسيب",
    menuTitle: "ورشة الإصلاح",
    menuDashboard: "الرئيسية",
    menuRepairs: "الطلبات",
    menuClients: "العملاء",
    menuInventory: "المخزون",
    menuSettings: "الإعدادات",
    logout: "تسجيل الخروج",
    welcome: "مرحباً بك في ورشة الإصلاح – يمكنك من خلال القائمة الجانبية إدارة جميع عملياتك.",
    settingsSubtitle: "اختر لغة التطبيق",
    loginTitle: "تسجيل الدخول",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    loginButton: "دخول",
    loginHint: "استخدم admin / admin",
    loginError: "اسم المستخدم أو كلمة المرور غير صحيحة",
    clientsTitle: "العملاء",
    clientsSubtitle: "إدارة بيانات العملاء",
    addClient: "إضافة عميل جديد",
    clientName: "الاسم",
    clientPhone: "الهاتف",
    clientEmail: "البريد الإلكتروني",
    addBtn: "إضافة",
    clientsList: "قائمة العملاء",
    noClients: "لا يوجد عملاء مسجلون حتى الآن",
    actions: "إجراءات",
    edit: "تعديل",
    delete: "حذف",
    editClient: "تعديل بيانات العميل",
    updateBtn: "تحديث",
    cancelBtn: "إلغاء",

    // ===== الطلبات/التذاكر =====
    repairsTitle: "طلبات الإصلاح",
    repairsSubtitle: "متابعة أجهزة الزبائن قيد الإصلاح",
    addRepair: "إضافة طلب جديد",
    selectClient: "اختر العميل",
    noClientsWarning: "لا يوجد عملاء مسجلون. أضف عميلاً أولاً من صفحة العملاء.",
    deviceType: "نوع الجهاز",
    deviceTypePhone: "هاتف",
    deviceTypeLaptop: "حاسوب محمول",
    deviceTypeDesktop: "حاسوب مكتبي",
    deviceTypeTablet: "تابلت",
    deviceTypeOther: "أخرى",
    deviceModel: "الماركة والموديل",
    issueDescription: "وصف العطل",
    estimatedCost: "التكلفة التقديرية",
    repairStatus: "الحالة",
    statusReceived: "تم الاستلام",
    statusDiagnosing: "قيد الفحص",
    statusRepairing: "قيد الإصلاح",
    statusWaitingParts: "بانتظار قطع الغيار",
    statusReady: "جاهز للاستلام",
    statusDelivered: "تم التسليم",
    repairsList: "قائمة الطلبات",
    noRepairs: "لا توجد طلبات إصلاح حتى الآن",
    device: "الجهاز",
    client: "العميل",

    // ===== المخزون =====
    inventoryTitle: "المخزون",
    inventorySubtitle: "إدارة قطع الغيار والمستلزمات",
    addPart: "إضافة قطعة جديدة",
    partName: "اسم القطعة",
    partQuantity: "الكمية",
    partPrice: "سعر الوحدة",
    partsList: "قائمة القطع",
    noParts: "لا توجد قطع مسجلة حتى الآن",
    lowStock: "مخزون منخفض",
    totalValue: "القيمة الإجمالية للمخزون"
  },
  fr: {
    title: "Atelier de Réparation",
    subtitle: "Gestion des réparations de téléphones et ordinateurs",
    menuTitle: "Atelier de Réparation",
    menuDashboard: "Accueil",
    menuRepairs: "Demandes",
    menuClients: "Clients",
    menuInventory: "Stock",
    menuSettings: "Paramètres",
    logout: "Déconnexion",
    welcome: "Bienvenue à l'atelier de réparation – gérez toutes vos opérations via le menu latéral.",
    settingsSubtitle: "Choisissez la langue de l'application",
    loginTitle: "Connexion",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    loginButton: "Se connecter",
    loginHint: "Utilisez admin / admin",
    loginError: "Nom d'utilisateur ou mot de passe incorrect",
    clientsTitle: "Clients",
    clientsSubtitle: "Gestion des clients",
    addClient: "Ajouter un client",
    clientName: "Nom",
    clientPhone: "Téléphone",
    clientEmail: "Email",
    addBtn: "Ajouter",
    clientsList: "Liste des clients",
    noClients: "Aucun client enregistré pour le moment",
    actions: "Actions",
    edit: "Modifier",
    delete: "Supprimer",
    editClient: "Modifier le client",
    updateBtn: "Mettre à jour",
    cancelBtn: "Annuler",

    // ===== Réparations =====
    repairsTitle: "Demandes de réparation",
    repairsSubtitle: "Suivi des appareils des clients en réparation",
    addRepair: "Ajouter une demande",
    selectClient: "Choisir un client",
    noClientsWarning: "Aucun client enregistré. Ajoutez d'abord un client.",
    deviceType: "Type d'appareil",
    deviceTypePhone: "Téléphone",
    deviceTypeLaptop: "Ordinateur portable",
    deviceTypeDesktop: "Ordinateur de bureau",
    deviceTypeTablet: "Tablette",
    deviceTypeOther: "Autre",
    deviceModel: "Marque et modèle",
    issueDescription: "Description de la panne",
    estimatedCost: "Coût estimé",
    repairStatus: "Statut",
    statusReceived: "Reçu",
    statusDiagnosing: "Diagnostic en cours",
    statusRepairing: "En réparation",
    statusWaitingParts: "En attente de pièces",
    statusReady: "Prêt",
    statusDelivered: "Livré",
    repairsList: "Liste des demandes",
    noRepairs: "Aucune demande de réparation pour le moment",
    device: "Appareil",
    client: "Client",

    // ===== Stock =====
    inventoryTitle: "Stock",
    inventorySubtitle: "Gestion des pièces et fournitures",
    addPart: "Ajouter une pièce",
    partName: "Nom de la pièce",
    partQuantity: "Quantité",
    partPrice: "Prix unitaire",
    partsList: "Liste des pièces",
    noParts: "Aucune pièce enregistrée pour le moment",
    lowStock: "Stock faible",
    totalValue: "Valeur totale du stock"
  }
};

function setLanguage(lang) {
  const dict = translations[lang] || translations.ar;

  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  // تحديث القائمة المنسدلة في الإعدادات (إن وجدت)
  const select = document.getElementById('languageSelect');
  if (select) {
    select.value = lang;
  }

  // تحديث رسالة الخطأ في login (إن كانت ظاهرة)
  const errorEl = document.getElementById('loginError');
  if (errorEl && errorEl.style.display !== 'none') {
    errorEl.textContent = dict.loginError || (lang === 'ar' ? 'بيانات غير صحيحة' : 'Identifiants incorrects');
  }

  localStorage.setItem('lang', lang);
}

const savedLang = localStorage.getItem('lang') || 'ar';
setLanguage(savedLang);