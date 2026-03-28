import { useEffect, useState } from "react";
import { getMyCourses, MyCourse } from "@/services/courseService";

export function useMyCourses() {
  const [data, setData] = useState<MyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyCourses()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}