import { apiClient } from "@/lib/fetch";

export const chatService = {
  getUsers: () => apiClient<any[]>("/users"),

  sendMessage: (data: {
    receiver_id: number;
    content: string;
  }) =>
    apiClient("/messages", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};