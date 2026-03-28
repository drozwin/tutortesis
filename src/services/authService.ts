import { apiClient } from "@/lib/fetch";
import { LoginRequest, LoginResponse, LogoutResponse, RegisterPayload, RegisterResponse } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";

export function login(data: LoginRequest) {
  return apiClient<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export const registerUser = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  return await apiClient<RegisterResponse>("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export async function logout() {
  
  return apiClient<{ message: string; deleted: number }>("/logout", {
    method: "POST",
  });
}

export async function resendCode() {
  
  return apiClient("/resendcode", {
    method: "POST",
  });
}

export async function verifyCode(code: string) {
  
  return apiClient("/verify", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}


export function getUsers() {
  return apiClient<any[]>("/users", {
    method: "GET",
  });
}