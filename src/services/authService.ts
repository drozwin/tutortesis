import { apiClient } from "@/lib/fetch";
import { LoginRequest, LoginResponse, LogoutResponse } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";

export function login(data: LoginRequest) {
  return apiClient<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout() {
  
  return apiClient<{ message: string; deleted: number }>("/logout", {
    method: "POST",
  });
}

export function getUsers() {
  return apiClient<any[]>("/users", {
    method: "GET",
  });
}