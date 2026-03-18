import type { Metadata } from "next";
import Providers from "@/providers/Providers";
import "./globals.css";
import SoftBackdrop from "./SoftBackdrop";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Tutor Tesis",
  description:
    "Tutor Tesis es un centro tecnologico donde bnrinda servicios en diferentes modalidades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={` antialiased`}>
        <SoftBackdrop />
        <Providers>{children} <Toaster position="top-right" /></Providers>
      </body>
    </html>
  );
}
