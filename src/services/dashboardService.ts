import { apiClient } from "@/lib/fetch"
import { DashboardResponse } from "@/types/dashboard"

export function getDashboard() {
  return apiClient<DashboardResponse>("/dashboard", {
    method: "GET",
  })
}