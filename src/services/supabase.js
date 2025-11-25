import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pfzlvhtzgyhnjqbvbnfn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmemx2aHR6Z3lobmpxYnZibmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5ODc5NjAsImV4cCI6MjA3OTU2Mzk2MH0.0qAChiLb9wH4UbVBNeSBaxQrhwpzsGGc8n1ZMf5HnhU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
