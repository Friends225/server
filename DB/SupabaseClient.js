
const {createClient}=require('@supabase/supabase-js')
require('dotenv').config()
const supabaseUrl = process.env.SUPABASE_APP_URL;
const supabaseAnonKey = process.env.SUPABASE_APP_ANON_KEY;

 const supabase = createClient(supabaseUrl, supabaseAnonKey);
 module.exports={supabase}