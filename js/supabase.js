// Supabase Configuration & Client Initialization
const SUPABASE_URL = "https://ejxychgggoondfwydvdv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8kAhZElz0NuN7rahb6-5Ig_YaelLLqw";

// Initialize client globally using CDN library
if (window.supabase) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase client initialized successfully 🚀");
} else {
  console.error("Supabase CDN script not loaded!");
}
