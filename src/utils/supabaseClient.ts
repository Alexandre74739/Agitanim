import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://euuzjtibrrvzveyggpyc.supabase.co';
const supabaseKey = 'sb_publishable_7jefHoYLE-7CigfSp_Eeig_UJnuXEw_';

export const supabase = createClient(supabaseUrl, supabaseKey);