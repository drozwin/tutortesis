import { apiClient } from "@/lib/fetch";

export const verifyCode = async (code: string) => {
  return apiClient("/verify", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
};

export const resendCode = async () => {
  return apiClient("/resendcode", {
    method: "POST",
  });
};