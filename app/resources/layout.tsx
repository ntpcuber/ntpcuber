import PageGlow from '@/components/PageGlow'

// Applies the glow to every /resources page (index, 2x2, 3x3 and Megaminx).
export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageGlow />
      {children}
    </>
  )
}
