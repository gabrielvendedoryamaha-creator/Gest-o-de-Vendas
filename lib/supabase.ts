
import { createClient } from '@supabase/supabase-js';

// Acesso seguro: verifica se import.meta.env existe antes de acessar propriedades.
// Isso evita que o app "suma" em ambientes que não são o Vite.
const getEnv = (key: string, fallback: string) => {
  const meta = import.meta as any;
  if (meta && meta.env && meta.env[key]) {
    return meta.env[key];
  }
  return fallback;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', 'https://rbcywozraqjiqohelwmj.supabase.co');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_GKQZL94aK6hkNroTUBUOzg_rZ-cIKMh');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
