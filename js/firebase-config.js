// إعدادات الاتصال بمشروع Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDasrBpTyAM6cD7EAjQSsieQrCDh64q4AQ",
  authDomain: "repair-shop-app-27d6e.firebaseapp.com",
  projectId: "repair-shop-app-27d6e",
  storageBucket: "repair-shop-app-27d6e.firebasestorage.app",
  messagingSenderId: "645959118748",
  appId: "1:645959118748:web:c65529fd4ba5c8386e6259"
};

// تشغيل Firebase
firebase.initializeApp(firebaseConfig);

// نصدّر الأدوات اللي رح نحتاجوها في باقي الملفات
const auth = firebase.auth();
const db = firebase.firestore();