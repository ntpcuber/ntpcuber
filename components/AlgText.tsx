'use client'

import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Strip invisible characters that sneak in when pasting (zero-width spaces, BOM)
const clean = (s: string) => s.replace(/[\u200b-\u200d\ufeff]/g, '').trim()

// Data files store some alternates as "alt: R U R'" — drop that prefix for display
const stripAltPrefix = (s: string) => clean(s).replace(/^alt\s*:\s*/i, '')

// Split a leading setup move like "[U2]" or "[x U2]" from the algorithm itself
function splitSetup(alg: string) {
  const m = alg.match(/^(\[[^\]]*\])\s*(.*)$/)
  return m ? { setup: m[1], body: m[2] } : { setup: '', body: alg }
}

// ─── One alg line + its copy button ───────────────────────────────────────────

interface AlgLineProps {
  text: string
  textClass: string
  center: boolean
  nowrap: boolean
}

function AlgLine({ text, textClass, center, nowrap }: AlgLineProps) {
  const { lang } = useLang()
  const [copied, setCopied] = useState(false)
  const { setup, body } = splitSetup(text)

  const label = {
    copy:   lang === 'th' ? 'คัดลอก' : 'Copy',
    copied: lang === 'th' ? 'คัดลอกแล้ว' : 'Copied',
    setup:  lang === 'th' ? 'ท่าเตรียมก่อนเริ่มสูตร' : 'Setup move — before the algorithm',
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text) // full text, setup move included
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''} ${nowrap ? '' : 'flex-wrap'}`}>
      <p className={`font-mono leading-relaxed ${nowrap ? 'whitespace-nowrap' : ''} ${textClass}`}>
        {setup && (
          <span title={label.setup} className="text-neutral-400 dark:text-neutral-500 mr-1.5">
            {setup}
          </span>
        )}
        {body}
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={`${label.copy}: ${text}`}
        className="shrink-0 rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 transition-colors dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
      >
        {copied ? label.copied : label.copy}
      </button>
    </div>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────

interface AlgTextProps {
  alg: string
  alt?: string
  center?: boolean       // center the text (Megaminx cards)
  nowrap?: boolean       // keep each alg on one line (ZBLL table)
  mainClass?: string     // colour of the main alg (ZBLL uses indigo)
}

export default function AlgText({
  alg,
  alt,
  center = false,
  nowrap = false,
  mainClass = 'text-neutral-900 dark:text-neutral-100',
}: AlgTextProps) {
  const { lang } = useLang()
  const main = clean(alg)
  const alternate = alt ? stripAltPrefix(alt) : ''

  return (
    <div className={`flex flex-col gap-3 ${center ? 'items-center text-center' : ''}`}>
      <AlgLine text={main} textClass={`text-sm ${mainClass}`} center={center} nowrap={nowrap} />

      {alternate && (
        <div>
          <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
            {lang === 'th' ? 'สูตรสำรอง' : 'Alternate'}
          </p>
          <AlgLine
            text={alternate}
            textClass="text-xs text-neutral-600 dark:text-neutral-400"
            center={center}
            nowrap={nowrap}
          />
        </div>
      )}
    </div>
  )
}