'use client'

import { useLang } from '@/context/LanguageContext'
import fourLLLData, { type MegaCase, type MegaGroup, type MegaSection } from '@/lib/fourLLLData'
import type { Metadata } from 'next'

// ─── Card ─────────────────────────────────────────────────────────────────────

function AlgCard({ img, alg, alt, wide }: MegaCase) {
  return (
    <div className="group bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden hover:border-indigo-500 transition flex flex-col h-full">
      <div className={`bg-neutral-950 ${wide ? 'aspect-video' : 'aspect-square'} flex items-center justify-center shrink-0`}>
        <img src={img} alt="" className="w-48 h-48 object-contain" />
      </div>
      <div className={`${wide ? 'p-6' : 'p-4'} flex-grow flex flex-col justify-center text-center`}>
        <p className="font-mono text-sm mb-1">{alg}</p>
        {alt && <p className="font-mono text-xs text-neutral-400">{alt}</p>}
      </div>
    </div>
  )
}

// ─── Group (sub-heading + grid of cards) ──────────────────────────────────────

function AlgGroup({ group, lang }: { group: MegaGroup; lang: string }) {
  const label = lang === 'th' && group.labelTh ? group.labelTh : group.label
  return (
    <div className={group.mb ?? ''}>
      {label && <h3 className="text-2xl font-semibold mb-6">{label}</h3>}
      <div className={`grid ${group.gridClass} gap-6`}>
        {group.cases.map((c, i) => <AlgCard key={i} {...c} />)}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

function AlgSection({ section, lang }: { section: MegaSection; lang: string }) {
  const title = lang === 'th' ? section.titleTh : section.titleEn
  return (
    <section
      id={section.id}
      className={`py-20${section.sectionClass ? ' ' + section.sectionClass : ''}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-10">{title}</h2>
        <div className="space-y-0">
          {section.groups.map((g, i) => (
            <AlgGroup key={i} group={g} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#eo', en: 'EO (Edges)',   th: 'EO (Edges)'   },
  { href: '#co', en: 'CO (Corners)', th: 'CO (Corners)' },
  { href: '#ep', en: 'EP (Edges)',   th: 'EP (Edges)'   },
  { href: '#cp', en: 'CP (Corners)', th: 'CP (Corners)' },
]

export default function FourLLLPage() {
  const { lang } = useLang()

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans" style={{ scrollPaddingTop: '120px' }}>

      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* ── Sticky section nav ── */}
      <nav className="sticky top-[60px] z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex gap-4 md:gap-8 overflow-x-auto items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-neutral-400 hover:text-indigo-400 transition whitespace-nowrap text-xs md:text-sm font-semibold uppercase tracking-wider py-1"
            >
              {lang === 'th' ? link.th : link.en}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Megaminx 4 Look Last Layer</h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              {lang === 'th'
                ? 'แก้แถวสุดท้ายของรูบิก megaminx 4 ขั้นตอนอย่างมีระบบ'
                : 'Solving last layer effectively using 4 steps.'}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/image/mega4lll-page hero_transparent.png"
              alt="Megaminx 4LLL Case diagram"
              className="max-w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Algorithm sections — all driven by fourLLLData ── */}
      {fourLLLData.map(section => (
        <AlgSection key={section.id} section={section} lang={lang} />
      ))}

    </div>
  )
}