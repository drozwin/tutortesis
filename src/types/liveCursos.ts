export type Course = {
  id: number
  title: string
  description: string
  image: string
  category: string
  level: string | null
  plataforma: string | null
  start_date: string
  duration: number | null
  has_certificate: boolean
  is_free: boolean
  price: number
  discount_percent: number
  students_count: number
  is_enrolled: boolean
  max_students: number
  has_coupon: boolean
}

export interface OrderResponse {
  id: number;
  total_amount: number;
  status: string;
}