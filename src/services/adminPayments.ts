import { apiClient } from "@/lib/fetch";

export const approvePayment = (paymentId: number) => {
  return apiClient(`/admin/payments/${paymentId}/approve`, {
    method: "PATCH",
  });
};

export interface Payment {
  id: number;
  amount: number;
  status: "pending" | "completed";
  order: {
    user: {
      name: string;
      email: string;
    };
    items: {
      live_course_id: number;
      image: string;
    }[];
  };
}
// ✅ listar pagos
export const getPayments = () => {
  return apiClient<{ data: Payment[] }>("/admin/payments");
};

export const getPaymentsId = (id: number) => {
  return apiClient<Payment>(`/admin/payments/${id}`);
};
