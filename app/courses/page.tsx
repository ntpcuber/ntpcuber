'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { getUser } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const content = {
  en: {
    heroTitle: 'Master Every Move',
    heroDesc: 'Structured video curriculums designed to take you from hobbyist to podium contender.',
    // Course 1
    badgeFree: 'Free',
    badgeBeginner: 'Beginner',
    badgeLessons9: '9 Lessons',
    badgeThai: '🇹🇭 Thai',
    course1Title: "Stepping into Cubing: The Beginner's Method",
    course1Desc: "Learn the easiest way to solve a Rubik's cube, with minimum algorithms. Perfect for absolute beginners with zero experience.",
    // btnStartLearning: 'Start Learning',
    btnStartLearning: 'Coming Soon',
    // btnSignInToAccess: 'Sign in to Access',
    btnSignInToAccess: 'Coming Soon',
    signInNote: 'Free — account required',
    previewCourse: 'Preview Course',
    // Course 2
    badgePrice: '฿500',
    badgeIntermediate: 'Intermediate',
    badgeLessons14: '14 Lessons',
    badgeComingSoon: 'Coming Soon',
    course2Title: 'Advanced F2L & Look-ahead Mastery',
    course2Desc: 'Break through the sub-20 barrier. Learn advanced F2L pair techniques, reduce rotations, and develop the look-ahead skills that separate fast solvers from great ones.',
    course2Features: [
      'Advanced F2L insertion angles',
      'Rotation reduction strategies',
      'Look-ahead drills & exercises',
      'Hardware setup & finger trick tips',
    ],
    btnGetAccess: 'Get Access',
    notYetAvailable: 'Not yet available',
  },
  th: {
    heroTitle: 'เชี่ยวชาญทุกการเคลื่อนไหว',
    heroDesc: 'หลักสูตรวิดีโอที่มีโครงสร้างชัดเจน พาคุณจากมือใหม่สู่เวทีการแข่งขัน',
    // Course 1
    badgeFree: 'ฟรี',
    badgeBeginner: 'ระดับเริ่มต้น',
    badgeLessons9: '9 บทเรียน',
    badgeThai: '🇹🇭 ภาษาไทย',
    course1Title: 'เริ่มต้นแก้รูบิก: วิธีสำหรับมือใหม่',
    course1Desc: 'เรียนรู้วิธีที่ง่ายที่สุดในการแก้รูบิก ด้วยจำนวนสูตรน้อยที่สุด เหมาะสำหรับผู้เริ่มต้นที่ไม่มีประสบการณ์มาก่อน',
    // btnStartLearning: 'เริ่มเรียนเลย',
    btnStartLearning: 'เร็ว ๆ นี้',
    // btnSignInToAccess: 'เข้าสู่ระบบเพื่อเรียน',
    btnSignInToAccess: 'เร็ว ๆ นี้',
    signInNote: 'ฟรี — ต้องมีบัญชีผู้ใช้',
    previewCourse: 'ดูตัวอย่างคอร์ส',
    // Course 2
    badgePrice: '฿500',
    badgeIntermediate: 'ระดับกลาง',
    badgeLessons14: '14 บทเรียน',
    badgeComingSoon: 'เร็วๆ นี้',
    course2Title: 'F2L ขั้นสูง & การพัฒนาทักษะการมองล่วงหน้า',
    course2Desc: 'ทลายกำแพง Sub-20 ด้วยเทคนิค F2L ขั้นสูง ลดการหมุนลูก และพัฒนาทักษะการมองล่วงหน้าที่แยกนักแก้รูบิกเร็วออกจากนักแก้รูบิกที่เก่ง',
    course2Features: [
      'มุมการใส่ชิ้น F2L ขั้นสูง',
      'กลยุทธ์ลดการหมุนลูก',
      'แบบฝึกหัดการมองล่วงหน้า',
      'การตั้งค่าลูกและเทคนิคการใช้นิ้ว',
    ],
    btnGetAccess: 'รับสิทธิ์เข้าเรียน',
    notYetAvailable: 'ยังไม่เปิดให้เรียน',
  },
}

export default function CoursesPage() {
  const { lang } = useLang()
  const c = content[lang]
  const [user, setUser] = useState<User | null | undefined>(undefined) // undefined = loading

  useEffect(() => {
    getUser().then(u => setUser(u ?? null))
  }, [])

  const authLoading = user === undefined

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">{c.heroTitle}</h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{c.heroDesc}</p>
      </section>

      {/* Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* ── Card 1: Beginner (Free) ── */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-blue-500 transition group flex flex-col">
            <div className="aspect-video bg-neutral-800 relative">
              <img
                src="/image/course_thumb_3x3beginner.png"
                alt="3x3 Beginner Course"
                className="w-full h-full object-top object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                  {c.previewCourse}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded uppercase font-bold border border-emerald-500/30">
                  {c.badgeFree}
                </span>
                <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-1 rounded uppercase font-bold">
                  {c.badgeBeginner}
                </span>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded uppercase font-bold">
                  {c.badgeLessons9}
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded uppercase font-bold">
                  {c.badgeThai}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{c.course1Title}</h3>
              <p className="text-neutral-400 text-sm mb-6 flex-1">{c.course1Desc}</p>

              <div className="mt-auto space-y-2">
                {authLoading ? (
                  <div className="w-full py-3 rounded-xl bg-neutral-800 animate-pulse" />
                ) : user ? (
                  <Link
                    href="/courses/3x3-beginner"
                    className="block text-center bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition text-white"
                  >
                    {c.btnStartLearning}
                  </Link>
                ) : (
                  <Link
                    href="/login?next=/courses/3x3-beginner"
                    className="block text-center bg-neutral-800 hover:bg-blue-600 py-3 rounded-xl font-bold transition"
                  >
                    {c.btnSignInToAccess}
                  </Link>
                )}
                <p className="text-center text-xs text-neutral-600">{c.signInNote}</p>
              </div>
            </div>
          </div>

          {/* ── Card 2: Advanced F2L (Paid, Coming Soon) ── */}
          <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
            {/* Coming Soon overlay */}
            <div className="absolute inset-0 z-10 bg-neutral-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 pointer-events-none">
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 border border-neutral-700 px-4 py-1.5 rounded-full bg-neutral-900/80">
                {c.badgeComingSoon}
              </span>
            </div>

            <div className="aspect-video bg-neutral-800 relative">
              {/* Placeholder thumbnail — gradient stand-in */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 via-neutral-900 to-purple-900/40 flex items-center justify-center">
                <svg className="w-16 h-16 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 opacity-60">
              <div className="flex gap-2 mb-3 flex-wrap">
                {/* Price badge */}
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded uppercase font-bold border border-indigo-500/30">
                  {c.badgePrice}
                </span>
                <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2 py-1 rounded uppercase font-bold">
                  {c.badgeIntermediate}
                </span>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded uppercase font-bold">
                  {c.badgeLessons14}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{c.course2Title}</h3>
              <p className="text-neutral-400 text-sm mb-4">{c.course2Desc}</p>

              <ul className="space-y-1.5 mb-6">
                {c.course2Features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-400">
                    <span className="text-indigo-500 font-bold">✔</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-white">{c.badgePrice}</span>
                  <span className="text-neutral-500 text-sm">/ {lang === 'th' ? 'คอร์ส' : 'course'}</span>
                </div>
                <button
                  disabled
                  className="w-full py-3 rounded-xl font-bold bg-neutral-800 text-neutral-600 cursor-not-allowed"
                >
                  {c.notYetAvailable}
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}