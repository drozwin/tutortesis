import { useEffect, useState } from "react";
import { getPayments, Payment, approvePayment, getPaymentsId } from "@/services/adminPayments";
import { useQuery } from "@tanstack/react-query";

export function useAdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getPayments();
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    refresh: fetchPayments,

    approve: async (id: number) => {
      await approvePayment(id);
      fetchPayments();
    },
  };
}

export function usePaymentShow(id: number) {
    return useQuery({
      queryKey: ["payment", id],
      queryFn: () => getPaymentsId(id),
      enabled: !!id, 
    });
  }
