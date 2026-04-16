import { createClient } from '@supabase/supabase-js'

// Substitua pelos seus dados do painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://naygldtoyttlazebitpe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heWdsZHRveXR0bGF6ZWJpdHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDM0NjIsImV4cCI6MjA5MTg3OTQ2Mn0.MiAkwsy83XVJ-_QyWN_n47aCglb3gfwE5Hy1xIpbbaE'

export const supabase = createClient(supabaseUrl, supabaseKey)