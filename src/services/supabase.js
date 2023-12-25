import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wffczgrywjmfjtzfuljl.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZmN6Z3J5d2ptZmp0emZ1bGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1MTg0ODMsImV4cCI6MjAxOTA5NDQ4M30._t_gzVQjfJQ9k5Fiawr37QmqM0Mjwrl3wh-MjLfdGMc`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
