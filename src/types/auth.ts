export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    email: string
  }
  expires_in: number
}

export interface LogoutResponse {
  message: string
  deleted: number
}
