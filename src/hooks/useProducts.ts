import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/services/productsService"
import { useEffect, useState } from "react"

export function useProducts(page: number) {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    staleTime: 1000 * 60 * 30,
    enabled: mounted, // evita ejecución en SSR
  })
}