export interface Testimonial {
  name: string
  service: string
  rating: number
  quoteEn: string
  quoteTh?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Krittamuk R.',
    service: 'Live 1-on-1 Session (1 Hour)',
    rating: 5,
    quoteEn: 'After finishing class, I feel like I gained so many insights to help me keep improving. The teaching style was super easy to follow and every little detail was explained so clearly. Once I save up enough money I’ll buy this class again',
    quoteTh: 'หลังจากเรียนจบคลาสวันนี้ ผมรู้สึกว่าได้ความเข้าใจใหม่มากมายที่ช่วยให้ผมพัฒนาตัวเองต่อไปได้อย่างต่อเนื่อง สไตล์การสอนเข้าใจง่ายมาก และอธิบายรายละเอียดเล็ก ๆ ทุกอย่างชัดเจนมาก ผมจะเก็บเงินให้พอแล้วค่อยซื้อคลาสนี้อีกแน่นอน',
  },
  {
    name: 'Pornpat W.',
    service: 'Mastery Pack Live 1-on-1 (4 Sessions)',
    rating: 5,
    quoteEn: 'I purchased the Mastery Pack, and it was worth every penny. I’ve been stuck averaging 8 to 9 seconds on 3x3 for over two years with no idea how or what to improve. Having a coach helped me identify all of my weaknesses, and I really appreciated the custom training plan provided with each session. I would definitely buy this again!',
    quoteTh: 'ผมซื้อ แพ็กเกจเชี่ยวชาญมาแล้วและบอกได้เลยว่าคุ้มค่ามากเลยครับ ผมติดอยู่ที่เวลาเฉลี่ย 8–9 วินาทีบน 3x3 มาสองปีแล้ว แต่ไม่รู้ว่าควรปรับปรุงตรงไหนและแก้ไขอย่างไร การมีโค้ชช่วยให้ผมระบุจุดอ่อนทุกอย่างได้ชัดเจน และผมชอบมากที่ได้รับแผนฝึกซ้อมที่ปรับให้เหมาะกับตนเองในแต่ละครั้งที่เจอกัน ผมจะซื้ออีกแน่นอนครับ',
  },
  {
    name: 'Achira S.',
    service: 'Mastery Pack (4 Sessions) & Live 1-on-1 Session (1 Hour)',
    rating: 5,
    quoteEn: 'Before training, my average solve time was around 20 seconds. After learning with Coach Jashan, I improved to 15–17 seconds! The coaching is easy to understand and helped me improve my F2L, look-ahead, and problem-solving approach in a much more structured way. Thank you for helping me level up my solving skills.',
    quoteTh: 'ก่อนเรียนผมทำเวลาได้ประมาณ 20 วินาที แต่หลังจากเรียนกับพี่จาชั่น ตอนนี้ลดลงเหลือ 15–17 วินาทีแล้วครับ! การสอนเข้าใจง่าย และช่วยให้ผมพัฒนาทักษะ F2L, look-ahead และการคิดแก้แบบมีหลักการมากขึ้นครับ ขอบคุณพี่จาชั่นที่ช่วยอัปสกิลให้ผมครับ',
  },
  {
    name: 'Wasikrit R.',
    service: 'Mastery Pack Live 1-on-1 (4 Sessions)',
    rating: 5,
    quoteEn: 'From what I’ve learned from Sarah’s Advanced algorithms, it has been both fun and very useful. The teaching is easy to understand and very detailed, which has helped me memorize and perform the algorithms much better.',
    quoteTh: 'จากที่ผมได้เรียนรู้อัลกอริทึมของ Sarah’s Advanced รู้สึกว่าสนุกและมีประโยชน์มาก สอนเข้าใจง่ายและละเอียด ทำให้ผมสามารถจำและทำอัลกอริทึมได้ดีขึ้นครับ',
  },
  {
    name: 'Chawanwit C.',
    service: 'Video Critique (Video Analysis)',
    rating: 5,
    quoteEn: 'Provides clear, detailed explanations that are easy to understand, and pinpoints strengths and weaknesses so thoroughly I discovered things about my own performance I hadn\'t noticed.',
    quoteTh: 'อธิบายละเอียดและเข้าใจง่ายมากครับ บอกจุดอ่อนและจุดแข็งอย่างชัดเจนละเอียดถึงขั้นที่ตัวเองยังไม่รู้เลยครับ',
  },
]

export default testimonials