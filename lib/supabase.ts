import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// ── Auth helpers (mirrors auth.js) ──────────────────────────

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
    },
  })
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard` },
  })
  if (error) throw error
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function hasCourse(courseSlug: string): Promise<boolean> {
  const user = await getUser()
  if (!user) return false
  const { data, error } = await supabase
    .from('course_purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_slug', courseSlug)
    .maybeSingle()
  return !error && data !== null
}
