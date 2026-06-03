'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '@/context/LanguageContext'
import { supabase, getUser } from '@/lib/supabase'

// ─── Data (exact copy of coaching.js) ────────────────────────────────────────

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwwqbpCMgiHXTgaCYfqt2z3WWfIdE6AEpUcf5pvsYHh5ZMF7a5lzWJYP8W0NFjsT4B0/exec'

const WCA_EVENTS = ['3x3','2x2','4x4','5x5','6x6','7x7','OH (One-Handed)','Skewb','Pyraminx','Square-1','Megaminx']
const DAYS = [
  { value: 'Mon', en: 'Mon', th: 'จันทร์' },
  { value: 'Fri', en: 'Fri', th: 'ศุกร์' },
  { value: 'Sat', en: 'Sat', th: 'เสาร์' },
  { value: 'Sun', en: 'Sun', th: 'อาทิตย์' },
]

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
  name: string
  price: string
  amount: number
  desc: string[]
  saving?: string
  saving_desc?: string
}

const translations: Record<string, {
  title: string; subtitle: string; pricingTitle: string; bookTitle: string
  formGoal: string; formName: string; formEmail: string; formService: string
  formButton: string; paymentInstruction: string; receiptLabel: string
  confirmCheckbox: string; sending: string; success: string; bookNow: string
  services: Service[]
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
    success: 'Success! Check your email soon.',
    bookNow: 'Book Now',
    services: [
      { name: 'Written Critique (Video Analysis)', price: '฿200', amount: 200, desc: ['Detailed breakdown of 5 recorded solves.', 'Identify strengths and inefficiencies', 'Lookahead and turning analysis', 'Personalized feedback and improvement guide'] },
      { name: 'Video Critique (Video Analysis)', price: '฿360', amount: 360, desc: ['Detailed breakdown of 5 recorded solves.', 'Identify strengths and inefficiencies', 'Lookahead and turning analysis', 'Ergonomics suggestions', 'Personalized feedback and improvement tips'] },
      { name: 'Live 1-on-1 Session (30-Min)', price: '฿240', amount: 240, desc: ['Interactive coaching via video call.', 'Real-time solve analysis', 'Personalized advice on targeted practice drills'] },
      { name: 'Live 1-on-1 Session (1 Hour)', price: '฿420', amount: 420, desc: ['Interactive coaching via video call.', 'Real-time solve breakdown', 'Lookahead drills tailored to your speed', 'Deep dive into efficiency and ergonomics'] },
      { name: 'Mastery Pack Live 1-on-1 (4 Sessions)', price: '฿1,550', amount: 1550, saving: 'Save ฿130', saving_desc: 'vs individual sessions', desc: ['Comprehensive progression with a structured 4-week training plan', 'Weekly check in to track your progress', 'Focus on all aspects; Algorithm, Ergonomics and Efficiencies.'] },
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
    success: 'สำเร็จ! โปรดรอการติดต่อกลับทางอีเมล',
    bookNow: 'จองเลย',
    services: [
      { name: 'ตรวจการแก้แบบเขียน (Video Analysis)', price: '฿200', amount: 200, desc: ['วิเคราะห์การแก้ 5 รอบแบบละเอียด', 'ชี้ให้เห็นจุดแข็งและจุดที่พัฒนาได้', 'วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน', 'ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง'] },
      { name: 'ตรวจการแก้แบบวิดีโอ (Video Analysis)', price: '฿360', amount: 360, desc: ['วิเคราะห์การแก้ 5 รอบแบบละเอียด', 'ชี้ให้เห็นจุดแข็งและจุดที่พัฒนาได้', 'วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน', 'แนะนำวิธีการหมุนที่เสริมความคล่องตัวยิ่งขึ้น', 'ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง'] },
      { name: 'สอนสดตัวต่อตัว (30 นาที)', price: '฿240', amount: 240, desc: ['เรียนสดผ่านวิดีโอคอล', 'วิเคราะห์การแก้โจทย์ทันที', 'ให้คำแนะนำในการฝึกเฉพาะส่วนสำหรับคุณ'] },
      { name: 'สอนสดตัวต่อตัว (1 ชั่วโมง)', price: '฿420', amount: 420, desc: ['เรียนสดเน้นเนื้อหาเจาะลึก', 'วิเคราะห์การแก้โจทย์ทันที', 'ฝึกการมองล่วงหน้าตามระดับความเหมาะสม', 'เจาะลึกประสิทธิภาพและความคล่องตัวการหมุน'] },
      { name: 'แพ็กเกจเชี่ยวชาญ สอนสดตัวต่อตัว (4 ครั้ง)', price: '฿1,550', amount: 1550, saving: 'ประหยัด ฿130', saving_desc: 'เมื่อเทียบกับคลาสรายครั้ง', desc: ['แผนการฝึกซ้อมต่อเนื่อง 4 สัปดาห์ เพื่อการพัฒนาที่เห็นผล', 'ติดตามผลรายสัปดาห์เพื่อเช็คการฝึกซ้อม', 'ให้ความสำคัญรอบด้านไม่ว่าจะเป็นสูตรที่ใช้ วิธีการหมุนที่คล่องตัว และ ประสิทธิภาพในการแก้'] },
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

// ─── Progress bar component ───────────────────────────────────────────────────

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
            <div
              key={stepNum}
              className={`h-2 rounded-full transition-colors duration-300 ${color}`}
              aria-label={`Step ${stepNum}`}
            />
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

  const bookSectionRef = useRef<HTMLDivElement>(null)

  // Derived
  const isCritique = selectedService.toLowerCase().includes('analysis')
  const progressMode: ProgressMode = !selectedService ? 1 : isCritique ? 2 : 3

  // Time options — start at 14:00 if only weekend selected, else 19:00
  const hasWeekend = selectedDays.some(d => d === 'Sat' || d === 'Sun')
  const hasWeekday = selectedDays.some(d => d === 'Mon' || d === 'Fri')
  const timeStartHour = hasWeekend && !hasWeekday ? 14 : 19
  const timeOptions = generateTimes(timeStartHour)

  // Pre-fill from auth
  useEffect(() => {
    getUser().then(user => {
      if (!user) return
      if (!name) setName(user.user_metadata?.full_name || '')
      if (!email) setEmail(user.email || '')
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update QR when service changes
  useEffect(() => {
    if (!selectedService) { setQrSrc('/image/qr_payment.jpeg'); return }
    const svc = trans.services.find(s => s.name === selectedService)
    if (svc) {
      setQrSrc(`https://promptpay.io/0868545948/${svc.amount}.png`)
    }
  }, [selectedService, trans.services])

  // When days change, reset invalid time selections
  useEffect(() => {
    const startH = selectedDays.some(d => d === 'Sat' || d === 'Sun') ? 14 : 19
    if (preferredTime && parseInt(preferredTime.split(':')[0]) < startH) setPreferredTime('')
    if (secondaryTime && parseInt(secondaryTime.split(':')[0]) < startH) setSecondaryTime('')
  }, [selectedDays]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle receipt upload with compression
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

  // Step navigation (mirrors nextStep() logic)
  function goToStep(target: number) {
    // Going backwards — always allow
    if (target < currentStep) {
      setCurrentStep(target)
      return
    }

    // Validate step 1
    if (currentStep === 1) {
      if (!selectedService) {
        alert(lang === 'en' ? 'Please select a service.' : 'กรุณาเลือกบริการ')
        return
      }
      if (isCritique && !videoLink.trim()) {
        alert(lang === 'en' ? 'Please provide a video link.' : 'กรุณาใส่ลิงก์วิดีโอ')
        return
      }
    }

    // Validate step 2 (live sessions only)
    if (currentStep === 2) {
      if (!wcaEvent) {
        alert(lang === 'en' ? 'Please select a WCA event.' : 'กรุณาเลือกประเภท')
        return
      }
      if (selectedDays.length === 0) {
        alert(lang === 'en' ? 'Please select at least one available day.' : 'กรุณาเลือกวันที่สะดวกอย่างน้อย 1 วัน')
        return
      }
      if (!preferredTime) {
        alert(lang === 'en' ? 'Please select a preferred time.' : 'กรุณาเลือกเวลาที่สะดวก')
        return
      }
      if (!secondaryTime) {
        alert(lang === 'en' ? 'Please select a secondary time.' : 'กรุณาเลือกเวลาสำรอง')
        return
      }
    }
    
    let step = target
    if (step === 2 && isCritique) step = 3
    setCurrentStep(step)
  }

  function scrollToBooking(serviceName: string) {
    setSelectedService(serviceName)
    setCurrentStep(1)
    bookSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const MAX_SIZE = 2 * 1024 * 1024
    if (receiptFile && receiptFile.size > MAX_SIZE) {
      alert(lang === 'en'
        ? 'File is too large! Please upload an image smaller than 2MB.'
        : 'ไฟล์มีขนาดใหญ่เกินไป! กรุณาแนบรูปภาพที่มีขนาดไม่เกิน 2MB')
      return
    }

    if (!isCritique && selectedDays.length === 0) {
      alert(lang === 'en' ? 'Please select at least one available day.' : 'กรุณาเลือกวันที่สะดวกอย่างน้อย 1 วัน')
      return
    }

    setSubmitting(true)

    const payload = {
      name,
      email,
      service: selectedService,
      goal:          isCritique ? '' : goal,
      availableDate: isCritique ? '' : selectedDays,
      preferredTime: isCritique ? '' : preferredTime,
      secondaryTime: isCritique ? '' : secondaryTime,
      videoLink:     isCritique ? videoLink : '',
      wcaEvent:      isCritique ? '' : wcaEvent,
      receiptData:   cachedReceipt,
      receiptName:   receiptFile ? receiptFile.name.replace(/\.[^/.]+$/, '.jpg') : 'receipt.jpg',
    }

    // Fire-and-forget to Google Apps Script (no-cors)
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).catch(err => console.error('Background send failed:', err))

    // Also save to Supabase
    try {
      const user = await getUser()
      const svc = trans.services.find(s => s.name === selectedService)
      await supabase.from('coaching_bookings').insert({
        user_id:        user?.id ?? null,
        name,
        email,
        service:        selectedService,
        wca_event:      isCritique ? null : wcaEvent || null,
        video_link:     isCritique ? videoLink || null : null,
        available_days: isCritique ? null : selectedDays.length ? selectedDays : null,
        preferred_time: isCritique ? null : preferredTime || null,
        secondary_time: isCritique ? null : secondaryTime || null,
        goal:           isCritique ? null : goal || null,
        amount_thb:     svc?.amount ?? null,
      })
    } catch (err) {
      console.warn('Supabase save failed:', err)
    }

    alert(trans.success)

    // Reset form
    setSelectedService('')
    setVideoLink('')
    setWcaEvent('')
    setSelectedDays([])
    setPreferredTime('')
    setSecondaryTime('')
    setGoal('')
    setPaymentConfirmed(false)
    setReceiptFile(null)
    setCachedReceipt('')
    setCurrentStep(1)
    setSubmitting(false)
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  const inputCls = 'w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl focus:border-blue-500 outline-none text-white placeholder-neutral-500 transition'

  return (
    <div className="bg-black text-white selection:bg-blue-500/30">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">{trans.title}</h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">{trans.subtitle}</p>
        </div>
      </section>

      {/* ── Why Me ── */}
      <section id="why-me" className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Profile card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-full -z-10" />
              <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-3xl overflow-hidden">
                <img
                  src="/image/coach_profile1.jpg"
                  alt="Coach"
                  className="w-full aspect-[4/5] object-cover rounded-2xl mb-8"
                />
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {lang === 'th' ? 'ณัฐภัทร มาทานี' : 'Natthaphat Mahtani'}
                  </h2>
                  <p className="text-blue-500 font-semibold mb-6">
                    {lang === 'th' ? 'นักแข่งที่มีความสามารถรอบด้านมากที่สุดในไทย' : "Thailand's best All-rounder"}
                  </p>
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-widest text-neutral-500 font-bold">
                      {lang === 'th' ? 'ผลงานโดดเด่น' : 'Achievement Highlights'}
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-blue-500">🏆</span>
                        <p className="leading-relaxed">
                          {lang === 'th' ? 'สถิติรูบิก 3x3 เวลาเร็วที่สุดเคยเป็นอันดับ 9 ของโลก' : '3x3 single peak ranking 9th global'}
                        </p>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-300">
                        <span className="text-blue-500">🏅</span>
                        <p className="leading-relaxed">
                          {lang === 'th' ? 'เข้ารอบชิงในงานแข่งระดับทวีป' : 'Finalist in Continental Championship'}
                        </p>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-300">
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

            {/* Benefits */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                {c.whyMeTitle.replace('?', '')} <span className="text-blue-500">?</span>
              </h2>
              <div className="space-y-8">
                {c.whyMeBenefits.map((b, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 text-xl">
                      {['🧩', '🔍', '🏗️', '🎯'][i]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                      <p className="text-neutral-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/30 rounded-2xl inline-block">
                <p className="text-blue-400 font-bold">
                  {lang === 'th' ? 'เปิดสอนแบบคลาสออนไลน์' : 'Online Sessions Available'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{trans.pricingTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trans.services.map((s, index) => {
              const isPopular = index === 1 || index === 3
              const isMastery = index === 4
              return (
                <div
                  key={index}
                  className={`relative bg-neutral-900 border ${
                    isPopular
                      ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                      : isMastery
                      ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                      : 'border-neutral-800'
                  } p-8 rounded-2xl hover:border-blue-500 transition duration-300 flex flex-col justify-between h-full`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  {isMastery && s.saving && (
                    <div className="absolute -top-4 right-4 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                      {s.saving}
                    </div>
                  )}
                  <div className="flex flex-col h-full">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 min-h-[64px]">{s.name}</h3>
                      <ul className="text-neutral-400 text-sm mb-6 space-y-2">
                        {s.desc.map((f, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold mt-[2px]">✔</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto">
                      <div className="mb-6">
                        <div className="text-3xl font-bold text-blue-500">{s.price}</div>
                        {s.saving && (
                          <div className="text-sm text-green-400 font-semibold mt-1">
                            {s.saving} {s.saving_desc}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => scrollToBooking(s.name)}
                        className="w-full py-3 bg-neutral-800 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors shadow-lg active:scale-95"
                      >
                        {trans.bookNow}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Booking form ── */}
      <section id="book" ref={bookSectionRef} className="py-24 px-6 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{trans.bookTitle}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Progress blocks */}
            <ProgressBar mode={progressMode} currentStep={currentStep} />

            {/* ── Step 1: Service selection ── */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <select
                  required
                  value={selectedService}
                  onChange={e => {
                    setSelectedService(e.target.value)
                    // reset downstream fields when service changes
                    setVideoLink(''); setWcaEvent(''); setSelectedDays([])
                    setPreferredTime(''); setSecondaryTime(''); setGoal('')
                    setPaymentConfirmed(false)
                  }}
                  className={inputCls}
                >
                  <option value="" disabled>{trans.formService}</option>
                  {trans.services.map(s => (
                    <option key={s.name} value={s.name}>{s.name} - {s.price}</option>
                  ))}
                </select>

                {/* Video link — only for critique */}
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
                  type="button"
                  onClick={() => goToStep(2)}
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
                {/* WCA Event */}
                <div>
                  <label className="block mb-2 text-neutral-400">🏆 WCA Event</label>
                  <select
                    required
                    value={wcaEvent}
                    onChange={e => setWcaEvent(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">{lang === 'th' ? 'เลือกประเภท' : 'Select event'}</option>
                    {WCA_EVENTS.map(ev => <option key={ev}>{ev}</option>)}
                  </select>
                </div>

                {/* Available days */}
                <div>
                  <label className="block mb-3 text-neutral-400">
                    {lang === 'th' ? '📅 วันที่สะดวก (กรุณาเลือกอย่างน้อย 1 วัน)' : '📅 Available Day (select all that applies)'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {DAYS.map(day => (
                      <label key={day.value} className="cursor-pointer">
                        <input
                          type="checkbox"
                          value={day.value}
                          checked={selectedDays.includes(day.value)}
                          onChange={e => {
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
                </div>

                {/* Time selectors */}
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-neutral-400">
                      {lang === 'th' ? '⏰ เวลาที่สะดวกที่สุด' : '⏰ Most Preferred Starting Time'}
                    </label>
                    <select
                      required
                      value={preferredTime}
                      onChange={e => {
                        const val = e.target.value
                        if (val && val === secondaryTime) {
                          alert('Primary and secondary time cannot be the same')
                          return
                        }
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
                      required
                      value={secondaryTime}
                      onChange={e => {
                        const val = e.target.value
                        if (val && val === preferredTime) {
                          alert('Primary and secondary time cannot be the same')
                          return
                        }
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
                  <button type="button" onClick={() => goToStep(3)} className="w-2/3 bg-blue-600 font-bold py-4 rounded-xl hover:bg-blue-700 transition">Next</button>
                </div>
              </div>
            )}

            {/* ── Step 3: Contact + Payment ── */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    required
                    placeholder={trans.formName}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={inputCls}
                  />
                  <input
                    type="email"
                    required
                    placeholder={trans.formEmail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Goal — live sessions only */}
                {!isCritique && (
                  <div>
                    <label className="block mb-2 text-neutral-400">{trans.formGoal}</label>
                    <textarea
                      rows={3}
                      value={goal}
                      onChange={e => setGoal(e.target.value)}
                      placeholder="e.g., I want to sub-10 or learn full ZBLL"
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                )}

                {/* Payment */}
                <div className="space-y-6">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold mb-6">{trans.paymentInstruction}</h3>
                    <img
                      src={qrSrc}
                      alt="Payment QR"
                      className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-white p-2 rounded-xl object-contain"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">{trans.receiptLabel}</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleReceiptChange}
                      className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl file:bg-blue-600 file:border-0 file:rounded-full file:text-white file:px-4 text-white"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-600/5 border border-blue-500/20 rounded-xl">
                    <input
                      type="checkbox"
                      id="confirm-payment"
                      checked={paymentConfirmed}
                      onChange={e => setPaymentConfirmed(e.target.checked)}
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
        </div>
      </section>

    </div>
  )
}
