import { supabase } from '@/lib/supabaseClient';

export async function getSettings() {
  const { data, error } = await supabase
    .from('form_settings')
    .select('*')
    .limit(1);

  if (error) throw error;
  
  // Return first row if exists, otherwise return null
  return data && data.length > 0 ? data[0] : null;
}