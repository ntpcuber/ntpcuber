'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'
import { supabase, signOut } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const { lang, toggleLang } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const t = (en: string, th: string) => lang === 'th' ? th : en

  const isAdmin = (user?.app_metadata as Record<string, unknown>)?.is_admin === true
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  const initials = name.slice(0, 2).toUpperCase()
  const avatar = user?.user_metadata?.avatar_url as string | undefined

  async function handleSignOut() {
    await signOut()
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/image/logo-banner.svg"
            alt="NTP Cuber Academy"
            className="h-9 w-[200px] md:h-11 md:w-[155px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="text-neutral-400 hover:text-indigo-400 transition-colors">
            {t('Home', 'หน้าแรก')}
          </Link>
          <Link href="/courses" className="text-neutral-400 hover:text-indigo-400 transition-colors">
            {t('Courses', 'คอร์สเรียน')}
          </Link>
          <Link href="/coaching" className="text-neutral-400 hover:text-indigo-400 transition-colors">
            {t('Coaching', 'เรียนตัวต่อตัว')}
          </Link>

          {/* Resources dropdown */}
          <div className="relative group flex items-center">
            <Link href="/resources" className="text-neutral-400 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              {t('Resources', 'แหล่งเรียนรู้')}
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block pt-2 min-w-[200px] z-50">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2">
                <div className="relative group/sub">
                  <button className="w-full flex items-center justify-between px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors text-sm">
                    <span>2x2</span>
                    <svg className="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute left-full top-0 hidden group-hover/sub:block pl-1 min-w-[180px] z-50">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2">
                      <Link href="/resources/2x2/cll" className="block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors text-sm">CLL</Link>
                      <Link href="/resources/2x2/eg1" className="block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors text-sm">EG-1</Link>
                      <Link href="/resources/2x2/eg2" className="block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors text-sm">EG-2</Link>
                    </div>
                  </div>
                </div>
                <Link href="/resources#3x3" className="block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors text-sm">3x3</Link>
                <div className="relative group/sub">
                  <button className="w-full flex items-center justify-between px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors text-sm">
                    <span>Megaminx</span>
                    <svg className="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute left-full top-0 hidden group-hover/sub:block pl-1 min-w-[180px] z-50">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2">
                      {['eo','co','ep','cp'].map(s => (
                        <Link key={s} href={`/resources/megaminx/4lll#${s}`} className="block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors text-sm uppercase">
                          4LLL – {s.toUpperCase()}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Auth widget */}
          <div className="hidden md:block">
            {!user ? (
              <Link href="/login" className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-xs font-bold text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-3.5 h-3.5" /* Sizes the icon */
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setAvatarMenuOpen(o => !o)}
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 cursor-pointer hover:border-indigo-500/50 transition"
                >
                  {avatar
                    ? <img src={avatar} className="w-6 h-6 rounded-full object-cover" alt="avatar" />
                    : <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-[10px] font-black text-white">{initials}</div>
                  }
                  <span className="text-xs font-bold text-neutral-200 max-w-[6rem] truncate">{name.split(' ')[0]}</span>
                  <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {avatarMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.4rem)] min-w-[11rem] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl py-1.5 z-50">
                    <div className="px-3 py-2 border-b border-neutral-800 mb-1">
                      <p className="text-[10px] text-neutral-500">Signed in as</p>
                      <p className="text-xs font-semibold text-neutral-200 truncate">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setAvatarMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-green-400 hover:bg-green-400/10 rounded-lg mx-1 transition">
                        Admin Console
                      </Link>
                    )}
                    <Link href="/dashboard" onClick={() => setAvatarMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-indigo-500/10 rounded-lg mx-1 transition">
                      My Dashboard
                    </Link>
                    <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-400/10 rounded-lg mx-1 transition text-left">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:border-indigo-500 hover:text-indigo-400 transition-all"
          >
            {lang === 'en' ? 'TH' : 'EN'}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 text-neutral-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-4 gap-2 text-sm font-medium">
            {[
              { href: '/', label: t('Home', 'หน้าแรก') },
              { href: '/courses', label: t('Courses', 'คอร์สเรียน') },
              { href: '/coaching', label: t('Coaching', 'เรียนตัวต่อตัว') },
              { href: '/resources', label: t('Resources', 'แหล่งเรียนรู้') },
            ].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-neutral-400 py-2 border-b border-neutral-800/50 hover:text-indigo-400 transition-colors">
                {item.label}
              </Link>
            ))}
            {!user ? (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-neutral-400 py-2">Login / Sign Up</Link>
            ) : (
              <>
                {isAdmin && <Link href="/admin" onClick={() => setMobileOpen(false)} className="text-green-400 py-2 font-semibold">Admin Console</Link>}
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-neutral-400 py-2">My Dashboard</Link>
                <button onClick={handleSignOut} className="text-red-400 py-2 text-left">Sign Out</button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Close avatar menu on outside click */}
      {avatarMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setAvatarMenuOpen(false)} />}
    </header>
  )
}
