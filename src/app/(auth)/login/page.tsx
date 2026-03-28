"use client";

import AuthForm from "@/app/(auth)/components/AuthForm";
import { ModeToggle } from "@/components/themeButton";
export default function LoginPage() {
  return (
    <div>
      <div className="absolute top-4 right-2">
        <ModeToggle />
      </div>

      <AuthForm />
    </div>
  );
}
