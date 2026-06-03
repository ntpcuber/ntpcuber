import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Courses | NTP Cuber' }

export default function CoursesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Master Every Move</h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Structured video curriculums designed to take you from hobbyist to podium contender.
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-blue-500 transition group">
            <div className="aspect-video bg-neutral-800 relative">
              <img src="/image/course_thumb_zbll.jpg" alt="ZBLL Course" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">Preview Course</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-1 rounded uppercase font-bold">Advanced</span>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded uppercase font-bold">12 Lessons</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Mastering ZBLL: The Full Guide</h3>
              <p className="text-neutral-400 text-sm mb-6">
                Learn 492 algorithms through pattern recognition and efficient fingertricks.
              </p>
              <Link
                href="/courses/zbll-mastery"
                className="block text-center bg-neutral-800 hover:bg-blue-600 py-3 rounded-xl font-bold transition"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
