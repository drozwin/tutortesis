// services/userService.ts
import { apiClient } from "@/lib/fetch";
import { CreateUserPayload, CreateUserResponse } from "@/types/user";

export const userService = {
  async createUser(payload: CreateUserPayload) {
    return apiClient<CreateUserResponse>("/admin/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};