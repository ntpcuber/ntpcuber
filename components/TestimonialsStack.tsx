'use client'

import { useState, useRef } from 'react'
import type { Testimonial } from '@/lib/testimonials'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-neutral-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.367-2.445a1 1 0 00-1.175 0l-3.366 2.445c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.813 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
        </svg>
      ))}
    </div>
  )
}

interface TestimonialsStackProps {
  testimonials: Testimonial[]
  lang: string
}

const STACK_DEPTH = 3 // top card + 2 peeking behind
const SWIPE_THRESHOLD = 50 // px

export default function TestimonialsStack({ testimonials, lang }: TestimonialsStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const touchStartX = useRef(0)
  const total = testimonials.length

  function goTo(index: number) {
    // wrap-around
    const next = ((index % total) + total) % total
    setActiveIndex(next)
  }

  function next() { goTo(activeIndex + 1) }
  function prev() { goTo(activeIndex - 1) }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
    setDragging(true)
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!dragging) return
    setDragX(e.touches[0].clientX - touchStartX.current)
  }

  function handleTouchEnd() {
    if (dragX > SWIPE_THRESHOLD) prev()
    else if (dragX < -SWIPE_THRESHOLD) next()
    setDragX(0)
    setDragging(false)
  }

  // Build the visible stack: front card first, then the next STACK_DEPTH-1 behind it
  const visibleCards = Array.from({ length: STACK_DEPTH }, (_, offset) => {
    const idx = ((activeIndex + offset) % total + total) % total
    return { idx, offset, testimonial: testimonials[idx] }
  }).reverse() // render back-to-front so front card is last in DOM (on top)

  return (
    <div className="relative max-w-xl mx-auto">
      {/* Card stack */}
      <div
        className="relative h-[340px] sm:h-[300px] select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {visibleCards.map(({ idx, offset, testimonial: t }) => {
          const isFront = offset === 0
          const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
          const quote = lang === 'th' && t.quoteTh ? t.quoteTh : t.quoteEn

          const scale = 1 - offset * 0.05
          const translateY = offset * 14
          const opacity = 1 - offset * 0.35
          const dragTransform = isFront && dragging ? `translateX(${dragX}px) rotate(${dragX / 20}deg)` : ''

          return (
            <div
              key={idx}
              className={`absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col ${
                isFront ? 'hover:border-blue-500/40' : ''
              } transition-transform duration-300 ease-out`}
              style={{
                transform: `translateY(${translateY}px) scale(${scale}) ${dragTransform}`,
                opacity,
                zIndex: STACK_DEPTH - offset,
                transitionProperty: isFront && dragging ? 'none' : 'transform, opacity',
                pointerEvents: isFront ? 'auto' : 'none',
              }}
            >
              <StarRating rating={t.rating} />
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 flex-1 line-clamp-6">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-black text-white shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white text-sm truncate">{t.name}</p>
                  <p className="text-xs text-neutral-500 truncate">{t.service}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous testimonial"
        className="hidden sm:flex absolute left-[-3.5rem] top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:border-blue-500 text-neutral-400 hover:text-blue-400 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next testimonial"
        className="hidden sm:flex absolute right-[-3.5rem] top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 hover:border-blue-500 text-neutral-400 hover:text-blue-400 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? 'w-6 bg-blue-500' : 'w-2 bg-neutral-700 hover:bg-neutral-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}