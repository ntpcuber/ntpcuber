"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(
  () => import("react-player").then(mod => mod.default),
  { ssr: false, loading: () => <div className="w-full aspect-video bg-black animate-pulse" /> }
) as any;

import { Play, Pause, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

// I added valid test links here! Replace them with your unlisted links later.
const COURSE_LESSONS = [
  { id: 0, title: "1. Introduction to the 3x3 Cube", duration: "3:45", url: "https://www.youtube.com/watch?v=304Lk12rBsc" },
  { id: 1, title: "2. Understanding the Pieces & Notation", duration: "5:20", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 2, title: "3. Step 1: The Daisy & White Cross", duration: "8:15", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 3, title: "4. Step 2: First Layer Corners", duration: "7:30", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 4, title: "5. Step 3: Second Layer Edges", duration: "9:05", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 5, title: "6. Step 4: The Yellow Cross", duration: "6:40", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 6, title: "7. Step 5: Positioning Yellow Edges", duration: "5:50", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 7, title: "8. Step 6: Positioning Yellow Corners", duration: "6:10", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 8, title: "9. Step 7: Orienting Yellow Corners (Final Step)", duration: "4:25", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
];

export default function BeginnerCoursePage() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  const [playing, setPlaying] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setMounted(true);
    const savedProgress = localStorage.getItem("3x3-beginner-progress");
    if (savedProgress) setCompletedLessons(JSON.parse(savedProgress));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("3x3-beginner-progress", JSON.stringify(completedLessons));
  }, [completedLessons, mounted]);

  const progressPercentage = Math.round((completedLessons.length / COURSE_LESSONS.length) * 100);

  // --- Handlers ---
  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = event.currentTarget as HTMLVideoElement;
    const current = target.currentTime || 0;
    const total = target.duration || duration;
    if (!seeking && total > 0) {
      setPlayed(current / total);
    }
    setPlayedSeconds(current);
    if (total > 0 && current / total > 0.9 && !completedLessons.includes(currentIndex)) {
      setCompletedLessons((prev) => [...prev, currentIndex]);
    }
  };

  const handleDurationChange = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = event.currentTarget as HTMLVideoElement;
    const total = target.duration || 0;
    setDuration(total);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
    setWasPlaying(playing);
    setPlaying(false);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setSeeking(false);
    const newPos = parseFloat((e.target as HTMLInputElement).value);
    const seekTime = duration > 0 ? newPos * duration : newPos;
    if (playerRef.current) {
      if (typeof playerRef.current.seekTo === 'function') {
        playerRef.current.seekTo(newPos, "fraction");
      } else if (typeof playerRef.current.currentTime !== 'undefined') {
        playerRef.current.currentTime = seekTime;
      }
    }
    if (wasPlaying) setPlaying(true);
  };

  const togglePlay = () => setPlaying(!playing);

  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  if (!mounted) return <div className="min-h-screen bg-black" />; 

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/courses" className="text-sm font-medium text-blue-600 hover:underline">← Back</Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">{progressPercentage}% Done</span>
            <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col lg:flex-row gap-6">
        
        <div className="flex-1 flex flex-col gap-4">
          <div ref={playerContainerRef} className="relative aspect-video bg-black rounded-xl overflow-hidden group shadow-2xl">
            <ReactPlayer
              key={currentIndex}
              ref={playerRef}
              src={COURSE_LESSONS[currentIndex].url}
              playing={playing}
              controls={false} // REMOVED standard controls to fix conflict
              volume={volume}
              muted={muted}
              width="100%"
              height="100%"
              onTimeUpdate={handleTimeUpdate}
              onDurationChange={handleDurationChange}
              onEnded={() => {
                 if (currentIndex < COURSE_LESSONS.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                 }
              }}
              config={{ 
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    origin: typeof window !== 'undefined' ? window.location.origin : ''
                  }
                }
              }}
            />

            {/* Clickable Overlay */}
            <div 
              className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity cursor-pointer ${!playing ? 'bg-black/40 opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              onClick={togglePlay}
            >
              {!playing && (
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                  <Play size={40} fill="currentColor" className="ml-1" />
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20"
              onClick={(e) => e.stopPropagation()} // PREVENTS clicking the timeline from toggling play/pause
            >
              <input
                type="range" min={0} max={0.999} step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                onTouchStart={handleSeekMouseDown}
                onTouchEnd={handleSeekMouseUp}
                className="w-full h-1.5 accent-blue-500 mb-4 cursor-pointer"
              />
              <div className="flex items-center justify-between text-white">
                <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
                  {playing ? <Pause /> : <Play fill="currentColor" />}
                </button>
                <span className="text-xs font-mono">{formatTime(playedSeconds)} / {formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <h1 className="text-2xl font-bold">{COURSE_LESSONS[currentIndex].title}</h1>
            <div className="flex justify-between mt-6">
              <button 
                disabled={currentIndex === 0}
                onClick={() => { setCurrentIndex(prev => prev - 1); setPlaying(true); }}
                className="px-6 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 disabled:opacity-50"
              >Previous</button>
              <button 
                disabled={currentIndex === COURSE_LESSONS.length - 1}
                onClick={() => { setCurrentIndex(prev => prev + 1); setPlaying(true); }}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
              >Next Lesson</button>
            </div>
          </div>
        </div>

        <aside className="lg:w-80 w-full space-y-2">
          <h3 className="font-bold text-lg px-2 mb-4">Course Content</h3>
          {COURSE_LESSONS.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => { setCurrentIndex(idx); setPlaying(true); }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${currentIndex === idx ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
            >
              {completedLessons.includes(idx) ? <CheckCircle className="text-green-500" size={18} /> : <Circle size={18} />}
              <span className="text-sm font-medium text-left line-clamp-1">{lesson.title}</span>
            </button>
          ))}
        </aside>
      </main>
    </div>
  );
}