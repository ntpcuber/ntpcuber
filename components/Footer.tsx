'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

const YOUTUBE_URL = 'https://www.youtube.com/@NTPCuber'
const WCA_URL = 'https://www.worldcubeassociation.org/persons/2011MAHT02'

const linkCls = 'hover:text-indigo-400 transition-colors'

export default function Footer() {
  const { lang, toggleLang } = useLang()
  const t = (en: string, th: string) => (lang === 'th' ? th : en)

  return (
    <footer className="py-12 text-center text-neutral-600 dark:text-neutral-400 text-xs font-medium border-t border-neutral-200 dark:border-neutral-800 tracking-widest uppercase bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">

        {/* Links */}
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <Link href="/coaching" className={linkCls}>
            {t('Coaching', 'เรียนตัวต่อตัว')}
          </Link>
          <Link href="/resources" className={linkCls}>
            {t('Resources', 'แหล่งเรียนรู้')}
          </Link>
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className={linkCls}>
            YouTube ↗
          </a>
          <a href={WCA_URL} target="_blank" rel="noreferrer" className={linkCls}>
            WCA ↗
          </a>
        </nav>

        {/* Language toggle */}
        <button
          type="button"
          onClick={toggleLang}
          aria-label={t('Switch to Thai', 'เปลี่ยนเป็นภาษาอังกฤษ')}
          className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5 font-bold tracking-widest hover:border-indigo-500 hover:text-indigo-400 transition-all"
        >
          {lang === 'en' ? 'ภาษาไทย' : 'English'}
        </button>

        {/* Copyright */}
        <p>© 2026 NTP Cuber Academy</p>
      </div>
    </footer>
  )
}