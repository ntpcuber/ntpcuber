import AlgPage from '@/components/AlgPage'
import eg1Data from '@/lib/eg1Data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTP Cuber | 2×2 EG-1 Algorithms',
  description: 'Complete EG-1 algorithm set for 2×2 speedcubing — adjacent swap cases with diagrams.',
}

export default function EG1Page() {
  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-[-12rem] h-[32rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-3xl -z-10" />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">2x2 EG-1</h1>
            <p className="text-neutral-400 max-w-2xl text-lg mb-6">
              A last layer algorithm set where the 2 pieces of the solved face are adjacently swapped.
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Where to keep the solved bar?
            </h2>
            <p className="text-neutral-400 max-w-2xl text-lg">
              Mostly, the solved bar should be on the back, only for some cases the bar must be held on left (AKA &apos;LEG-1&apos;).
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/image/eg1-page hero.png"
              alt="2x2 EG-1 case diagram"
              className="max-w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Algorithm nav + sections — driven entirely by data */}
      <AlgPage sets={eg1Data} labelPrefix="EG-1 " />
    </div>
  )
}
