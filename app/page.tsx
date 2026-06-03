'use client'

import { useLang } from '@/context/LanguageContext'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

// ─── Content (exact copy of index.js) ────────────────────────────────────────

const content = {
  en: {
    heroSubtitle: 'Master the Cube with structured courses, modern resources, and personal coaching.',
    journeyTitle: 'My Cubing Journey',
    journeySteps: [
      { year: 'Start',              ach: 'Discovered the cube with a few pieces left unsolved and complete it without help.' },
      { year: 'Competed 2-3 Years', ach: 'Placed 3rd on 3x3 at National Championship, and break my first ever National Record.' },
      { year: '2020-2021',          ach: 'Started learning ZBLL and complete all necessary sets.' },
      { year: '2022',               ach: 'Become the first person in Thailand to break sub-7 barrier on 3x3.' },
      { year: '2024',               ach: 'Ranked 9th in the world at the time for fastest 3x3 solve.' },
      { year: '2026',               ach: 'Keep competing and launch NTP Cuber Academy.' },
    ],
    introTitle: 'About Me',
    introText1: "Hi, I\u2019m Natthaphat Mahtani. I am a competitive speedcuber dedicated to helping others break their personal records through structured, logic-based, and fun training.",
    introText2: 'This website provides a complete ecosystem for cubers: from beginner courses to advanced techniques on various events, plus 1-on-1 coaching to refine your hardware and execution.',
    coachingTitle: 'Coaching & Services',
    coachingText: 'Improve your skill with advice from experienced cuber.',
    resourcesTitle: 'Free Resources',
    resourcesText: 'Algorithms and tips.',
    contactTitle: 'Book a Session',
    coursesTitle: 'Online Course',
    coursesSubtitle: 'I am currently filming and structuring these modules. Stay tuned!',
    courseComingSoon: [
      { title: '3x3 Fundamentals',    desc: 'Mastering the cross, basic F2L, and intuitive 2-look LL.' },
      { title: 'Advanced F2L',        desc: 'Solving cases from different angles and reducing rotations.' },
      { title: 'The Sub-10 Path',     desc: 'Advanced look-ahead, efficiency, and full ZBLL/coll subsets.' },
    ],
    badgeComingSoon: 'Under Development',
    wcaLabel: 'Official Profile',
    youtubeLabel: 'Cubing Videos',
    viewAllServices: 'View All Services',
    exploreResources: 'Explore All Resources',
    viewCourses: 'View All Courses',
    viewCTA: 'View Courses',
    solveCritiqueTitle: 'Solve Critique',
    solveCritiqueDesc: 'A written or video feedback on your solving style, your strengths and what you need to be working on.',
    solveCritiqueF1: 'Detailed breakdown of your solving style',
    solveCritiqueF2: 'Personalized feedback and improvement tips',
    startingFrom: 'Starting from',
    perService: '/ service',
    perSession: '/ session',
    coachingCard2Title: '1-on-1 Coaching',
    coachingCard2Desc: 'A 30-minute or 60-minute deep dive into your current solving habits, efficiency leaks, and personalized hardware setup.',
    coachingCard2F1: 'Live Solve Critiques',
    coachingCard2F2: 'Personalized Drill Plan',
    contactSub: 'We will contact you within 24 hours.',
    algSheets: 'Algorithm Sheets',
    algSheetsDesc: 'My personal algorithm sets for multiple WCA events.',
    comingSoon: 'Coming Soon',
  },
  th: {
    heroSubtitle: 'เชี่ยวชาญรูบิกด้วยคอร์สเรียนที่เป็นระบบ แหล่งเรียนรู้ที่ทันสมัย และบริการโค้ชตัวต่อตัวเพื่อพัฒนาทักษะได้ตรงจุด',
    journeyTitle: 'เส้นทางรูบิกของผม',
    journeySteps: [
      { year: 'เริ่มต้น',              ach: 'แก้รูบิกที่ถูกวางไว้โดยเหลือเพียงไม่กี่ชิ้นได้ด้วยตัวเอง เกิดความสนใจ' },
      { year: 'เข้าร่วมแข่งขัน 2-3 ปี', ach: 'ได้อันดับ 3 ในการแข่งขันระดับประเทศ และได้ทำลายสถิติประเทศครั้งแรก' },
      { year: '2020-2021',             ach: 'เริ่มเรียนรู้และทบทวน ZBLL อย่างจริงจัง จนสามารถจำเซตที่สำคัญได้ครบ' },
      { year: '2022',                  ach: 'เป็นคนไทยคนแรกที่ทำลายกำแพงเวลา 7 วินาทีของรูบิก 3x3' },
      { year: '2024',                  ach: 'แก้รูบิกด้วยเวลาเร็วที่สุดขึ้นเป็นอันดับ 9 ของโลกในตอนนั้น' },
      { year: '2026',                  ach: 'แข่งขันและทำสถิติต่อไป แล้วเปิดตัว NTP Cuber Academy เพื่อเผยแพร่ความรู้รูบิก' },
    ],
    introTitle: 'เกี่ยวกับผม',
    introText1: 'สวัสดีครับผมณัฐภัทร มาทานี ผมเป็นนักแข่งรูบิกที่มุ่งเน้นการช่วยให้ทุกคนทำลายสถิติส่วนตัวด้วยการฝึกฝนอย่างเป็นระบบและมีความสนุกไปกับการฝึก',
    introText2: 'เว็บไซต์นี้เป็นแหล่งรวมทุกอย่างสำหรับผู้ที่สนใจพัฒนาความสามารถด้านรูบิก ตั้งแต่คอร์สพื้นฐานไปจนถึงเทคนิคขั้นสูงอย่างสำหรับรูบิกหลายประเภท พร้อมบริการโค้ชแบบตัวต่อตัวเพื่อพัฒนาทั้งทักษะและวิธีคิดของคุณ',
    coachingTitle: 'โค้ช & บริการอื่น ๆ',
    coachingText: 'พัฒนาทักษะตามคำแนะนำของนักแข่งรูบิกมากประสบการณ์',
    resourcesTitle: 'แหล่งเรียนรู้ฟรี',
    resourcesText: 'สูตรการหมุนและแผนฝึก',
    contactTitle: 'จองคลาสโค้ช',
    coursesTitle: 'คอร์สเรียนออนไลน์',
    coursesSubtitle: 'กำลังเตรียมเนื้อหาและถ่ายทำคอร์สเรียนคุณภาพสูง เร็วๆ นี้!',
    courseComingSoon: [
      { title: 'พื้นฐาน 3x3',   desc: 'เจาะลึกการทำ Cross, F2L พื้นฐาน และการแก้แบบ 2-look.' },
      { title: 'F2L ขั้นสูง',   desc: 'เทคนิคการเก็บคู่จากทุกมุมและการลดจำนวนการหมุนลูก.' },
      { title: 'เส้นทางสู่ Sub-10', desc: 'เทคนิคการมองล่วงหน้า ความคล่องตัว และสูตร ZBLL.' },
    ],
    badgeComingSoon: 'กำลังเตรียมเนื้อหา',
    wcaLabel: 'ผลการแข่งขันทางการ',
    youtubeLabel: 'คลิปเกี่ยวกับรูบิก',
    viewAllServices: 'เลือกชมบริการทั้งหมด',
    exploreResources: 'ชมแหล่งเรียนรู้ทั้งหมด',
    viewCourses: 'View All Courses',
    viewCTA: 'View Courses',
    solveCritiqueTitle: 'วิเคราะห์การแก้โจทย์',
    solveCritiqueDesc: 'เอกสารหรือวิดีโออธิบายลักษณะและสไตล์การแก้โจทย์ จุดแข็ง และสิ่งที่คุณต้องไปพัฒนาเพิ่มเติม',
    solveCritiqueF1: 'วิเคราะห์สไตล์การแก้โจทย์อย่างละเอียด',
    solveCritiqueF2: 'ให้คำแนะนำที่เหมาะสมกับตัวคุณ',
    startingFrom: 'เริ่มต้น',
    perService: '/ ครั้ง',
    perSession: '/ ครั้ง',
    coachingCard2Title: 'โค้ชแบบตัวต่อตัว',
    coachingCard2Desc: 'คลาส 30 นาทีหรือ 1 ชั่วโมง ในการวิเคราะห์สไตล์การแก้โจทย์ของคุณ ชี้หาจุดเด่นและพัฒนาประสิทธิภาพการแก้ รวมไปถึงให้คำแนะนำด้านการปรับแต่งรูบิก',
    coachingCard2F1: 'วิเคราะห์การแก้โจทย์สด ๆ ในคลาส',
    coachingCard2F2: 'จัดแผนการฝึกทักษะเฉพาะคุณ',
    contactSub: 'เราจะติดต่อกลับภายใน 24 ชั่วโมง',
    algSheets: 'ชีทสูตร',
    algSheetsDesc: 'แหล่งรวมสูตรสำหรับรูบิกหลากหลายประเภทตาม WCA',
    comingSoon: 'เร็วๆ นี้',
  },
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') }),
      { threshold: 0.1 }
    )
    const elements = ref.current?.querySelectorAll('.reveal') ?? []
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
  return ref
}

// ─── Chevron right icon ───────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className={`w-4 h-4 ${color}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
    </svg>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { lang } = useLang()
  const c = content[lang]
  const pageRef = useScrollReveal()

  return (
    <div ref={pageRef} className="bg-neutral-950 text-neutral-100 tracking-tight">

      {/* Global top gradient */}
      <div className="absolute inset-x-0 top-[-10rem] h-[30rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* ── Hero ── */}
      <section className="min-h-[90vh] flex items-center justify-center pt-24 md:pt-16">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center">

          {/* Profile image */}
          <div className="relative group mb-12">
            <div className="absolute inset-[-2rem] bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/30 transition-all duration-700" />
            <Image
              src="/image/web_profile.jpg"
              alt="NTP Cuber Profile"
              width={320}
              height={320}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-neutral-800 p-1 group-hover:border-indigo-500 transition-all duration-500 shadow-2xl"
              priority
            />
          </div>

          <p className="text-neutral-300 max-w-3xl text-xl md:text-3xl font-light leading-relaxed px-4 md:px-0">
            {c.heroSubtitle}
          </p>

          <a
            href="#courses"
            className="mt-12 inline-block bg-indigo-600 hover:bg-indigo-500 transition rounded-full px-12 py-4 font-bold text-sm uppercase tracking-wider shadow-lg"
          >
            {c.viewCTA}
          </a>
        </div>
      </section>

      {/* ── About Me ── */}
      <section id="about" className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 blur-[120px] -z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* Action photo */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-[500px] bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 group-hover:scale-105 transition-transform duration-700">
                <img src="/image/action_profile1.JPG" className="w-full h-full object-cover" alt="Action profile" />
              </div>
              <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-3xl pointer-events-none" />
            </div>

            {/* Text */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">{c.introTitle}</h2>
                <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-neutral-300">
                <p>{c.introText1}</p>
                <p>{c.introText2}</p>
              </div>

              {/* Link cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <a
                  href="https://www.worldcubeassociation.org/persons/2011MAHT02"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-indigo-500 hover:bg-neutral-800/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <img src="https://thailandcube.vercel.app/img/wca.svg" className="w-5 h-5" alt="WCA Logo" />
                    <span className="block text-indigo-400 font-bold text-xl group-hover:text-indigo-300">My WCA Profile</span>
                  </div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wide">{c.wcaLabel}</span>
                </a>

                <a
                  href="https://www.youtube.com/@NTPCuber"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-red-500 hover:bg-neutral-800/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <img src="https://cdn.simpleicons.org/youtube/ff0000" className="w-5 h-5" alt="YouTube Logo" />
                    <span className="block text-indigo-400 font-bold text-xl group-hover:text-red-400">My Channel</span>
                  </div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wide">{c.youtubeLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Journey ── */}
      <section id="journey" className="py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{c.journeyTitle}</h2>
            <div className="h-1.5 w-20 bg-indigo-600 rounded-full mx-auto" />
          </div>

          <div className="relative space-y-12">
            {/* Vertical line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800 -translate-x-1/2" />

            <div className="space-y-12">
              {c.journeySteps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal"
                >
                  {/* Number bubble */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-500 bg-neutral-950 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {i + 1}
                  </div>
                  {/* Card */}
                  <div className="w-[calc(100%-3.5rem)] md:w-[45%] p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 hover:border-indigo-500/40 transition-all backdrop-blur-sm">
                    <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest block mb-2">{step.year}</span>
                    <p className="text-neutral-200">{step.ach}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses (Coming Soon) ── */}
      <section id="courses" className="py-12 md:py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{c.coursesTitle}</h2>
              <p className="text-neutral-400 max-w-xl text-lg">{c.coursesSubtitle}</p>
            </div>
            <Link href="/courses" className="group flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              {c.viewCourses} <ChevronRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {c.courseComingSoon.map((card, i) => (
              <div key={i} className="relative bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl overflow-hidden group">
                {/* Overlay */}
                <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] z-10" />
                {/* Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1 rounded-full bg-neutral-900">
                    {c.badgeComingSoon}
                  </span>
                </div>
                {/* Content */}
                <div className="relative z-20 opacity-60">
                  <div className="w-12 h-12 bg-neutral-800 rounded-xl mb-6 flex items-center justify-center">
                    <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coaching ── */}
      <section id="coaching" className="py-12 md:py-24 bg-neutral-900/50 border-y border-neutral-800/50 relative overflow-hidden">
        <div className="absolute -right-20 top-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{c.coachingTitle}</h2>
              <p className="text-neutral-400 max-w-xl text-lg">{c.coachingText}</p>
            </div>
            <Link href="/coaching" className="group flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              {c.viewAllServices} <ChevronRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 — Solve Critique */}
            <div className="bg-neutral-950 p-5 md:p-8 rounded-3xl border border-neutral-800 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{c.solveCritiqueTitle}</h3>
              <p className="text-neutral-400 mb-6 text-sm">{c.solveCritiqueDesc}</p>
              <ul className="space-y-3 mb-8 text-sm text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckIcon color="text-indigo-500" />{c.solveCritiqueF1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon color="text-indigo-500" />{c.solveCritiqueF2}
                </li>
              </ul>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{c.startingFrom}</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-white">฿200</span>
                <span className="text-neutral-500 text-sm">{c.perService}</span>
              </div>
              <Link href="/coaching" className="block text-center bg-neutral-900 group-hover:bg-indigo-600 transition-colors py-3 rounded-xl font-bold text-sm">
                Learn More
              </Link>
            </div>

            {/* Card 2 — 1-on-1 Coaching */}
            <div className="bg-neutral-950 p-5 md:p-8 rounded-3xl border border-neutral-800 hover:border-purple-500/50 transition-all group relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-2 text-white">{c.coachingCard2Title}</h3>
              <p className="text-neutral-400 mb-6 text-sm">{c.coachingCard2Desc}</p>
              <ul className="space-y-3 mb-8 text-sm text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckIcon color="text-purple-500" />{c.coachingCard2F1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon color="text-purple-500" />{c.coachingCard2F2}
                </li>
              </ul>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{c.startingFrom}</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-white">฿240</span>
                <span className="text-neutral-500 text-sm">{c.perSession}</span>
              </div>
              <Link href="/coaching" className="block text-center bg-neutral-900 group-hover:bg-purple-600 transition-colors py-3 rounded-xl font-bold text-sm">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Resources ── */}
      <section id="resources" className="py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{c.resourcesTitle}</h2>
              <p className="text-neutral-400 max-w-xl text-lg">{c.resourcesText}</p>
            </div>
            <Link href="/resources" className="group flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              {c.exploreResources} <ChevronRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Algorithm Sheets */}
            <Link href="/resources">
              <div className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl hover:bg-neutral-900/60 transition-all group">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{c.algSheets}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{c.algSheetsDesc}</p>
              </div>
            </Link>

            {/* Training Plans — Coming Soon */}
            <div className="relative bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-purple-500/30">
                  {c.comingSoon}
                </span>
              </div>
              <div className="w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center text-purple-400/50 mb-6 grayscale group-hover:grayscale-0 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-300">Training Plans</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Structured schedules to improve your TPS, look-ahead, and cross efficiency.</p>
            </div>

            {/* Solving Tips — Coming Soon */}
            <div className="relative bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl transition-all group overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-cyan-600/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-cyan-500/30">
                  {c.comingSoon}
                </span>
              </div>
              <div className="w-12 h-12 bg-cyan-600/10 rounded-lg flex items-center justify-center text-cyan-400/50 mb-6 grayscale group-hover:grayscale-0 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-300">Solving Tips</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Quick video breakdowns of finger tricks and advanced logic-based solves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-12 md:py-24 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{c.contactTitle}</h2>
          <p className="text-neutral-400 text-lg">{c.contactSub}</p>
        </div>
      </section>

    </div>
  )
}
