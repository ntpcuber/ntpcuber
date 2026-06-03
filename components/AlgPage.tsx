'use client'

import { useState, useEffect } from 'react'
import type { AlgSet } from '@/lib/algTypes'

// ─── Algorithm card ───────────────────────────────────────────────────────────

function AlgCard({ img, alg, alt }: { img: string; alg: string; alt?: string }) {
  return (
    <div className="group bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden hover:border-indigo-500 transition">
      <div className="bg-neutral-950 aspect-square flex items-center justify-center">
        <img src={img} alt="" className="w-48 h-48 object-contain" />
      </div>
      <div className="p-4">
        <p className="font-mono text-sm mb-1">{alg}</p>
        {alt && <p className="font-mono text-xs text-neutral-400">{alt}</p>}
      </div>
    </div>
  )
}

// ─── Filter pill ──────────────────────────────────────────────────────────────

function Pill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  const base =
    'px-3 py-1 rounded-full border text-sm transition select-none cursor-pointer ' +
    'border-neutral-800 bg-neutral-900/40 hover:border-indigo-500 hover:bg-indigo-500/10'
  const activeClass = ' border-indigo-500 bg-indigo-500/10 text-indigo-200'
  const inactiveClass = ' text-neutral-200'
  return (
    <button type="button" onClick={onClick} className={base + (active ? activeClass : inactiveClass)}>
      {label}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface AlgPageProps {
  sets: AlgSet[]
  /** Strip prefix from pill labels, e.g. "CLL " or "EG-1 " */
  labelPrefix?: string
}

export default function AlgPage({ sets, labelPrefix = '' }: AlgPageProps) {
  const [filter, setFilter] = useState<string>('all')

  // Read hash on mount and on popstate
  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.replace('#', '').trim()
      if (!hash) { setFilter('all'); return }
      if (sets.some(s => s.id === hash)) {
        setFilter(hash)
        // Scroll into view after a tick to let React render first
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [sets])

  function handleFilter(id: string) {
    setFilter(id)
    if (id === 'all') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
      document.getElementById('alg-sections')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      history.replaceState(null, '', `#${id}`)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  const pills = [
    { id: 'all', label: 'All' },
    ...sets.map(s => ({ id: s.id, label: s.title.replace(new RegExp(`^${labelPrefix}`, 'i'), '') })),
  ]

  const visibleSets = filter === 'all' ? sets : sets.filter(s => s.id === filter)

  return (
    <>
      {/* ── Filter nav ── */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 items-center">
            {pills.map(p => (
              <Pill key={p.id} label={p.label} active={filter === p.id} onClick={() => handleFilter(p.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Algorithm sections ── */}
      <div id="alg-sections">
        {visibleSets.map(set => (
          <section
            key={set.id}
            id={set.id}
            className={`py-20${set.sectionClass ? ' ' + set.sectionClass : ''}`}
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-end justify-between gap-4 mb-10">
                <h2 className="text-3xl font-semibold">{set.title}</h2>
                <div className="flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => handleFilter(set.id)}
                    className="text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Show only
                  </button>
                </div>
              </div>

              <div className={`grid ${set.gridClass} gap-6`}>
                {set.cases.map((c, i) => (
                  <AlgCard key={i} img={c.img} alg={c.alg} alt={c.alt} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
