import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Debug logging (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase Client Initialization:');
  console.log('URL:', supabaseUrl || 'MISSING');
  console.log('Anon Key:', supabaseAnonKey ? 'SET' : 'MISSING');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are missing!');
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
