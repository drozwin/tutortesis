import { useState } from "react";
import { registerUser } from "@/services/authService";
import { RegisterPayload } from "@/types/auth";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(data);

      return response;
    } catch (err: any) {
      setError(err.message || "Error al registrar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
  };
};