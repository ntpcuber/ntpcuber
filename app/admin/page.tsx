'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, getUser } from '@/lib/supabase'

interface Booking {
  id: string; name: string; email: string; service: string; wca_event?: string
  available_days?: string[]; booked_at: string; amount_thb?: number; status: string
  video_link?: string; preferred_time?: string; secondary_time?: string; goal?: string
}
interface Purchase { id: string; user_id: string; course_slug: string; purchased_at: string; amount_thb?: number; email?: string; userName?: string }
interface UserRow { user_id: string; name: string; email: string; joined: string; bookings: number; courses: number }

type Tab = 'bookings' | 'users' | 'courses'
const STATUSES = ['pending','confirmed','completed','cancelled'] as const

export default function AdminPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [tab, setTab] = useState<Tab>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [users, setUsers] = useState<UserRow[]>([])
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [bookingSearch, setBookingSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [detail, setDetail] = useState<Booking | null>(null)
  const [grantEmail, setGrantEmail] = useState('')
  const [grantSlug, setGrantSlug] = useState('')
  const [grantAmount, setGrantAmount] = useState('')
  const [grantError, setGrantError] = useState('')
  const [grantOpen, setGrantOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    getUser().then(async u => {
      if (!u) { router.replace('/login?next=/admin'); return }
      const isAdmin = (u.app_metadata as Record<string,unknown>)?.is_admin === true
      if (!isAdmin) { router.replace('/'); return }
      setReady(true)
      await Promise.all([loadBookings(), loadUsers(), loadPurchases()])
    })
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function loadBookings() {
    const { data } = await supabase.from('coaching_bookings').select('*').order('booked_at', { ascending: false })
    setBookings(data || [])
  }
  async function loadUsers() {
    const { data: bk } = await supabase.from('coaching_bookings').select('user_id,name,email,booked_at').not('user_id','is',null)
    const { data: pu } = await supabase.from('course_purchases').select('user_id,purchased_at')
    const map: Record<string, UserRow> = {}
    ;(bk || []).forEach(b => {
      if (!map[b.user_id]) map[b.user_id] = { user_id: b.user_id, name: b.name, email: b.email, joined: b.booked_at, bookings: 0, courses: 0 }
      map[b.user_id].bookings++
    })
    ;(pu || []).forEach(p => {
      if (!map[p.user_id]) map[p.user_id] = { user_id: p.user_id, name: '—', email: '—', joined: p.purchased_at, bookings: 0, courses: 0 }
      map[p.user_id].courses++
    })

    // Fill in missing emails/names from Supabase Auth
    const missingIds = Object.values(map)
      .filter(u => u.email === '—')
      .map(u => u.user_id)

    if (missingIds.length > 0) {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: missingIds }),
      })
      const authUsers: { id: string; email: string; name: string }[] = await res.json()
      authUsers.forEach(u => {
        map[u.id].email = u.email
        map[u.id].name  = u.name
      })
    }

    setUsers(Object.values(map))
  }
  async function loadPurchases() {
    const { data } = await supabase.from('course_purchases').select('*').order('purchased_at', { ascending: false })
    const { data: bk } = await supabase.from('coaching_bookings').select('user_id,email,name').not('user_id','is',null)
    const userMap: Record<string,{email:string;name:string}> = {}
    ;(bk||[]).forEach(b => { userMap[b.user_id] = { email: b.email, name: b.name } })
    setPurchases((data||[]).map(p => ({ ...p, email: userMap[p.user_id]?.email||'—', userName: userMap[p.user_id]?.name||'—' })))
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from('coaching_bookings').update({ status }).eq('id', id)
    if (error) { showToast('Update failed'); return }
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    if (detail?.id === id) setDetail(d => d ? { ...d, status } : d)
    showToast('Status → ' + status)
  }

  async function grantCourse() {
    setGrantError('')
    if (!grantEmail || !grantSlug) { setGrantError('Email and slug required'); return }
    const { data: match } = await supabase.from('coaching_bookings').select('user_id').eq('email', grantEmail).not('user_id','is',null).limit(1).maybeSingle()
    if (!match?.user_id) { setGrantError('No account found for that email.'); return }
    const { error } = await supabase.from('course_purchases').insert({ user_id: match.user_id, course_slug: grantSlug, amount_thb: grantAmount ? parseInt(grantAmount) : null })
    if (error) { setGrantError(error.code === '23505' ? 'User already has this course.' : error.message); return }
    setGrantOpen(false); setGrantEmail(''); setGrantSlug(''); setGrantAmount('')
    showToast(`Course "${grantSlug}" granted`)
    await Promise.all([loadPurchases(), loadUsers()])
  }

  async function revokePurchase(id: string) {
    if (!confirm('Revoke this course purchase?')) return
    await supabase.from('course_purchases').delete().eq('id', id)
    showToast('Purchase revoked')
    await loadPurchases()
  }

  const filteredBookings = bookings.filter(b => {
    const q = bookingSearch.toLowerCase()
    return (!q || [b.name,b.email,b.service,b.wca_event].some(v => v?.toLowerCase().includes(q))) && (!statusFilter || b.status === statusFilter)
  })

  const statTotal = bookings.length
  const statPending = bookings.filter(b => b.status === 'pending').length
  const statRevenue = bookings.reduce((s, b) => s + (b.amount_thb || 0), 0)

  if (!ready) return (
    <div className="flex items-center justify-center h-screen bg-white text-neutral-900 dark:bg-[#080909] dark:text-[#d4d8d8]">
      <div className="w-7 h-7 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const statusBadgeClass: Record<string,string> = {
    pending:   'bg-amber-500/10 text-amber-400 border-amber-500/30',
    confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/10 text-green-400 border-green-500/30',
    cancelled: 'bg-neutral-500/10 text-neutral-400 border-neutral-700',
  }

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 dark:bg-[#080909] dark:text-[#d4d8d8] font-sans text-sm transition-colors">
      {/* Sidebar */}
      <aside className="w-52 min-h-screen bg-neutral-100 border-r border-neutral-200 dark:bg-[#0e1010] dark:border-[#1a1f1f] flex flex-col py-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="px-5 pb-6 border-b border-neutral-200 dark:border-[#1a1f1f] mb-4">
          <p className="text-[10px] font-bold tracking-widest text-green-600 dark:text-green-400 uppercase mb-1">⬡ Admin Console</p>
          <p className="text-[15px] font-bold text-neutral-900 dark:text-white">NTP Cuber</p>
          <Link href="/" className="flex items-center gap-1 mt-3 text-[10px] font-bold text-neutral-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition uppercase tracking-widest">
            ← Back to Website
          </Link>
        </div>
        {(['bookings','users','courses'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium border-l-2 transition-all ${tab === t ? 'text-green-600 border-green-500 bg-green-500/10 dark:text-green-400 dark:border-green-400 dark:bg-green-400/6' : 'text-neutral-500 border-transparent hover:text-neutral-900 dark:text-[#4a5252] dark:hover:text-[#d4d8d8]'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded ${tab === t ? 'bg-green-500/15 text-green-600 dark:bg-green-400/15 dark:text-green-400' : 'bg-neutral-200 text-neutral-500 dark:bg-[#242b2b] dark:text-[#4a5252]'}`}>
              {t === 'bookings' ? bookings.length : t === 'users' ? users.length : purchases.length}
            </span>
          </button>
        ))}
        <div className="mt-auto px-5 pt-4 border-t border-neutral-200 dark:border-[#1a1f1f]">
          <button onClick={() => supabase.auth.signOut().then(() => router.replace('/'))}
            className="w-full text-[11px] text-neutral-500 hover:text-neutral-900 border border-neutral-300 rounded-lg py-2 transition dark:text-[#4a5252] dark:hover:text-[#d4d8d8] dark:border-[#242b2b]">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-[52px] bg-neutral-100 border-b border-neutral-200 flex items-center justify-between px-7 shrink-0 dark:bg-[#0e1010] dark:border-[#1a1f1f]">
          <span className="font-semibold text-[13px] capitalize text-neutral-900 dark:text-[#d4d8d8]">{tab}</span>
          <span className="font-mono text-[10px] text-neutral-500 dark:text-[#4a5252]">{new Date().toLocaleString('en-GB', { dateStyle:'medium', timeStyle:'short' })}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-7">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-7">
            {[['Total Bookings', statTotal, 'all time', 'neutral'],['Pending', statPending, 'needs action', '#f59e0b'],['Users', users.length, 'registered', 'neutral'],['Revenue', statRevenue ? '฿'+statRevenue.toLocaleString() : '฿0', '฿ total', '#22c55e']].map(([label, val, sub, color]) => (
              <div key={label as string} className="bg-neutral-100 border border-neutral-200 rounded-[10px] p-5 dark:bg-[#0e1010] dark:border-[#1a1f1f]">
                <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 mb-2 dark:text-[#4a5252]">{label}</p>
                <p className="text-[26px] font-bold leading-none" style={{ color: color === 'neutral' ? (typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? '#d4d8d8' : '#111827') as string : color as string }}>{val}</p>
                <p className="text-[11px] text-neutral-500 mt-1 dark:text-[#4a5252]">{sub}</p>
              </div>
            ))}
          </div>

          {/* Bookings */}
          {tab === 'bookings' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#4a5252]">All Coaching Bookings</span>
                <div className="flex gap-2">
                  <input value={bookingSearch} onChange={e => setBookingSearch(e.target.value)} placeholder="Search…"
                    className="bg-[#080909] border border-[#242b2b] text-[#d4d8d8] px-3 py-1.5 rounded-lg text-[12px] outline-none focus:border-green-500 w-48" />
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="bg-[#080909] border border-[#242b2b] text-[#d4d8d8] px-2 py-1.5 rounded-lg text-[10px] font-mono">
                    <option value="">All</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="bg-neutral-100 border border-neutral-200 rounded-[10px] overflow-hidden dark:bg-[#0e1010] dark:border-[#1a1f1f]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-[#1a1f1f]">
                      {['Name / Email','Service','Event','Days','Booked','Amount','Status',''].map(h => (
                        <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 px-4 py-3 text-left dark:text-[#4a5252]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length === 0 ? (
                      <tr><td colSpan={8} className="text-center py-10 text-neutral-500 font-mono text-[11px] dark:text-[#4a5252]">No bookings found</td></tr>
                    ) : filteredBookings.map(b => (
                      <tr key={b.id} className="border-b border-neutral-200 hover:bg-neutral-200/60 cursor-pointer dark:border-[#1a1f1f] dark:hover:bg-white/[0.018]" onClick={() => setDetail(b)}>
                        <td className="px-4 py-3"><p className="font-semibold text-neutral-900 text-[13px] dark:text-white">{b.name}</p><p className="font-mono text-[11px] text-neutral-500 dark:text-[#4a5252]">{b.email}</p></td>
                        <td className="px-4 py-3 text-[13px] text-neutral-800 dark:text-[#d4d8d8]">{b.service}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-neutral-700 dark:text-[#d4d8d8]">{b.wca_event || '—'}</td>
                        <td className="px-4 py-3 text-[11px] text-neutral-500 dark:text-[#4a5252]">{b.available_days?.join(', ') || '—'}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-neutral-700 dark:text-[#d4d8d8]">{new Date(b.booked_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'})}</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">{b.amount_thb ? '฿'+b.amount_thb : '—'}</td>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                            className="bg-white border border-neutral-300 text-neutral-900 font-mono text-[10px] px-2 py-1 rounded-md dark:bg-[#080909] dark:border-[#242b2b] dark:text-[#d4d8d8]">
                            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={e => { e.stopPropagation(); setDetail(b) }}
                            className="px-2 py-1 border border-neutral-300 rounded-md text-[10px] text-neutral-500 hover:text-neutral-900 dark:border-[#242b2b] dark:text-[#4a5252] dark:hover:text-[#d4d8d8]">Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div className="bg-neutral-100 border border-neutral-200 rounded-[10px] overflow-hidden dark:bg-[#0e1010] dark:border-[#1a1f1f]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-[#1a1f1f]">
                    {['Email','Name','Joined','Bookings','Courses',''].map(h => (
                      <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 px-4 py-3 text-left dark:text-[#4a5252]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.user_id} className="border-b border-neutral-200 hover:bg-neutral-200/60 dark:border-[#1a1f1f] dark:hover:bg-white/[0.018]">
                      <td className="px-4 py-3 font-mono text-[11px] text-neutral-700 dark:text-[#d4d8d8]">{u.email}</td>
                      <td className="px-4 py-3 text-[13px] text-neutral-900 dark:text-[#d4d8d8]">{u.name}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-neutral-700 dark:text-[#d4d8d8]">{new Date(u.joined).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'})}</td>
                      <td className="px-4 py-3 font-mono text-amber-600 dark:text-amber-400">{u.bookings}</td>
                      <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">{u.courses}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => { setGrantEmail(u.email); setGrantOpen(true); setTab('courses') }}
                          className="px-2 py-1 border border-neutral-300 rounded-md text-[10px] text-neutral-500 hover:text-neutral-900 dark:border-[#242b2b] dark:text-[#4a5252] dark:hover:text-[#d4d8d8]">Grant Course</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Courses */}
          {tab === 'courses' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#4a5252]">Course Purchases</span>
                <button onClick={() => setGrantOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-400/12 border border-green-400/30 text-green-400 rounded-lg text-[12px] font-semibold">
                  + Grant Course
                </button>
              </div>
              <div className="bg-neutral-100 border border-neutral-200 rounded-[10px] overflow-hidden dark:bg-[#0e1010] dark:border-[#1a1f1f]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-[#1a1f1f]">
                      {['User','Course','Purchased','Amount',''].map(h => (
                        <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 px-4 py-3 text-left dark:text-[#4a5252]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map(p => (
                      <tr key={p.id} className="border-b border-neutral-200 hover:bg-neutral-200/60 dark:border-[#1a1f1f] dark:hover:bg-white/[0.018]">
                        <td className="px-4 py-3"><p className="font-mono text-[11px] text-neutral-700 dark:text-[#d4d8d8]">{p.email}</p><p className="text-[11px] text-neutral-500 dark:text-[#4a5252]">{p.userName}</p></td>
                        <td className="px-4 py-3 font-mono text-[12px] text-green-600 dark:text-green-400">{p.course_slug}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-neutral-700 dark:text-[#d4d8d8]">{new Date(p.purchased_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'})}</td>
                        <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">{p.amount_thb ? '฿'+p.amount_thb : '—'}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => revokePurchase(p.id)} className="px-2 py-1 bg-red-100 border border-red-300 text-red-600 rounded-md text-[10px] dark:bg-red-400/10 dark:border-red-400/30 dark:text-red-400">Revoke</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-white border border-neutral-200 rounded-2xl p-7 w-full max-w-lg dark:bg-[#0e1010] dark:border-[#242b2b]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-[15px] font-bold text-neutral-900 dark:text-white">{detail.name}</p>
                <p className="font-mono text-[11px] text-neutral-500 dark:text-[#4a5252]">{detail.email}</p>
              </div>
              <button onClick={() => setDetail(null)} className="text-neutral-500 hover:text-neutral-900 dark:text-[#4a5252] dark:hover:text-[#d4d8d8] text-lg">✕</button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-[12px] mb-5">
              {[['Service', detail.service],['WCA Event', detail.wca_event||'—'],['Days', detail.available_days?.join(', ')||'—'],['Pref. Time', detail.preferred_time||'—'],['Alt. Time', detail.secondary_time||'—'],['Amount', detail.amount_thb ? '฿'+detail.amount_thb : '—'],['Goal', detail.goal||'—'],['Booked', new Date(detail.booked_at).toLocaleString('en-GB')]].map(([k,v]) => (
                <div key={k}><p className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5 dark:text-[#4a5252]">{k}</p><p className="text-neutral-800 dark:text-[#d4d8d8]">{v}</p></div>
              ))}
              {detail.video_link && (
                <div><p className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5 dark:text-[#4a5252]">Video</p><a href={detail.video_link} target="_blank" className="text-green-600 dark:text-green-400">Open ↗</a></div>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-[#1a1f1f]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase text-neutral-500 dark:text-[#4a5252]">Status</span>
                <select value={detail.status} onChange={e => updateStatus(detail.id, e.target.value)}
                  className="bg-white border border-neutral-300 text-neutral-900 font-mono text-[10px] px-2 py-1 rounded-md dark:bg-[#080909] dark:border-[#242b2b] dark:text-[#d4d8d8]">
                  {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
              <button onClick={() => setDetail(null)} className="px-3 py-1.5 border border-neutral-300 rounded-lg text-[12px] text-neutral-500 hover:text-neutral-900 dark:border-[#242b2b] dark:text-[#4a5252] dark:hover:text-[#d4d8d8]">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Grant modal */}
      {grantOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setGrantOpen(false)}>
          <div className="bg-white border border-neutral-200 rounded-2xl p-7 w-full max-w-md dark:bg-[#0e1010] dark:border-[#242b2b]" onClick={e => e.stopPropagation()}>
            <p className="text-[15px] font-bold text-neutral-900 dark:text-white mb-1">Grant Course Access</p>
            <p className="text-[12px] text-neutral-500 dark:text-[#4a5252] mb-5">Find user by email, then assign a course slug.</p>
            {([
              { label: 'User Email',            val: grantEmail,  setter: setGrantEmail,  placeholder: 'student@email.com', type: 'email'  },
              { label: 'Course Slug',            val: grantSlug,   setter: setGrantSlug,   placeholder: '3x3-beginner',      type: 'text'   },
              { label: 'Amount (฿) — optional', val: grantAmount, setter: setGrantAmount, placeholder: '200',               type: 'number' },
            ] as { label: string; val: string; setter: (v: string) => void; placeholder: string; type: string }[]).map(({ label, val, setter, placeholder, type }) => (
              <div key={label} className="mb-4">
                <label className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block mb-1.5 dark:text-[#4a5252]">{label}</label>
                <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={placeholder}
                  className="bg-white border border-neutral-300 text-neutral-900 px-3 py-2 rounded-lg text-[13px] outline-none focus:border-green-500 w-full dark:bg-[#080909] dark:border-[#242b2b] dark:text-[#d4d8d8]" />
              </div>
            ))}
            {grantError && <p className="text-red-600 font-mono text-[11px] mb-3 dark:text-red-400">{grantError}</p>}
            <div className="flex gap-2 justify-end">
              <button onClick={() => setGrantOpen(false)} className="px-3 py-1.5 border border-neutral-300 text-neutral-500 hover:text-neutral-900 rounded-lg text-[12px] dark:border-[#242b2b] dark:text-[#4a5252] dark:hover:text-[#d4d8d8]">Cancel</button>
              <button onClick={grantCourse} className="px-4 py-1.5 bg-green-100 border border-green-300 text-green-700 rounded-lg text-[12px] font-semibold dark:bg-green-400/12 dark:border-green-400/30 dark:text-green-400">Grant Access</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-white border border-neutral-200 text-green-700 font-mono text-[11px] px-4 py-2.5 rounded-lg z-50 shadow-xl dark:bg-[#111] dark:border-[#242b2b] dark:text-green-400">
          {toast}
        </div>
      )}
    </div>
  )
}
