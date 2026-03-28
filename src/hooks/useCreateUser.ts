import { useState } from "react";
import { userService } from "@/services/userService";

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function clearState() {
    setError(null);
    setSuccess(null);
  }

  async function createUser(data: any) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await userService.createUser(data);

      setSuccess(res.message || "Usuario creado correctamente");
      return res;
    } catch (err: any) {
      let message = err.message;

      if (err.data?.errors) {
        message = Object.values(err.data.errors).flat().join(" | ");
      }

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    createUser,
    loading,
    error,
    success,
    clearState,
  };
}