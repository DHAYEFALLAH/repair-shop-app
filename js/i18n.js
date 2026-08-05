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
    loginError: "اسم المستخدم أو كلمة المرور غير صحيحة"
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
    loginError: "Nom d'utilisateur ou mot de passe incorrect"
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