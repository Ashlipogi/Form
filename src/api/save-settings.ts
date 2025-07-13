import { supabase } from '@/lib/supabaseClient';

export async function saveSettings({
  default_email,
  customize_link
}: {
  default_email: string;
  customize_link: string;
}) {
  // First, check if any settings exist
  const { data: existing, error: fetchError } = await supabase
    .from('form_settings')
    .select('id')
    .limit(1);

  if (fetchError) throw fetchError;

  if (existing && existing.length > 0) {
    // Update existing record
    const { error: updateError } = await supabase
      .from('form_settings')
      .update({
        default_email,
        customize_link
      })
      .eq('id', existing[0].id);

    if (updateError) throw updateError;
  } else {
    // Insert new record (let Supabase generate UUID)
    const { error: insertError } = await supabase
      .from('form_settings')
      .insert({
        default_email,
        customize_link
      });

    if (insertError) throw insertError;
  }
}