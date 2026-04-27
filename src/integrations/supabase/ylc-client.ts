import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_YLC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_YLC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing YourLangCoach Supabase environment variables");
}

// Separate storageKey so the YLC session does not collide with the Family Huddle one.
export const ylcSupabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: "sb-ylc-auth-token",
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
