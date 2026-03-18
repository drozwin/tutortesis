export interface CartProduct {
  id: number;
  title: string;
  thumbnail: string;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  price: string;
  product: CartProduct;
}

export interface CartResponse {
  message: string;
  cart: CartItem[];
}