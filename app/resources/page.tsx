'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import type { Metadata } from 'next'

const content = {
  en: {
    heroTitle: 'My Cubing Resources',
    heroDesc: 'Algorithm sets I use, organized by event and difficulty, designed for efficient practice.',
    section2x2: '2×2 Cube: EG Method',
    section3x3: '3×3 Cube (Coming Soon)',
    sectionMega: 'Megaminx: 4 Look Last Layer',
  },
  th: {
    heroTitle: 'คลังสูตรรูบิก',
    heroDesc: 'รวมเซตสูตรที่ผมใช้ แบ่งตามประเภทและความยาก เพื่อการฝึกซ้อมที่มีประสิทธิภาพ',
    section2x2: 'รูบิก 2×2: วิธี EG',
    section3x3: 'รูบิก 3×3 (เร็วๆ นี้)',
    sectionMega: 'Megaminx: แก้แถวสุดท้ายด้วย 4 ขั้นตอน',
  },
}

const sets2x2 = [
  { slug: 'cll', label: 'CLL', desc: 'Last layer algorithm with solved first layer.', img: '/image/face-cll.png' },
  { slug: 'eg1', label: 'EG-1', desc: 'Last layer algorithm with adjacently swapped solved face.', img: '/image/face-eg1.png' },
  { slug: 'eg2', label: 'EG-2/Anti-CLL', desc: 'Last layer algorithm with diagonally swapped solved face.', img: '/image/face-eg2.png' },
]

const mega = [
  { slug: 'eo', label: 'EO', desc: 'Edge Orientation', img: '/image/megaminx-eo.png' },
  { slug: 'co', label: 'CO', desc: 'Corner Orientation', img: '/image/megaminx-co.png' },
  { slug: 'ep', label: 'EP', desc: 'Edge Permutation', img: '/image/megaminx-ep.png' },
  { slug: 'cp', label: 'CP', desc: 'Corner Permutation', img: '/image/megaminx-cp.png' },
]

export default function ResourcesPage() {
  const { lang } = useLang()
  const c = content[lang]

  return (
    <>
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.heroTitle}</h1>
          <p className="text-neutral-400 max-w-2xl text-lg">{c.heroDesc}</p>
        </div>
      </section>

      {/* 2x2 */}
      <section id="2x2" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">{c.section2x2}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sets2x2.map(s => (
              <Link key={s.slug} href={`/resources/2x2/${s.slug}`}>
                <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-indigo-500 transition">
                  <h3 className="text-xl font-semibold mb-2">{s.label}</h3>
                  <p className="text-neutral-400 text-sm">{s.desc}</p>
                  <img src={s.img} alt={s.label} className="w-full max-w-[180px] h-auto object-contain mx-auto mt-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3x3 */}
      <section id="3x3" className="py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">{c.section3x3}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['OLL', 'PLL', 'ZBLL'].map(label => (
              <Link key={label} href={`/resources/3x3/${label.toLowerCase()}`}>
                <div className="bg-neutral-950 rounded-xl p-6 border border-neutral-800 hover:border-indigo-500 transition">
                  <h3 className="text-xl font-semibold mb-2">{label}</h3>
                  <p className="text-neutral-400 text-sm">
                    {label === 'OLL' ? 'Orient the last layer in one step.' : label === 'PLL' ? 'Permute the last layer.' : 'Full last layer algorithms for advanced speedcubing.'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Megaminx */}
      <section id="megaminx" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">{c.sectionMega}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {mega.map(s => (
              <Link key={s.slug} href={`/resources/megaminx/4lll#${s.slug}`}>
                <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 hover:border-indigo-500 transition">
                  <h3 className="text-xl font-semibold mb-2">{s.label}</h3>
                  <p className="text-neutral-400 text-sm">{s.desc}</p>
                  <img src={s.img} alt={s.label} className="w-full max-w-[180px] h-auto object-contain mx-auto mt-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
