export interface Category {
  id: number
  name: string
  slug: string
}

export interface ProductResponse {
  id: number
  title: string
  description: string
  slug: string
  thumbnail: string

  price: number
  discount_price: number | null
  discount_percentage: number
  has_discount: boolean

  likes: number
  downloads: number
  views: number
  rating: number

  category: Category
}

export interface PaginatedProducts {
  current_page: number
  data: ProductResponse[]
  last_page: number
  per_page: number
  total: number
}