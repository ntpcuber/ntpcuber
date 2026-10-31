'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'
import { supabase, getUser } from '@/lib/supabase'
import Link from 'next/link'
import testimonials from '@/lib/testimonials'
import TestimonialsStack from '@/components/TestimonialsStack'
import YouTubeLite from '@/components/YouTubeLite'

// ─── Data ────────────────────────────────────────────────────────────────────

const WCA_EVENTS = ['3x3','2x2','4x4','5x5','6x6','7x7','OH (One-Handed)','Skewb','Pyraminx','Square-1','Megaminx']
const DAYS = [
  { value: 'Mon', en: 'Mon', th: 'จันทร์' },
  { value: 'Fri', en: 'Fri', th: 'ศุกร์' },
  { value: 'Sat', en: 'Sat', th: 'เสาร์' },
  { value: 'Sun', en: 'Sun', th: 'อาทิตย์' },
]

const TABS = [
  { id: 'critique', label: 'tabCritique' },
  { id: 'live',     label: 'tabLive' },
  { id: 'pack',     label: 'tabPack' },
] as const

const cnt = {
  en: {
    whyMeTitle: 'Why me?',
    whyMeBenefits: [
      { title: 'Multi-Event Specialist', desc: 'Expertise across various WCA events.' },
      { title: 'Identify & Strengthen', desc: 'Personalized analysis of your weaknesses.' },
      { title: 'Standardize Foundation', desc: 'Refining fundamental techniques.' },
      { title: 'Taylor-made Advice', desc: 'Custom drills for your turning style.' },
    ],
  },
  th: {
    whyMeTitle: 'ทำไมต้องเรียนกับผม?',
    whyMeBenefits: [
      { title: 'เชี่ยวชาญหลายประเภท', desc: 'มีประสบการณ์แข่ง WCA หลากหลายประเภท' },
      { title: 'วิเคราะห์จุดอ่อน', desc: 'วิเคราะห์และแก้ไขจุดอ่อนรายบุคคล' },
      { title: 'ปรับพื้นฐานให้แน่น', desc: 'เสริมสร้างเทคนิคพื้นฐานเพื่อความเร็วที่ยั่งยืน' },
      { title: 'คำแนะนำเฉพาะตัว', desc: 'แบบฝึกหัดที่ออกแบบมาเพื่อสไตล์การหมุนของคุณ' },
    ],
  },
}

interface Service {
  id?: string                           // only needed on the 1-hour card
  group: 'critique' | 'live' | 'pack'   // which tab the card belongs to
  popular?: boolean                     // shows the "Most Popular" badge
  variantOf?: string                    // return-client rate points at the card it belongs to
  name: string
  price: string
  amount: number
  desc: string[]
  saving?: string
  saving_desc?: string
  returningOnly?: boolean
}

const translations: Record<string, {
  title: string; subtitle: string; pricingTitle: string; bookTitle: string
  formGoal: string; formName: string; formEmail: string; formService: string
  formButton: string; paymentInstruction: string; receiptLabel: string
  confirmCheckbox: string; sending: string; bookNow: string
  services: Service[]
  perksTitle: string; perksDesc: string; perksSignIn: string
  returnLabel: string; returnTeaser: string; returnTeaserSub: string; returnSignIn: string
  tabCritique: string; tabLive: string; tabPack: string
  sampleTitle: string; sampleDesc: string; sampleBullets: string[]; sampleVideoTitle: string
  successTitle: string; successBody: string; successAgain: string; successDashboard: string
  errSave: string; errFileTooLarge: string; errPickDay: string; errSameTime: string
}> = {
  en: {
    title: 'Elite Speedcubing Coaching',
    subtitle: 'Break through your plateaus with personalized training in advanced methods from a well-rounded competitive experience coach.',
    pricingTitle: 'Coaching Options',
    bookTitle: 'Reserve Your Session',
    formGoal: 'Your Goal / Focus for this session',
    formName: 'Full Name',
    formEmail: 'Email Address',
    formService: 'Select Service',
    formButton: 'Confirm Booking',
    paymentInstruction: 'Scan QR to Pay',
    receiptLabel: 'Upload Payment Receipt (Required)',
    confirmCheckbox: 'I have completed the payment and uploaded the receipt.',
    sending: 'Sending...',
    bookNow: 'Book Now',
    perksTitle: 'Sign in for exclusive perks',
    perksDesc: 'Your name & email auto-fill at checkout. Returning clients unlock a discounted ฿390 rate on 1-hr sessions.',
    perksSignIn: 'Sign In',
    returnLabel: 'Return Client',
    returnTeaser: 'Return Client Rate — Unlocked',
    returnTeaserSub: 'Available after completing a 1-hr session.',
    returnSignIn: 'Sign in to check eligibility',
    tabCritique: 'Critique', tabLive: 'Live Sessions', tabPack: 'Mastery Pack',
    sampleTitle: 'See what you get',
    sampleDesc: 'A real **video critique** delivered to a past client. Every critique follows this same format, tailored to your own solves.',
    sampleBullets: [
      'Solve-by-solve breakdown of your recorded solves',
      'Strengths and inefficiencies pointed out on screen',
      'Lookahead, turning and ergonomics feedback',
      'A clear list of what to practise next',
    ],
    sampleVideoTitle: 'Sample video critique',
    successTitle: 'Booking received!',
    successBody: "We'll review your payment and confirm by email shortly. You can also track the status on your dashboard.",
    successAgain: 'Book another session',
    successDashboard: 'View my bookings',
    errSave: "Something went wrong and your booking wasn't saved. Please try again, or message me on Facebook.",
    errFileTooLarge: 'File is too large! Please upload an image smaller than 2MB.',
    errPickDay: 'Please select at least one available day.',
    errSameTime: 'Primary and secondary time cannot be the same.',
    services: [
      {
        group: 'critique',
        name: 'Written Critique (Video Analysis)',
        price: '฿200', amount: 200,
        desc: [
          'Detailed breakdown of 5 recorded solves.',
          'Identify strengths and inefficiencies',
          'Lookahead and turning analysis',
          'Personalized feedback and improvement guide',
        ],
      },
      {
        group: 'critique', popular: true,
        name: 'Video Critique (Video Analysis)',
        price: '฿360', amount: 360,
        desc: [
          'Detailed breakdown of 5 recorded solves.',
          'Identify strengths and inefficiencies',
          'Lookahead and turning analysis',
          'Ergonomics suggestions',
          'Personalized feedback and improvement tips',
        ],
      },
      {
        group: 'live',
        name: 'Live 1-on-1 Session (30-Min)',
        price: '฿240', amount: 240,
        desc: [
          'Interactive coaching via video call.',
          'Real-time solve analysis',
          'Personalized advice on targeted practice drills',
        ],
      },
      {
        group: 'live', popular: true, id: 'live60',
        name: 'Live 1-on-1 Session (1 Hour)',
        price: '฿420', amount: 420,
        desc: [
          'Interactive coaching via video call.',
          'Real-time solve breakdown',
          'Lookahead drills tailored to your speed',
          'Deep dive into efficiency and ergonomics',
        ],
      },
      {
        group: 'live', variantOf: 'live60',
        name: 'Live 1-on-1 Session (1 Hour) — Return Client',
        price: '฿390', amount: 390,
        returningOnly: true,
        desc: [
          'Interactive coaching via video call.',
          'Real-time solve breakdown',
          'Lookahead drills tailored to your speed',
          'Deep dive into efficiency and ergonomics',
          'Exclusive discounted rate for returning clients',
        ],
      },
      {
        group: 'pack',
        name: 'Mastery Pack Live 1-on-1 (4 Sessions)',
        price: '฿1,550', amount: 1550,
        saving: 'Save ฿130', saving_desc: 'vs individual sessions',
        desc: [
          'Comprehensive progression with a structured 4-week training plan',
          'Weekly check in to track your progress',
          'Focus on all aspects; Algorithm, Ergonomics and Efficiencies.',
        ],
      },
    ],
  },
  th: {
    title: 'โค้ชรูบิกระดับมืออาชีพ',
    subtitle: 'ยกระดับการแก้รูบิคด้วยเทคนิคระดับสูงและการวิเคราะห์เฉพาะบุคคล โดยโค้ชที่มีประสบการณ์การแข่งขันรอบด้าน',
    pricingTitle: 'แพ็กเกจการสอน',
    bookTitle: 'จองเวลาเรียนของคุณ',
    formGoal: 'เป้าหมายหรือสิ่งที่ต้องการเน้นใน session นี้',
    formName: 'ชื่อ-นามสกุล',
    formEmail: 'อีเมล',
    formService: 'เลือกบริการ',
    formButton: 'ยืนยันการจอง',
    paymentInstruction: 'สแกน QR เพื่อชำระเงิน',
    receiptLabel: 'แนบหลักฐานการโอนเงิน (จำเป็น)',
    confirmCheckbox: 'ฉันได้ชำระเงินและแนบหลักฐานเรียบร้อยแล้ว',
    sending: 'กำลังส่ง...',
    bookNow: 'จองเลย',
    perksTitle: 'เข้าสู่ระบบเพื่อรับสิทธิพิเศษ',
    perksDesc: 'ระบบจะกรอกชื่อและอีเมลของคุณอัตโนมัติ และลูกค้าที่เคยเรียนแล้วจะได้รับส่วนลดพิเศษ ฿390 สำหรับคลาส 1 ชั่วโมง',
    perksSignIn: 'เข้าสู่ระบบ',
    returnLabel: 'ลูกค้าเก่า',
    returnTeaser: 'ราคาพิเศษสำหรับลูกค้าเก่า',
    returnTeaserSub: 'ใช้ได้หลังจากเรียนคลาส 1 ชั่วโมงครบแล้ว',
    returnSignIn: 'เข้าสู่ระบบเพื่อตรวจสอบสิทธิ์',
    tabCritique: 'วิเคราะห์การแก้', tabLive: 'สอนสด', tabPack: 'แพ็กเกจเชี่ยวชาญ',
    sampleTitle: 'ตัวอย่างสิ่งที่คุณจะได้รับ',
    sampleDesc: '**วิดีโอวิเคราะห์**จริงที่ส่งให้ผู้เรียนท่านหนึ่ง ทุกงานจะอยู่ในรูปแบบเดียวกันนี้ และปรับตามการแก้ของคุณเอง',
    sampleBullets: [
      'วิเคราะห์การแก้ทีละรอบอย่างละเอียด',
      'ชี้จุดแข็งและจุดที่เสียเวลาให้เห็นบนหน้าจอ',
      'ฟีดแบ็กเรื่องการมองล่วงหน้า การหมุน และท่าทางการจับลูก',
      'สรุปสิ่งที่ควรฝึกต่อไปอย่างชัดเจน',
    ],
    sampleVideoTitle: 'ตัวอย่างวิดีโอวิเคราะห์การแก้',
    successTitle: 'ได้รับการจองแล้ว!',
    successBody: 'เราจะตรวจสอบการชำระเงินและยืนยันทางอีเมลโดยเร็วที่สุด คุณสามารถติดตามสถานะได้ที่หน้าแดชบอร์ด',
    successAgain: 'จองคลาสอื่นเพิ่ม',
    successDashboard: 'ดูการจองของฉัน',
    errSave: 'เกิดข้อผิดพลาด การจองของคุณยังไม่ถูกบันทึก กรุณาลองใหม่อีกครั้ง หรือทักมาทางเพจ Facebook',
    errFileTooLarge: 'ไฟล์มีขนาดใหญ่เกินไป! กรุณาแนบรูปภาพที่มีขนาดไม่เกิน 2MB',
    errPickDay: 'กรุณาเลือกวันที่สะดวกอย่างน้อย 1 วัน',
    errSameTime: 'เวลาหลักและเวลาสำรองต้องไม่ซ้ำกัน',
    services: [
      {
        group: 'critique',
        name: 'ตรวจการแก้แบบเขียน (Video Analysis)',
        price: '฿200', amount: 200,
        desc: [
          'วิเคราะห์การแก้ 5 รอบแบบละเอียด',
          'ชี้ให้เห็นจุดแข็งและจุดที่พัฒนาได้',
          'วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน',
          'ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง',
        ],
      },
      {
        group: 'critique', popular: true,
        name: 'ตรวจการแก้แบบวิดีโอ (Video Analysis)',
        price: '฿360', amount: 360,
        desc: [
          'วิเคราะห์การแก้ 5 รอบแบบละเอียด',
          'ชี้ให้เห็นจุดแข็งและจุดที่พัฒนาได้',
          'วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน',
          'แนะนำวิธีการหมุนที่เสริมความคล่องตัวยิ่งขึ้น',
          'ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง',
        ],
      },
      {
        group: 'live',
        name: 'สอนสดตัวต่อตัว (30 นาที)',
        price: '฿240', amount: 240,
        desc: [
          'เรียนสดผ่านวิดีโอคอล',
          'วิเคราะห์การแก้โจทย์ทันที',
          'ให้คำแนะนำในการฝึกเฉพาะส่วนสำหรับคุณ',
        ],
      },
      {
        group: 'live', popular: true, id: 'live60',
        name: 'สอนสดตัวต่อตัว (1 ชั่วโมง)',
        price: '฿420', amount: 420,
        desc: [
          'เรียนสดเน้นเนื้อหาเจาะลึก',
          'วิเคราะห์การแก้โจทย์ทันที',
          'ฝึกการมองล่วงหน้าตามระดับความเหมาะสม',
          'เจาะลึกประสิทธิภาพและความคล่องตัวการหมุน',
        ],
      },
      {
        group: 'live', variantOf: 'live60',
        name: 'สอนสดตัวต่อตัว (1 ชั่วโมง) — ลูกค้าเก่า',
        price: '฿390', amount: 390,
        returningOnly: true,
        desc: [
          'เรียนสดเน้นเนื้อหาเจาะลึก',
          'วิเคราะห์การแก้โจทย์ทันที',
          'ฝึกการมองล่วงหน้าตามระดับความเหมาะสม',
          'เจาะลึกประสิทธิภาพและความคล่องตัวการหมุน',
          'ราคาพิเศษสำหรับลูกค้าที่เคยเรียนมาแล้ว',
        ],
      },
      {
        group: 'pack',
        name: 'แพ็กเกจเชี่ยวชาญ สอนสดตัวต่อตัว (4 ครั้ง)',
        price: '฿1,550', amount: 1550,
        saving: 'ประหยัด ฿130', saving_desc: 'เมื่อเทียบกับคลาสรายครั้ง',
        desc: [
          'แผนการฝึกซ้อมต่อเนื่อง 4 สัปดาห์ เพื่อการพัฒนาที่เห็นผล',
          'ติดตามผลรายสัปดาห์เพื่อเช็คการฝึกซ้อม',
          'ให้ความสำคัญรอบด้านไม่ว่าจะเป็นสูตรที่ใช้ วิธีการหมุนที่คล่องตัว และ ประสิทธิภาพในการแก้',
        ],
      },
    ],
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateTimes(startHour: number): string[] {
  const opts: string[] = []
  for (let h = startHour; h <= 23; h++) {
    for (const m of ['00', '30']) {
      opts.push(`${String(h).padStart(2, '0')}:${m}`)
    }
  }
  return opts
}

// Turns **text** into bold text
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-bold text-neutral-900 dark:text-white">{part}</strong>
      : part
  )
}

async function compressImage(file: File, maxWidth = 1000, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target!.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        if (width > maxWidth) { height = (maxWidth / width) * height; width = maxWidth }
        canvas.width = width; canvas.height = height
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality).split(',')[1])
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}

async function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
  })
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

type ProgressMode = 1 | 2 | 3

interface ProgressBarProps {
  mode: ProgressMode
  currentStep: number
}

function ProgressBar({ mode, currentStep }: ProgressBarProps) {
  const stepsMap = mode === 1 ? [1] : mode === 2 ? [1, 3] : [1, 2, 3]
  const labels   = mode === 1 ? ['Service'] : mode === 2 ? ['Service', 'Payment'] : ['Service', 'Details', 'Payment']
  const cols     = mode === 1 ? 'grid-cols-1' : mode === 2 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className="mb-12">
      <div className={`grid ${cols} gap-3`}>
        {stepsMap.map((stepNum) => {
          let color = 'bg-neutral-800'
          if (stepNum < currentStep) color = 'bg-blue-500/60'
          if (stepNum === currentStep) color = 'bg-blue-600'
          return (
            <div key={stepNum} className={`h-2 rounded-full transition-colors duration-300 ${color}`} />
          )
        })}
      </div>
      <div className={`grid ${cols} gap-3 mt-3 text-xs text-neutral-500`}>
        {labels.map((label, i) => (
          <div key={label} className={i === 0 ? 'text-left' : i === labels.length - 1 ? 'text-right' : 'text-center'}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CoachingPage() {
  const { lang } = useLang()
  const trans = translations[lang]
  const c = cnt[lang]

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasPreviousSession, setHasPreviousSession] = useState(false)

  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [wcaEvent, setWcaEvent] = useState('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [preferredTime, setPreferredTime] = useState('')
  const [secondaryTime, setSecondaryTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [goal, setGoal] = useState('')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [cachedReceipt, setCachedReceipt] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [qrSrc, setQrSrc] = useState('/image/qr_payment.jpeg')

  // UI state
  const [activeTab, setActiveTab] = useState<'critique' | 'live' | 'pack'>('critique')
  const [submitted, setSubmitted] = useState(false)
  const [daysError, setDaysError] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'error' | 'success' } | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showToast(msg: string, type: 'error' | 'success' = 'error') {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ msg, type })
    toastTimer.current = setTimeout(() => setToast(null), 5000)
  }

  const bookSectionRef = useRef<HTMLElement>(null)

  // Derived
  const isCritique = selectedService.toLowerCase().includes('analysis')
  const progressMode: ProgressMode = !selectedService ? 1 : isCritique ? 2 : 3

  // Time options
  const hasWeekend = selectedDays.some(d => d === 'Sat' || d === 'Sun')
  const hasWeekday = selectedDays.some(d => d === 'Mon' || d === 'Fri')
  const timeStartHour = hasWeekend && !hasWeekday ? 14 : 19
  const timeOptions = generateTimes(timeStartHour)

  // Services visible in the booking dropdown (return-client rate only when eligible)
  const visibleServices = trans.services.filter(
    s => !s.returningOnly || (isLoggedIn && hasPreviousSession)
  )
  // Cards shown in the pricing grid for the active tab
  const cardServices = visibleServices.filter(
    s => !s.returningOnly && s.group === activeTab
  )

  // Auth + previous session check
  useEffect(() => {
    getUser().then(async user => {
      if (!user) return
      setIsLoggedIn(true)
      if (!name) setName(user.user_metadata?.full_name || '')
      if (!email) setEmail(user.email || '')

      // Check for a confirmed or completed 1-hr session
      const { data } = await supabase
        .from('coaching_bookings')
        .select('id')
        .eq('user_id', user.id)
        .ilike('service', '%1 Hour%')
        .in('status', ['confirmed', 'completed'])
        .limit(1)
        .maybeSingle()

      setHasPreviousSession(data !== null)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update QR when service changes
  useEffect(() => {
    if (!selectedService) { setQrSrc('/image/qr_payment.jpeg'); return }
    const svc = trans.services.find(s => s.name === selectedService)
    if (svc) setQrSrc(`https://promptpay.io/0868545948/${svc.amount}.png`)
  }, [selectedService, trans.services])

  // Reset invalid times when days change
  useEffect(() => {
    const startH = selectedDays.some(d => d === 'Sat' || d === 'Sun') ? 14 : 19
    if (preferredTime && parseInt(preferredTime.split(':')[0]) < startH) setPreferredTime('')
    if (secondaryTime && parseInt(secondaryTime.split(':')[0]) < startH) setSecondaryTime('')
  }, [selectedDays]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleReceiptChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setReceiptFile(file)
    if (!file) { setCachedReceipt(''); return }
    if (file.type.startsWith('image/')) {
      setCachedReceipt(await compressImage(file, 1000, 0.7))
    } else {
      setCachedReceipt(await toBase64(file))
    }
  }

  function goToStep(target: number) {
    let step = target
    if (step === 2 && isCritique) step = 3
    setCurrentStep(step)
  }

  function scrollToBooking(serviceName: string) {
    setSubmitted(false)
    setSelectedService(serviceName)
    setCurrentStep(1)
    bookSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return

    const MAX_SIZE = 2 * 1024 * 1024
    if (receiptFile && receiptFile.size > MAX_SIZE) { showToast(trans.errFileTooLarge); return }
    if (!isCritique && selectedDays.length === 0)   { showToast(trans.errPickDay); return }

    setSubmitting(true)

    try {
      const user = await getUser()
      const svc = trans.services.find(s => s.name === selectedService)

      // 1) Save to Supabase FIRST. This is the source of truth.
      const { error } = await supabase.from('coaching_bookings').insert({
        user_id:        user?.id ?? null,
        name, email,
        service:        selectedService,
        wca_event:      isCritique ? null : wcaEvent || null,
        video_link:     isCritique ? videoLink || null : null,
        available_days: isCritique ? null : selectedDays.length ? selectedDays : null,
        preferred_time: isCritique ? null : preferredTime || null,
        secondary_time: isCritique ? null : secondaryTime || null,
        goal:           isCritique ? null : goal || null,
        amount_thb:     svc?.amount ?? null,
      })

      if (error) {
        console.error('Booking save failed:', error)
        showToast(trans.errSave)
        return                       // keep the form filled in, no success UI
      }

      // 2) Notification / sheet logging is best-effort. A failure here must not block the booking.
      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          service:       selectedService,
          goal:          isCritique ? '' : goal,
          availableDate: isCritique ? '' : selectedDays,
          preferredTime: isCritique ? '' : preferredTime,
          secondaryTime: isCritique ? '' : secondaryTime,
          videoLink:     isCritique ? videoLink : '',
          wcaEvent:      isCritique ? '' : wcaEvent,
          receiptData:   cachedReceipt,
          receiptName:   receiptFile ? receiptFile.name.replace(/\.[^/.]+$/, '.jpg') : 'receipt.jpg',
        }),
      }).catch(err => console.error('Background send failed:', err))

      // 3) Only now show success and reset
      setSubmitted(true)
      setDaysError(false)
      setSelectedService(''); setVideoLink(''); setWcaEvent(''); setSelectedDays([])
      setPreferredTime(''); setSecondaryTime(''); setGoal('')
      setPaymentConfirmed(false); setReceiptFile(null); setCachedReceipt('')
      setCurrentStep(1)
      bookSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      console.error('Booking error:', err)
      showToast(trans.errSave)
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = 'w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-4 rounded-xl focus:border-blue-500 outline-none text-neutral-900 dark:text-white placeholder-neutral-500 transition'

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-blue-500/30 transition-colors">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-neutral-900 dark:text-white">{trans.title}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">{trans.subtitle}</p>
        </div>
      </section>

      {/* ── Why Me ── */}
      <section id="why-me" className="py-24 px-6 bg-neutral-100 dark:bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-full -z-10" />
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-2 rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
                <img
                  src="/image/coach_profile1.jpg"
                  alt="Coach"
                  className="w-full aspect-[4/5] object-cover rounded-2xl mb-8"
                />
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                    {lang === 'th' ? 'ณัฐภัทร มาทานี' : 'Natthaphat Mahtani'}
                  </h2>
                  <p className="text-blue-600 dark:text-blue-500 font-semibold mb-6">
                    {lang === 'th' ? 'นักแข่งที่มีความสามารถรอบด้านมากที่สุดในไทย' : "Thailand's best All-rounder"}
                  </p>
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-neutral-500 font-bold">
                      {lang === 'th' ? 'ผลงานโดดเด่น' : 'Achievement Highlights'}
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                        <span className="text-blue-500">🏆</span>
                        <p className="leading-relaxed">
                          {lang === 'th' ? 'สถิติรูบิก 3x3 เวลาเร็วที่สุดเคยเป็นอันดับ 9 ของโลก' : '3x3 single peak ranking 9th global'}
                        </p>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                        <span className="text-blue-500">🏅</span>
                        <p className="leading-relaxed">
                          {lang === 'th' ? 'เข้ารอบชิงในงานแข่งระดับทวีป' : 'Finalist in Continental Championship'}
                        </p>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                        <span className="text-blue-500">⏱️</span>
                        <p className="leading-relaxed">
                          {lang === 'th' ? 'ประสบการณ์กว่า 10 ปี' : '10+ years experience'}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-900 dark:text-white">
                {c.whyMeTitle.replace('?', '')} <span className="text-blue-500">?</span>
              </h2>
              <div className="space-y-8">
                {c.whyMeBenefits.map((b, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-500 text-xl">
                      {['🧩', '🔍', '🏗️', '🎯'][i]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">{b.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-blue-100 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/30 rounded-2xl inline-block">
                <p className="text-blue-700 dark:text-blue-400 font-bold">
                  {lang === 'th' ? 'เปิดสอนแบบคลาสออนไลน์' : 'Online Sessions Available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {lang === 'th' ? 'รีวิวจากผู้เรียน' : 'What Clients Say'}
          </h2>
          <TestimonialsStack testimonials={testimonials} lang={lang} />
        </div>
      </section>

      {/* ── Sign-in perks banner (logged-out only) ── */}
      {!isLoggedIn && (
        <div className="max-w-6xl mx-auto px-6 pt-16 -mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl px-6 py-5">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl shrink-0">🔐</span>
              <div>
                <p className="font-bold text-indigo-300 mb-0.5">{trans.perksTitle}</p>
                <p className="text-sm text-neutral-400 leading-relaxed">{trans.perksDesc}</p>
              </div>
            </div>
            <Link
              href="/login?next=/coaching"
              className="shrink-0 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition active:scale-95 whitespace-nowrap"
            >
              {trans.perksSignIn}
            </Link>
          </div>
        </div>
      )}

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 bg-neutral-50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-neutral-900 dark:text-white">{trans.pricingTitle}</h2>

          {/* Tabs */}
          <div className="flex justify-center mb-14">
            <div role="tablist" className="inline-flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 max-w-full overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-indigo-500'
                  }`}
                >
                  {trans[tab.label]}
                </button>
              ))}
            </div>
          </div>

          {/* Sample critique (Critique tab only) */}
          {activeTab === 'critique' && (
            <div id="sample" className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto scroll-mt-28">
              <YouTubeLite id="x9NCbZh0yaI" title={trans.sampleVideoTitle} />
              <div>
                <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{trans.sampleTitle}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">{renderBold(trans.sampleDesc)}</p>
                <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {trans.sampleBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold mt-[2px] text-indigo-600 dark:text-indigo-400">✔</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-8">
            {cardServices.map(s => {
              const isMastery = s.group === 'pack'
              const variant = s.id ? visibleServices.find(v => v.variantOf === s.id) : undefined

              return (
                <div
                  key={s.name}
                  className={`relative w-full md:w-[calc(50%-1rem)] lg:max-w-md bg-white dark:bg-neutral-900 border ${
                    s.popular
                      ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                      : isMastery
                      ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                      : 'border-neutral-200 dark:border-neutral-800'
                  } p-8 rounded-2xl hover:border-indigo-500 transition duration-300 flex flex-col justify-between`}
                >
                  {s.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  {isMastery && s.saving && (
                    <div className="absolute -top-4 right-4 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                      {s.saving}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 min-h-[64px]">{s.name}</h3>
                    <ul className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 space-y-2">
                      {s.desc.map((f, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="font-bold mt-[2px] text-indigo-600 dark:text-indigo-400">✔</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{s.price}</div>
                      {s.saving && (
                        <div className="text-sm text-green-600 dark:text-green-400 font-semibold mt-1">
                          {s.saving} {s.saving_desc}
                        </div>
                      )}
                    </div>

                    {/* Return-client variant strip (only when eligible) */}
                    {variant && (
                      <div className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 p-3 flex items-center justify-between gap-3">
                        <div className="text-xs">
                          <p className="font-bold text-emerald-700 dark:text-emerald-300">⭐ {trans.returnLabel}</p>
                          <p className="text-emerald-600 dark:text-emerald-400">
                            {variant.price} · {lang === 'en' ? 'Saved ฿30' : 'ประหยัด ฿30'}
                          </p>
                        </div>
                        <button
                          onClick={() => scrollToBooking(variant.name)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95"
                        >
                          {trans.bookNow}
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => scrollToBooking(s.name)}
                      className="w-full py-3 font-bold rounded-xl transition-colors shadow-lg active:scale-95 bg-neutral-100 hover:bg-indigo-600 text-neutral-900 hover:text-white dark:bg-neutral-800 dark:hover:bg-indigo-600 dark:text-white"
                    >
                      {trans.bookNow}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Locked return-rate hint (Live tab, not yet eligible) */}
          {activeTab === 'live' && !(isLoggedIn && hasPreviousSession) && (
            <p className="mt-10 text-center text-sm text-neutral-500">
              🔒 {trans.returnLabel} · ฿390 —{' '}
              {isLoggedIn ? (
                lang === 'en'
                  ? 'complete a 1-hr session to unlock'
                  : 'เรียนคลาส 1 ชั่วโมงให้ครบก่อนเพื่อปลดล็อกราคานี้'
              ) : (
                <Link href="/login?next=/coaching" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  {trans.returnSignIn}
                </Link>
              )}
            </p>
          )}
        </div>
      </section>

      {/* ── Booking form ── */}
      <section id="book" ref={bookSectionRef} className="py-24 px-6 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-neutral-900 dark:text-white">{trans.bookTitle}</h2>

          {submitted ? (
            /* ── Success screen ── */
            <div className="text-center bg-white dark:bg-neutral-900 border border-emerald-500/40 rounded-2xl p-10 shadow-sm dark:shadow-none">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{trans.successTitle}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">{trans.successBody}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {isLoggedIn && (
                  <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition">
                    {trans.successDashboard}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold text-sm transition"
                >
                  {trans.successAgain}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault()
              if (currentStep === 1) { goToStep(2); return }
              if (currentStep === 2) {
                if (selectedDays.length === 0) {
                  setDaysError(true)
                  showToast(trans.errPickDay)
                  document.getElementById('days-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  return
                }
                goToStep(3)
                return
              }
              handleSubmit(e)
            }}>
              <ProgressBar mode={progressMode} currentStep={currentStep} />

              {/* ── Step 1: Service selection ── */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <select
                    required
                    value={selectedService}
                    onChange={e => {
                      setSelectedService(e.target.value)
                      setVideoLink(''); setWcaEvent(''); setSelectedDays([])
                      setPreferredTime(''); setSecondaryTime(''); setGoal('')
                      setPaymentConfirmed(false)
                    }}
                    className={inputCls}
                  >
                    <option value="" disabled>{trans.formService}</option>
                    {/* Only show returning-client option if eligible */}
                    {visibleServices.map(s => (
                      <option key={s.name} value={s.name}>{s.name} - {s.price}</option>
                    ))}
                  </select>

                  {isCritique && selectedService && (
                    <div>
                      <label className="block mb-2 text-neutral-400">🔗 Video Link of your Solves</label>
                      <input
                        type="url"
                        value={videoLink}
                        onChange={e => setVideoLink(e.target.value)}
                        placeholder="YouTube/Drive link"
                        required
                        className={inputCls}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedService}
                    className="w-full bg-blue-600 font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* ── Step 2: Logistics (live sessions only) ── */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-neutral-400">🏆 WCA Event</label>
                    <select required value={wcaEvent} onChange={e => setWcaEvent(e.target.value)} className={inputCls}>
                      <option value="">{lang === 'th' ? 'เลือกประเภท' : 'Select event'}</option>
                      {WCA_EVENTS.map(ev => <option key={ev}>{ev}</option>)}
                    </select>
                  </div>

                  <div id="days-group">
                    <label className="block mb-3 text-neutral-400">
                      {lang === 'th' ? '📅 วันที่สะดวก (กรุณาเลือกอย่างน้อย 1 วัน)' : '📅 Available Day (select all that applies)'}
                    </label>
                    <div className={`flex flex-wrap gap-3 rounded-2xl ${daysError ? 'ring-2 ring-red-500/60 p-2 -m-2' : ''}`}>
                      {DAYS.map(day => (
                        <label key={day.value} className="cursor-pointer">
                          <input
                            type="checkbox"
                            value={day.value}
                            checked={selectedDays.includes(day.value)}
                            onChange={e => {
                              setDaysError(false)
                              setSelectedDays(prev =>
                                e.target.checked ? [...prev, day.value] : prev.filter(d => d !== day.value)
                              )
                            }}
                            className="hidden peer"
                          />
                          <span className="px-5 py-3 rounded-full bg-neutral-800 peer-checked:bg-blue-600 text-sm select-none inline-block transition-colors">
                            {lang === 'th' ? day.th : day.en}
                          </span>
                        </label>
                      ))}
                    </div>
                    {daysError && (
                      <p className="mt-3 text-sm text-red-500 dark:text-red-400">{trans.errPickDay}</p>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-neutral-400">
                        {lang === 'th' ? '⏰ เวลาที่สะดวกที่สุด' : '⏰ Most Preferred Starting Time'}
                      </label>
                      <select
                        required value={preferredTime}
                        onChange={e => {
                          const val = e.target.value
                          if (val && val === secondaryTime) { showToast(trans.errSameTime); return }
                          setPreferredTime(val)
                        }}
                        className={inputCls}
                      >
                        <option value="">{lang === 'th' ? 'เลือกเวลา' : 'Select time'}</option>
                        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-neutral-400">
                        {lang === 'th' ? '🕰️ เวลาสำรองที่สะดวก' : '🕰️ Secondary Preferred Starting Time'}
                      </label>
                      <select
                        required value={secondaryTime}
                        onChange={e => {
                          const val = e.target.value
                          if (val && val === preferredTime) { showToast(trans.errSameTime); return }
                          setSecondaryTime(val)
                        }}
                        className={inputCls}
                      >
                        <option value="">{lang === 'th' ? 'เลือกเวลา' : 'Select time'}</option>
                        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setCurrentStep(1)} className="w-1/3 bg-neutral-800 font-bold py-4 rounded-xl hover:bg-neutral-700 transition">Back</button>
                    <button type="submit" className="w-2/3 bg-blue-600 font-bold py-4 rounded-xl hover:bg-blue-700 transition">Next</button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Contact + Payment ── */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" required placeholder={trans.formName} value={name} onChange={e => setName(e.target.value)} className={inputCls} />
                    <input type="email" required placeholder={trans.formEmail} value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
                  </div>

                  {!isCritique && (
                    <div>
                      <label className="block mb-2 text-neutral-400">{trans.formGoal}</label>
                      <textarea
                        rows={3} value={goal} onChange={e => setGoal(e.target.value)}
                        placeholder="e.g., I want to sub-10 or learn full ZBLL"
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
                      <h3 className="text-xl font-bold mb-6">{trans.paymentInstruction}</h3>
                      <img src={qrSrc} alt="Payment QR" className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-white p-2 rounded-xl object-contain" />
                    </div>

                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">{trans.receiptLabel}</label>
                      <input
                        type="file" accept="image/*" required
                        onChange={handleReceiptChange}
                        className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl file:bg-blue-600 file:border-0 file:rounded-full file:text-white file:px-4 text-white"
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-600/5 border border-blue-500/20 rounded-xl">
                      <input
                        type="checkbox" id="confirm-payment"
                        checked={paymentConfirmed} onChange={e => setPaymentConfirmed(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-neutral-800 bg-neutral-900 accent-blue-600"
                      />
                      <label htmlFor="confirm-payment" className="text-sm text-neutral-300 cursor-pointer">
                        {trans.confirmCheckbox}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => goToStep(isCritique ? 1 : 2)}
                      className="w-1/3 bg-neutral-800 font-bold py-4 rounded-xl hover:bg-neutral-700 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!paymentConfirmed || submitting}
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? trans.sending : trans.formButton}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>
      </section>

      {/* ── Toast ── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium flex items-start gap-3 border ${
            toast.type === 'error'
              ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950 dark:border-red-500/40 dark:text-red-200'
              : 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-500/40 dark:text-emerald-200'
          }`}
        >
          <span className="flex-1">{toast.msg}</span>
          <button type="button" onClick={() => setToast(null)} aria-label="Dismiss" className="opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

    </div>
  )
}