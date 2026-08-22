export interface Testimonial {
  name: string
  service: string
  rating: number
  quoteEn: string
  quoteTh?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Chawanwit C.',
    service: 'Video Critique (Video Analysis)',
    rating: 5,
    quoteEn: 'Provides clear, detailed explanations that are easy to understand, and pinpoints strengths and weaknesses so thoroughly I discovered things about my own performance I hadn\'t noticed.',
    quoteTh: 'อธิบายละเอียดและเข้าใจง่ายมากครับ บอกจุดอ่อนและจุดแข็งอย่างชัดเจนละเอียดถึงขั้นที่ตัวเองยังไม่รู้เลยครับ',
  },
]

export default testimonials