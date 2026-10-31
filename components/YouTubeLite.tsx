'use client'

import { useState } from 'react'

export default function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false)

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-200 dark:border-neutral-800 shadow-lg">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 w-full h-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-indigo-600 group-hover:bg-indigo-500 group-hover:scale-110 transition flex items-center justify-center text-white shadow-2xl">
              <svg className="w-7 h-7 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}