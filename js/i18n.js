const translations = {
  ar: {
    title: "ورشة الإصلاح",
    subtitle: "تسيير طلبات إصلاح الهواتف والحواسيب"
  },
  fr: {
    title: "Atelier de Réparation",
    subtitle: "Gestion des réparations de téléphones et ordinateurs"
  }
};

function setLanguage(lang) {
  const dict = translations[lang] || translations.ar;

  // تبديل اتجاه الصفحة: عربي = rtl، فرنسي = ltr
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  // تحديث كل عنصر عندو data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  localStorage.setItem('lang', lang);
}

// عند فتح الصفحة: استرجع آخر لغة مختارة، أو العربية افتراضياً
const savedLang = localStorage.getItem('lang') || 'ar';
setLanguage(savedLang);