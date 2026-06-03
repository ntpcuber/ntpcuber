import AlgPage from '@/components/AlgPage'
import eg2Data from '@/lib/eg2Data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTP Cuber | 2×2 EG-2 / Anti-CLL Algorithms',
  description: 'Complete EG-2 algorithm set for 2×2 speedcubing — diagonal swap cases with diagrams.',
}

export default function EG2Page() {
  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">2x2 EG-2 / Anti-CLL</h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              A last layer algorithm set where the 2 pieces of the solved face are diagonally swapped.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/image/eg2-page hero.png"
              alt="2x2 EG-2 case diagram"
              className="max-w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Algorithm nav + sections — driven entirely by data */}
      <AlgPage sets={eg2Data} labelPrefix="EG-2 " />
    </div>
  )
}
