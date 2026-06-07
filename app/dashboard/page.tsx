'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getUser, supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface Purchase { course_slug: string; purchased_at: string }
interface Booking {
  id: string; service: string; status: string; booked_at: string
  wca_event?: string; available_days?: string[]; preferred_time?: string; amount_thb?: number
  video_link?: string; goal?: string
}

const statusStyles: Record<string, { dot: string; badge: string; label: string }> = {
  pending:   { dot: 'bg-amber-400',  badge: 'bg-amber-400/10 text-amber-300 border-amber-500/30',    label: 'Pending'   },
  confirmed: { dot: 'bg-blue-400',   badge: 'bg-blue-400/10  text-blue-300  border-blue-500/30',     label: 'Confirmed' },
  completed: { dot: 'bg-green-400',  badge: 'bg-green-400/10 text-green-300 border-green-500/30',    label: 'Completed' },
  cancelled: { dot: 'bg-neutral-500',badge: 'bg-neutral-500/10 text-neutral-400 border-neutral-700', label: 'Cancelled' },
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [nameSaved, setNameSaved] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  useEffect(() => {
    getUser().then(async u => {
      if (!u) { router.replace('/login?next=/dashboard'); return }
      
      // Add this — get the session to ensure auth headers are attached
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/login?next=/dashboard'); return }

      const isAdmin = (u.app_metadata as Record<string, unknown>)?.is_admin === true
      if (isAdmin) { router.replace('/admin'); return }
      setUser(u)
      
      const [{ data: p }, { data: b }] = await Promise.all([
        supabase.from('course_purchases').select('course_slug, purchased_at').eq('user_id', u.id).order('purchased_at', { ascending: false }),
        supabase.from('coaching_bookings').select('*').eq('user_id', u.id).order('booked_at', { ascending: false }),
      ])
      setPurchases(p || [])
      setBookings(b || [])
      setLoading(false)
    })
  }, [])

  async function saveName(name: string) {
    if (!name.trim()) return
    await supabase.auth.updateUser({ data: { full_name: name } })
    setUser(u => u ? { ...u, user_metadata: { ...u.user_metadata, full_name: name } } : u)
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 3000)
  }

  async function sendReset() {
    if (!user?.email) return
    await supabase.auth.resetPasswordForEmail(user.email, { redirectTo: `${window.location.origin}/login` })
    setResetSent(true)
    setTimeout(() => setResetSent(false), 5000)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.replace('/')
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-neutral-500">Loading your dashboard…</p>
    </div>
  )

  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  const initials = name.slice(0, 2).toUpperCase()
  const avatar = user?.user_metadata?.avatar_url as string | undefined
  const joined = new Date(user?.created_at || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <>
      <header className="border-b border-neutral-800/60 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600/15 border border-indigo-500/30 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
              </svg>
            </div>
            <span className="font-extrabold tracking-tight text-sm">NTP Cuber</span>
          </Link>
          <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-400 transition">
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Profile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-2xl font-black shrink-0 overflow-hidden">
            {avatar ? <img src={avatar} className="w-full h-full object-cover" alt="avatar" /> : initials}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{name}</h1>
            <p className="text-sm text-neutral-500 mt-0.5">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-indigo-500/8 border border-indigo-500/20 text-xs text-indigo-300 font-semibold px-3 py-1 rounded-full">Member since {joined}</span>
              <span className="bg-indigo-500/8 border border-indigo-500/20 text-xs text-indigo-300 font-semibold px-3 py-1 rounded-full">{purchases.length} Course{purchases.length !== 1 ? 's' : ''} Owned</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-neutral-800" />

        {/* Courses */}
        <section>
          <h2 className="text-lg font-bold mb-6">📚 My Courses</h2>
          {purchases.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-neutral-800 rounded-2xl">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-neutral-400 font-semibold mb-1">No courses yet</p>
              <Link href="/courses" className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-bold text-sm">Browse Courses</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {purchases.map(p => {
                const label = p.course_slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                const date = new Date(p.purchased_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                return (
                  <div key={p.course_slug} className="bg-neutral-900/60 border border-neutral-800 hover:border-indigo-500/60 rounded-2xl p-5 transition">
                    <div className="w-10 h-10 bg-indigo-600/15 rounded-xl flex items-center justify-center text-indigo-400 mb-4">📚</div>
                    <h3 className="font-bold text-sm mb-1">{label}</h3>
                    <p className="text-xs text-neutral-600 mb-4">Purchased {date}</p>
                    <Link href={`/courses/${p.course_slug}`} className="block text-center text-xs font-bold py-2.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-white transition">
                      Continue Learning →
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <div className="h-px bg-neutral-800" />

        {/* Quick links */}
        <section>
          <h2 className="text-lg font-bold mb-5">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { href: '/coaching', icon: '🎯', label: 'Book Coaching' },
              { href: '/resources', icon: '📋', label: 'Algorithms' },
              { href: '/courses', icon: '🎓', label: 'All Courses' },
              { href: 'https://www.youtube.com/@NTPCuber', icon: '📺', label: 'YouTube', external: true },
            ].map(item => (
              <Link key={item.href} href={item.href} target={item.external ? '_blank' : undefined}
                className="flex flex-col items-center gap-2 bg-neutral-900/60 border border-neutral-800 hover:border-indigo-500/50 rounded-2xl p-5 transition text-center group">
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-xs font-bold text-neutral-300">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-800" />

        {/* Bookings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">🎯 Coaching Bookings</h2>
            <Link href="/coaching" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition">Book Again →</Link>
          </div>
          {bookings.length === 0 ? (
            <div className="text-center py-14 border border-dashed border-neutral-800 rounded-2xl">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-neutral-400 font-semibold mb-1">No bookings yet</p>
              <Link href="/coaching" className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-bold text-sm">Book a Session</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map(b => {
                const s = statusStyles[b.status] || statusStyles.pending
                const date = new Date(b.booked_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
                return (
                  <div key={b.id} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 shrink-0 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-lg">🎯</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-sm truncate">{b.service}</span>
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${s.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${b.status === 'pending' ? 'animate-pulse' : ''}`} />
                          {s.label}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">{date}</p>
                      {b.amount_thb && <p className="text-xs text-neutral-500 mt-1">💳 ฿{b.amount_thb}</p>}
                    </div>
                    {b.video_link && (
                      <a href={b.video_link} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition">Video ↗</a>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <div className="h-px bg-neutral-800" />

        {/* Settings */}
        <section>
          <h2 className="text-lg font-bold mb-5">Account Settings</h2>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Display Name</label>
              <div className="flex gap-3">
                <input defaultValue={name} id="settings-name" type="text"
                  className="flex-1 bg-neutral-800 border border-neutral-700 focus:border-indigo-500 outline-none px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-500 transition" />
                <button onClick={() => saveName((document.getElementById('settings-name') as HTMLInputElement)?.value)}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition active:scale-95">
                  Save
                </button>
              </div>
              {nameSaved && <p className="text-xs text-green-400 mt-2">Name updated ✓</p>}
            </div>
            <div className="pt-4 border-t border-neutral-800">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Password</p>
              <button onClick={sendReset} className="text-sm text-indigo-400 hover:text-indigo-300 transition font-semibold">
                Send password reset email →
              </button>
              {resetSent && <p className="text-xs text-green-400 mt-2">Reset email sent ✓</p>}
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-neutral-700 pb-4">© 2026 NTP Cuber</p>
      </main>
    </>
  )
}
