import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://chqqxzizeogwzbxcptgy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNocXF4eml6ZW9nd3pieGNwdGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNjc2OTMsImV4cCI6MjA2Nzk0MzY5M30.zFTRFRbhJ8gSKSXJ6gNKq4LXYAx5GzH6iQDYEk5Wmn0'; // truncated for clarity

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
