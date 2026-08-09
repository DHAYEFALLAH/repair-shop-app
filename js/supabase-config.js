// إعدادات الاتصال بمشروع Supabase
const SUPABASE_URL = "https://rqtjpoaqrswcjvqhcfce.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdGpwb2FxcnN3Y2p2cWhjZmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODIzNzQsImV4cCI6MjEwMTg1ODM3NH0.ofsLAd_k6SvSqJ4KWl-uDLlbd2WjqnSlWN1nmVRWXmU";

// تشغيل Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);