'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

declare global {
  interface Window {
    YT: {
      Player: new (
        id: string,
        opts: {
          videoId: string
          playerVars?: Record<string, number>
          events?: {
            onReady?: (e: { target: YouTubePlayer }) => void
            onStateChange?: (e: { data: number }) => void
          }
        }
      ) => YouTubePlayer
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YouTubePlayer {
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  getCurrentTime(): number
  destroy(): void
}

const lessons = [
  { id: '1-1', module: 'Module 1: Recognition', title: '1.1 Why ZBLL?', videoId: '304Lk12rBsc', completed: true },
  { id: '1-2', module: 'Module 1: Recognition', title: '1.2 Efficient Recognition Patterns', videoId: '304Lk12rBsc', completed: false, active: true },
  { id: '1-3', module: 'Module 1: Recognition', title: '1.3 Fingertrick Optimization', videoId: '', completed: false },
  { id: '2-1', module: 'Module 2: T-Set', title: '2.1 The T-Set Algorithms', videoId: '', completed: false },
  { id: '2-2', module: 'Module 2: T-Set', title: '2.2 Recognition Drills', videoId: '', completed: false },
]

export default function LearningPage() {
  const params = useParams()
  const [currentLessonIdx, setCurrentLessonIdx] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const playerRef = useRef<YouTubePlayer | null>(null)
  const currentLesson = lessons[currentLessonIdx]

  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      if (!currentLesson.videoId) return
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: currentLesson.videoId,
        playerVars: { controls: 0, modestbranding: 1, rel: 0, disablekb: 1, fs: 0, playsinline: 1 },
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true)
            if (e.data === window.YT.PlayerState.PAUSED) setIsPlaying(false)
            if (e.data === window.YT.PlayerState.ENDED) { setIsPlaying(false); setVideoEnded(true) }
          },
        },
      })
    }
    return () => { playerRef.current?.destroy() }
  }, [currentLessonIdx])

  const completedCount = lessons.filter(l => l.completed).length
  const progress = Math.round((completedCount / lessons.length) * 100)

  function togglePlay() {
    if (!playerRef.current) return
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()
  }

  function rewind() {
    if (!playerRef.current) return
    playerRef.current.seekTo(Math.max(0, playerRef.current.getCurrentTime() - 10), true)
  }

  const grouped = lessons.reduce<Record<string, typeof lessons>>((acc, l) => {
    acc[l.module] = acc[l.module] || []
    acc[l.module].push(l)
    return acc
  }, {})

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-1 bg-[#0f1113]">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${progress}%` }} />
      </div>

      {/* Main video area */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <nav className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">{currentLesson.module}</nav>
            <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
          </div>

          {/* Video embed */}
          <div className="aspect-video bg-black rounded-2xl border border-neutral-800 mb-4 overflow-hidden shadow-2xl relative group">
            <div id="yt-player" className="absolute inset-0 w-full h-full pointer-events-none" />
            <div className="absolute inset-0 w-full h-full bg-transparent z-10" />
          </div>

          {/* Controls */}
          <div className="flex gap-3 mb-8">
            <button onClick={togglePlay} className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm font-bold transition">
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button onClick={rewind} className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm font-bold transition">
              ⏪ Rewind 10s
            </button>
          </div>

          {/* Nav bar */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-neutral-800 gap-4">
            <button
              onClick={() => setCurrentLessonIdx(i => Math.max(0, i - 1))}
              className="w-full md:w-auto px-8 py-3 bg-neutral-900 border border-neutral-800 rounded-xl font-bold hover:bg-neutral-800 transition"
            >
              ← Previous
            </button>
            <div className="text-center">
              <span className="block text-[10px] text-neutral-500 uppercase font-bold tracking-tighter">Current Progress</span>
              <span className="text-sm font-semibold">Lesson {currentLessonIdx + 1} of {lessons.length}</span>
            </div>
            <button
              onClick={() => videoEnded && setCurrentLessonIdx(i => Math.min(lessons.length - 1, i + 1))}
              className={`w-full md:w-auto px-8 py-3 bg-blue-600 rounded-xl font-bold transition ${!videoEnded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
            >
              Complete & Next →
            </button>
          </div>

          {/* About lesson */}
          <div className="mt-8 p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800">
            <h3 className="font-bold mb-3">About this lesson</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              In this video, we break down the top-face patterns for the ZBLL T-Set. Focus on the corner-edge relationship
              and how to avoid double-flicks during the recognition phase.
            </p>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-full lg:w-[400px] bg-[#16181b] border-l border-neutral-800 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Course Content</h2>
            <span className="text-blue-500 text-sm font-bold bg-blue-500/10 px-2 py-1 rounded">{progress}% Done</span>
          </div>

          {Object.entries(grouped).map(([moduleName, moduleLessons]) => (
            <div key={moduleName} className="mb-10">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                <span>{moduleName}</span>
                <div className="h-[1px] flex-1 bg-neutral-800" />
              </div>
              <div className="space-y-3">
                {moduleLessons.map((lesson) => {
                  const idx = lessons.indexOf(lesson)
                  const isCurrent = idx === currentLessonIdx
                  const isCompleted = lesson.completed

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonIdx(idx)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition text-left ${
                        isCurrent
                          ? 'bg-neutral-800 border border-blue-500'
                          : isCompleted
                          ? 'bg-blue-600/5 border border-blue-500/20'
                          : 'hover:bg-neutral-800/50 border border-transparent text-neutral-500'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                        isCurrent
                          ? 'border-2 border-blue-500'
                          : isCompleted
                          ? 'bg-blue-600'
                          : 'border border-neutral-800'
                      }`}>
                        {isCurrent ? <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> : isCompleted ? '✓' : idx + 1}
                      </div>
                      <span className={`text-sm ${isCurrent ? 'font-bold' : isCompleted ? 'text-blue-400 font-medium' : ''}`}>
                        {lesson.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
