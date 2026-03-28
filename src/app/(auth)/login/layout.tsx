"use client"

import { useAuth } from "@/context/AuthContext"

export default function LoginPage({ children }: { children: React.ReactNode }) {


  const {loading, user,error} = useAuth()

  if (loading || user) {
    return null
  }
//no pasa de aqui si sumple esa sentencia
/* Entonces children solo aparece cuando:

loading = false
user = null */

  return (
    <div>
      {children}
    </div>
  )
}