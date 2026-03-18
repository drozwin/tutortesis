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
  price: number | null
  discount_percent: number | null
  students_count: number
  is_enrolled: boolean
}

export interface OrderResponse {
  id: number;
  total_amount: number;
  status: string;
}