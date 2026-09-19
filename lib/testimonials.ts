export interface Testimonial {
  name: string
  service: string
  rating: number
  quoteEn: string
  quoteTh?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Pornpat W.',
    service: 'Mastery Pack Live 1-on-1 (4 Sessions)',
    rating: 5,
    quoteEn: 'I purchased the Mastery Pack, and it was worth every penny. I’ve been stuck averaging 8 to 9 seconds on 3x3 for over two years with no idea how or what to improve. Having a coach helped me identify all of my weaknesses, and I really appreciated the custom training plan provided with each session. I would definitely buy this again!',
    quoteTh: 'ผมซื้อ แพ็กเกจเชี่ยวชาญมาแล้วและบอกได้เลยว่าคุ้มค่ามากเลยครับ ผมติดอยู่ที่เวลาเฉลี่ย 8–9 วินาทีบน 3x3 มาสองปีแล้ว แต่ไม่รู้ว่าควรปรับปรุงตรงไหนและแก้ไขอย่างไร การมีโค้ชช่วยให้ผมระบุจุดอ่อนทุกอย่างได้ชัดเจน และผมชอบมากที่ได้รับแผนฝึกซ้อมที่ปรับให้เหมาะกับตนเองในแต่ละครั้งที่เจอกัน ผมจะซื้ออีกแน่นอนครับ',
  },
  {
    name: 'Achira S.',
    service: 'Live 1-on-1 Session (1 Hour)',
    rating: 5,
    quoteEn: 'After taking this class, I gained a much clearer understanding of my weaknesses and picked up new techniques to practice and improve. I’m confident this will help me progress, and I will definitely come  back for another session.',
    quoteTh: 'จากการเรียนคลาสนี้ ทำให้เข้าใจจุดบกพร่องของตัวเอง และได้เทคนิคใหม่มาฝึกซ้อมผมจะมาเรียนต่ออีกแน่นอนครับ',
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