'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signIn, signUp, signInWithGoogle, getUser, supabase } from '@/lib/supabase'

export default function LoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'

  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPw, setShowPw] = useState(false)

  useEffect(() => {
    getUser().then(user => { if (user) router.replace(next) })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess('')
    const fd = new FormData(e.currentTarget)
    try {
      const data = await signIn(fd.get('email') as string, fd.get('password') as string)
      const isAdmin = (data.user?.app_metadata as Record<string, unknown>)?.is_admin === true
      router.replace(searchParams.get('next') || (isAdmin ? '/admin' : '/dashboard'))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess('')
    const fd = new FormData(e.currentTarget)
    try {
      await signUp(fd.get('email') as string, fd.get('password') as string, fd.get('name') as string)
      setSuccess('Account created! Please check your email to confirm, then sign in.')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(email: string) {
    if (!email) { setError('Enter your email address first.'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    if (error) setError(error.message)
    else setSuccess('Password reset email sent — check your inbox.')
  }

  const inputCls = "w-full bg-neutral-900 border border-neutral-800 focus:border-indigo-500 outline-none px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-500 transition"

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-x-hidden">
      <div className="absolute top-[-8rem] left-[-6rem] w-[28rem] h-[28rem] bg-indigo-600/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-[24rem] h-[24rem] bg-purple-600/15 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition mb-8">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>

        <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 backdrop-blur-sm">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-indigo-600/15 border border-indigo-500/30 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
              </svg>
            </div>
            <span className="font-extrabold tracking-tight text-white">NTP Cuber</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-8 border-b border-neutral-800">
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); setSuccess('') }}
                className={`pb-3 text-sm font-bold relative ${tab === t ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full transition-opacity ${tab === t ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>

          {error   && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">{success}</div>}

          {/* Login form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <input name="email" type="email" required placeholder="Email address" className={inputCls} />
              <div className="relative">
                <input name="password" type={showPw ? 'text' : 'password'} required placeholder="Password"
                  className={`${inputCls} pr-10`} />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <div className="text-right">
                <button type="button" onClick={() => {
                  const email = (document.querySelector('input[name=email]') as HTMLInputElement)?.value
                  handleReset(email)
                }} className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                  Forgot password?
                </button>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition active:scale-95 disabled:opacity-60">
                {loading ? 'Please wait…' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Signup form */}
          {tab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <input name="name" type="text" required placeholder="Full name" className={inputCls} />
              <input name="email" type="email" required placeholder="Email address" className={inputCls} />
              <input name="password" type="password" required minLength={6} placeholder="Password (min 6 chars)" className={inputCls} />
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition active:scale-95 disabled:opacity-60">
                {loading ? 'Please wait…' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-600">or continue with</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          {/* Google OAuth */}
          <button onClick={() => signInWithGoogle()}
            className="w-full flex items-center justify-center gap-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 py-3 rounded-xl text-sm font-semibold transition active:scale-95">
            <svg viewBox="0 0 48 48" className="w-4 h-4">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.7 29.3 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9L38 8C34.3 4.8 29.4 3 24 3 11.8 3 2 12.8 2 25s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.4-5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 19 12 24 12c3.1 0 5.9 1.1 8.1 2.9L38 8C34.3 4.8 29.4 3 24 3c-7.7 0-14.4 4.4-17.7 11.7z"/>
              <path fill="#4CAF50" d="M24 47c5.2 0 10-1.9 13.6-5l-6.3-5.2C29.5 38.6 26.9 39.5 24 39.5c-5.2 0-9.6-3.2-11.4-7.8l-6.5 5C9.5 43 16.3 47 24 47z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.6-2.6 4.7-4.8 6.3l6.3 5.2C41 35.9 44 31.2 44 24c0-1.3-.2-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-neutral-600 mt-6">
          © 2026 NTP Cuber — Your account data is secure and private.
        </p>
      </div>
    </div>
  )
}
