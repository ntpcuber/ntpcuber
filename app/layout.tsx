import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "NTP Cuber | Rubik's Cube Courses & Coaching",
  description: "Master speedcubing with structured courses, algorithm resources, and 1-on-1 coaching from Thailand's top competitor.",
  openGraph: {
    title: "NTP Cuber | Rubik's Cube Courses & Coaching",
    description: "Structured courses, algorithm resources, and 1-on-1 coaching from Thailand's top speedcuber.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via <link> for compatibility */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Sarabun:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-950 text-neutral-100 antialiased" style={{ fontFamily: "'Inter', 'Sarabun', ui-sans-serif, system-ui, sans-serif" }}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
