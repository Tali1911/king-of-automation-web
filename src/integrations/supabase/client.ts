import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://kaynwlpbktxdzefvmndv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtheW53bHBia3R4ZHplZnZtbmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTg1ODcsImV4cCI6MjA4MDIzNDU4N30.69aPqDZH6LvmJELyAOadD63pYKV0Olt6sIk6h2brKRg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
