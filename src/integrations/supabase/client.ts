
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://szmpivxrkcvskgzgbeqc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bXBpdnhya2N2c2tnemdiZXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjQ2NDcsImV4cCI6MjA1NjQwMDY0N30.YiMpSL562iuBArqK_44bXD3n5Suk0vSonrh_IDDmpIM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
