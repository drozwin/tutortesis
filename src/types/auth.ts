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

export interface RegisterPayload {
  username: string;
  name: string;
  apellidos: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  expires_in: number;
}