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
    
    loginError: "اسم المستخدم أو كلمة المرور غير صحيحة",
    clientsTitle: "العملاء",
    clientsSubtitle: "إدارة بيانات العملاء",
    addClient: "إضافة عميل جديد",
    clientName: "الاسم",
    clientPhone: "الهاتف",
    clientEmail: "البريد الإلكتروني",
    addBtn: "إضافة",
    clientsList: "قائمة العملاء",
    // ===== رسائل التحذير والتأكيد للزبائن =====
    confirmDeleteClients: "هل أنت متأكد من حذف هذا العميل؟",
    deleteClientHasRepairs: "لا يمكن حذف هذا العميل لأنه مرتبط بـ {count} طلب(ات). قم بحذف الطلبات أولاً.",
    clientDeleted: "تم حذف العميل بنجاح",
    noClients: "لا يوجد عملاء مسجلون حتى الآن",
    actions: "إجراءات",
    edit: "تعديل",
    delete: "حذف",
    editClient: "تعديل بيانات العميل",
    updateBtn: "تحديث",
    cancelBtn: "إلغاء",
    confirmBtn: "تأكيد",
    okBtn: "موافق",

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
    confirmDeleteRepair: "هل أنت متأكد من حذف هذا الطلب؟",
    repairDeleted: "تم حذف الطلب بنجاح",

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
    totalValue: "القيمة الإجمالية للمخزون",
    confirmDeletePart: "هل أنت متأكد من حذف هذه القطعة؟",
    partDeleted: "تم حذف القطعة بنجاح",

    // ===== لوحة الإحصائيات =====
    statActiveRepairs: "طلبات نشطة",
    statReady: "جاهزة للاستلام",
    statRevenue: "إيرادات الطلبات المسلَّمة",
    statClients: "إجمالي العملاء",
    statLowStock: "قطع بمخزون منخفض",
    recentRepairs: "آخر الطلبات",
    noRecentRepairs: "لا توجد طلبات بعد",

     // ===== صفحة تتبّع الزبون =====
    trackTitle: "تتبّع حالة الإصلاح",
    trackSubtitle: "أدخل رقم هاتفك لمعرفة حالة جهازك",
    searchBtn: "بحث",
    searching: "جاري البحث...",
    noResults: "لم يتم العثور على أي طلب بهذا الرقم",
    trackError: "حدث خطأ، حاول مجدداً",

    // ===== إيصال الطباعة =====
    printBtn: "طباعة",
    receiptTitle: "إيصال استلام جهاز للإصلاح",
    receiptTicketNo: "رقم الطلب",
    receiptDate: "التاريخ",
    receiptClient: "الزبون",
    receiptPhone: "الهاتف",
    receiptDevice: "الجهاز",
    receiptIssue: "العطل",
    receiptCost: "التكلفة التقديرية",
    receiptFooter: "يرجى الاحتفاظ بهذا الإيصال لاستلام الجهاز عند الانتهاء من الإصلاح.",

    // ===== التقارير =====
    menuReports: "التقارير",
    reportsTitle: "التقارير والإحصائيات",
    reportsSubtitle: "نظرة شاملة على أداء المحل",
    reportTotalRepairs: "إجمالي الطلبات",
    reportDeliveredRepairs: "طلبات مسلَّمة",
    reportTotalRevenue: "إجمالي الإيرادات",
    reportAvgCost: "متوسط تكلفة الطلب",
    reportByStatus: "توزيع الطلبات حسب الحالة",
    reportByDevice: "توزيع الطلبات حسب نوع الجهاز",
    reportInventoryValue: "القيمة الإجمالية للمخزون الحالي",

    // ===== تسجيل محل جديد =====
    signupTitle: "إنشاء حساب محل جديد",
    signupShopName: "اسم المحل",
    signupButton: "إنشاء الحساب",
    signupError: "حدث خطأ أثناء إنشاء الحساب، حاول مجدداً",
    noAccount: "ليس لديك حساب؟",
    signupLink: "أنشئ محلك الآن",
    haveAccount: "لديك حساب بالفعل؟",
    loginLink: "سجّل الدخول",

    // ===== دعوة أعضاء الفريق =====
    joinTeamTitle: "انضمام إلى فريق المحل",
    invalidInvite: "رابط الدعوة غير صالح",

    // ===== إدارة الفريق =====
    menuTeam: "الفريق",
    teamTitle: "أعضاء الفريق",
    teamSubtitle: "إدارة الأشخاص الذين يستعملون حساب محلك",
    inviteLinkTitle: "رابط دعوة عضو جديد",
    inviteLinkDesc: "شارك هذا الرابط مع أي شخص تريده أن ينضم لفريق محلك",
    copyLink: "نسخ الرابط",
    linkCopied: "تم نسخ الرابط",
    roleOwner: "مالك",
    roleEmployee: "موظف",
    removeMember: "إزالة",
    confirmRemoveMember: "هل أنت متأكد من إزالة هذا العضو من المحل؟",
    memberRemoved: "تم إزالة العضو بنجاح",
    ownerOnlyFeature: "هذه الميزة متاحة فقط لمالك المحل",
    ownerOnlyFeature: "هذه الميزة متاحة فقط لمالك المحل",
    accountRemoved: "تم إزالة حسابك من هذا المحل. تواصل مع صاحب المحل إذا كان هذا خطأً.",
    accountRemoved: "تم إزالة حسابك من هذا المحل. تواصل مع صاحب المحل إذا كان هذا خطأً.",
    existingAccountWrongPassword: "هذا البريد مسجّل مسبقاً بكلمة سر مختلفة. أدخل كلمة السر الصحيحة لهذا الحساب.",
    alreadyInShop: "هذا الحساب مرتبط بمحل آخر بالفعل ولا يمكن ربطه بمحلين فـ نفس الوقت.",

    // ===== الاشتراك =====
    trialEndedTitle: "انتهت الفترة التجريبية",
    trialEndedDesc: "انتهت فترتك التجريبية المجانية (14 يوماً). للاستمرار فـ استعمال التطبيق، يرجى التواصل معنا لتفعيل اشتراكك.",
    subscriptionExpiredTitle: "انتهى الاشتراك",
    subscriptionExpiredDesc: "انتهت صلاحية اشتراكك. يرجى التواصل معنا لتجديده والاستمرار فـ استعمال التطبيق.",
    contactToRenew: "للتفعيل أو التجديد، تواصل معنا عبر:",
    trialEndingSoon: "تبقّى لك {days} يوم على انتهاء الفترة التجريبية. تواصل معنا لتفعيل اشتراكك وتجنّب توقف الخدمة.",

    // ===== لوحة الإدارة =====
    adminTitle: "لوحة إدارة المحلات",
    adminSubtitle: "نظرة شاملة على كل المحلات المسجّلة",
    colShop: "المحل",
    colOwner: "المالك",
    colMembers: "الأعضاء",
    colStatus: "الحالة",
    colDaysLeft: "الأيام المتبقية",
    statusTrial: "فترة تجريبية",
    statusActive: "نشط",
    statusExpired: "منتهي",
    activateBtn: "تفعيل",
    activateMonthsLabel: "عدد الأشهر",
    activateSuccess: "تم تفعيل الاشتراك بنجاح",
    accessDenied: "هذه الصفحة غير متاحة لك",
    subscribeNowBtn: "اشترك الآن",
    chooseMonthsLabel: "عدد الأشهر (500 دج شهرياً)",
    billingError: "حدث خطأ أثناء تجهيز الدفع، حاول مجدداً",

    // ===== الدفع اليدوي =====
    payManualTitle: "طريقة الدفع",
    payManualDesc: "حوّل المبلغ عبر BaridiMob للرقم التالي، ثم اضغط \"لقد دفعت\"",
    baridiMobNumber: "رقم BaridiMob",
    monthlyPriceNote: "500 دج شهرياً",
    iPaidBtn: "لقد دفعت",
    choosePaidMonthsLabel: "كم شهر دفعت؟",
    paymentClaimSuccess: "تم إرسال إشعارك بنجاح. سيتم تفعيل اشتراكك خلال وقت قصير.",
    contactFastNote: "للتسريع، تواصل معنا مباشرة عبر واتساب:",
    paymentPendingNote: "تم إرسال إشعار الدفع، بانتظار التفعيل من طرفنا..."
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
    
    loginError: "Nom d'utilisateur ou mot de passe incorrect",
    clientsTitle: "Clients",
    clientsSubtitle: "Gestion des clients",
    addClient: "Ajouter un client",
    clientName: "Nom",
    clientPhone: "Téléphone",
    clientEmail: "Email",
    addBtn: "Ajouter",
    clientsList: "Liste des clients",
     // ===== Messages d'alerte et de confirmation pour les clients =====
    confirmDeleteClients: "Êtes-vous sûr de vouloir supprimer ce client ?",
    deleteClientHasRepairs: "Impossible de supprimer ce client car il est associé à {count} demande(s). Supprimez d'abord les demandes.",
    clientDeleted: "Client supprimé avec succès",
    noClients: "Aucun client enregistré pour le moment",
    actions: "Actions",
    edit: "Modifier",
    delete: "Supprimer",
    editClient: "Modifier le client",
    updateBtn: "Mettre à jour",
    cancelBtn: "Annuler",
    confirmBtn: "Confirmer",
    okBtn: "OK",

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
    confirmDeleteRepair: "Êtes-vous sûr de supprimer cette demande ?",
    repairDeleted: "Demande supprimée avec succès",

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
    totalValue: "Valeur totale du stock",
    confirmDeletePart: "Êtes-vous sûr de supprimer cette pièce ?",
    partDeleted: "Pièce supprimée avec succès",

    // ===== Tableau de bord =====
    statActiveRepairs: "Réparations actives",
    statReady: "Prêtes à récupérer",
    statRevenue: "Revenus des réparations livrées",
    statClients: "Total clients",
    statLowStock: "Pièces en stock faible",
    recentRepairs: "Dernières demandes",
    noRecentRepairs: "Aucune demande pour le moment",

    // ===== Suivi client =====
    trackTitle: "Suivi de réparation",
    trackSubtitle: "Entrez votre numéro pour connaître l'état de votre appareil",
    searchBtn: "Rechercher",
    searching: "Recherche en cours...",
    noResults: "Aucune demande trouvée pour ce numéro",
    trackError: "Une erreur est survenue, réessayez",

    // ===== Reçu imprimable =====
    printBtn: "Imprimer",
    receiptTitle: "Reçu de dépôt d'appareil",
    receiptTicketNo: "N° de commande",
    receiptDate: "Date",
    receiptClient: "Client",
    receiptPhone: "Téléphone",
    receiptDevice: "Appareil",
    receiptIssue: "Panne",
    receiptCost: "Coût estimé",
    receiptFooter: "Veuillez conserver ce reçu pour récupérer votre appareil une fois la réparation terminée.",

    // ===== Rapports =====
    menuReports: "Rapports",
    reportsTitle: "Rapports et statistiques",
    reportsSubtitle: "Vue d'ensemble des performances de l'atelier",
    reportTotalRepairs: "Total des demandes",
    reportDeliveredRepairs: "Demandes livrées",
    reportTotalRevenue: "Revenu total",
    reportAvgCost: "Coût moyen par demande",
    reportByStatus: "Répartition par statut",
    reportByDevice: "Répartition par type d'appareil",
    reportInventoryValue: "Valeur totale du stock actuel",

    // ===== Inscription d'un nouvel atelier =====
    signupTitle: "Créer un compte atelier",
    signupShopName: "Nom de l'atelier",
    signupButton: "Créer le compte",
    signupError: "Une erreur est survenue, réessayez",
    noAccount: "Vous n'avez pas de compte ?",
    signupLink: "Créez votre atelier",
    haveAccount: "Vous avez déjà un compte ?",
    loginLink: "Se connecter",

    // ===== Invitation d'équipe =====
    joinTeamTitle: "Rejoindre l'équipe de l'atelier",
    invalidInvite: "Lien d'invitation invalide",

    // ===== Gestion de l'équipe =====
    menuTeam: "Équipe",
    teamTitle: "Membres de l'équipe",
    teamSubtitle: "Gérez les personnes qui utilisent le compte de votre atelier",
    inviteLinkTitle: "Lien d'invitation",
    inviteLinkDesc: "Partagez ce lien avec toute personne que vous souhaitez ajouter à votre équipe",
    copyLink: "Copier le lien",
    linkCopied: "Lien copié",
    roleOwner: "Propriétaire",
    roleEmployee: "Employé",
    removeMember: "Retirer",
    confirmRemoveMember: "Voulez-vous vraiment retirer ce membre de l'atelier ?",
    memberRemoved: "Membre retiré avec succès",
    ownerOnlyFeature: "Cette fonctionnalité est réservée au propriétaire de l'atelier",
    ownerOnlyFeature: "Cette fonctionnalité est réservée au propriétaire de l'atelier",
    accountRemoved: "Votre compte a été retiré de cet atelier. Contactez le propriétaire si c'est une erreur.",
    accountRemoved: "Votre compte a été retiré de cet atelier. Contactez le propriétaire si c'est une erreur.",
    existingAccountWrongPassword: "Cet email est déjà enregistré avec un autre mot de passe. Entrez le mot de passe correct pour ce compte.",
    alreadyInShop: "Ce compte est déjà lié à un autre atelier et ne peut pas être lié à deux ateliers en même temps.",

    // ===== Abonnement =====
    trialEndedTitle: "Période d'essai terminée",
    trialEndedDesc: "Votre période d'essai gratuite (14 jours) est terminée. Pour continuer à utiliser l'application, veuillez nous contacter pour activer votre abonnement.",
    subscriptionExpiredTitle: "Abonnement expiré",
    subscriptionExpiredDesc: "Votre abonnement a expiré. Veuillez nous contacter pour le renouveler et continuer à utiliser l'application.",
    contactToRenew: "Pour activer ou renouveler, contactez-nous via :",
    trialEndingSoon: "Il vous reste {days} jour(s) avant la fin de votre période d'essai. Contactez-nous pour activer votre abonnement.",

    // ===== Panneau d'administration =====
    adminTitle: "Gestion des ateliers",
    adminSubtitle: "Vue d'ensemble de tous les ateliers inscrits",
    colShop: "Atelier",
    colOwner: "Propriétaire",
    colMembers: "Membres",
    colStatus: "Statut",
    colDaysLeft: "Jours restants",
    statusTrial: "Essai gratuit",
    statusActive: "Actif",
    statusExpired: "Expiré",
    activateBtn: "Activer",
    activateMonthsLabel: "Nombre de mois",
    activateSuccess: "Abonnement activé avec succès",
    accessDenied: "Cette page ne vous est pas accessible",
    subscribeNowBtn: "S'abonner maintenant",
    chooseMonthsLabel: "Nombre de mois (500 DZD/mois)",
    billingError: "Une erreur est survenue lors de la préparation du paiement, réessayez",

    // ===== Paiement manuel =====
    payManualTitle: "Méthode de paiement",
    payManualDesc: "Transférez le montant via BaridiMob au numéro suivant, puis cliquez sur \"J'ai payé\"",
    baridiMobNumber: "Numéro BaridiMob",
    monthlyPriceNote: "500 DZD/mois",
    iPaidBtn: "J'ai payé",
    choosePaidMonthsLabel: "Combien de mois avez-vous payé ?",
    paymentClaimSuccess: "Votre notification a été envoyée avec succès. Votre abonnement sera activé sous peu.",
    contactFastNote: "Pour accélérer, contactez-nous directement via WhatsApp :",
    paymentPendingNote: "Notification de paiement envoyée, en attente d'activation..."
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

    // تحديث أزرار اللغة في صفحة التتبّع (إن وجدت)
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active-lang', btn.dataset.langBtn === lang);
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