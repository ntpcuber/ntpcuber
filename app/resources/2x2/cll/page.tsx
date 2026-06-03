import AlgPage from '@/components/AlgPage'
import cllData from '@/lib/cllData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTP Cuber | 2×2 CLL Algorithms',
  description: 'Complete CLL algorithm set for 2×2 speedcubing — all 7 subsets with diagrams.',
}

export default function CLLPage() {
  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">2x2 CLL</h1>
            <p className="text-neutral-400 max-w-2xl text-lg">
              A Last Layer algorithm set where the first face is a solved layer.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/image/cll-page hero.png"
              alt="2x2 CLL case diagram"
              className="max-w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Algorithm nav + sections — driven entirely by data */}
      <AlgPage sets={cllData} labelPrefix="CLL " />
    </div>
  )
}
