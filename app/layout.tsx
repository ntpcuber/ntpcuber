import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { Inter, Sarabun } from 'next/font/google'
// import AnnouncementPill from '@/components/AnnouncementPill'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-sarabun',
  display: 'swap',
})

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
    <html lang="en" className={`${inter.variable} ${sarabun.variable}`}>
      <head>
        {/* Inline script — runs before paint, avoids flash */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                const shouldDark = saved ? saved === 'dark' : true;
                document.documentElement.classList.toggle('dark', shouldDark);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans bg-white text-neutral-900 antialiased transition-colors dark:bg-neutral-950 dark:text-neutral-100">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            {/* <AnnouncementPill /> */}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}