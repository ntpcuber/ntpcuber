'use client'

import { useEffect, useRef } from 'react'

/**
 * Fades and slides elements in as they scroll into view.
 *
 * Usage:
 *   const ref = useScrollReveal()
 *   <div ref={ref}> ... <h2 className="reveal">…</h2> ... </div>
 *
 * Every element with the `reveal` class inside the ref'd container is revealed
 * once (see `.reveal` / `.reveal.active` in globals.css). Only put `reveal` on
 * elements whose className never changes, because React would otherwise
 * overwrite the `active` class that this hook adds.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const elements = root.querySelectorAll('.reveal')

    // Show everything straight away for people who prefer reduced motion,
    // or in browsers without IntersectionObserver.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      elements.forEach(el => el.classList.add('active'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target) // reveal once, then stop watching
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, []) // run once on mount, not on every render

  return ref
}
