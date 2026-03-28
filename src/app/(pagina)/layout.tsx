// /app/(user)/layout.tsx
"use client";
import { Navbar } from "../(pagina)/navbar/Navbar";
import { Footer } from "../(pagina)/Footer";
import {Whatsapp} from '@/components/Whatsapp'
export default function PaginaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between flex-col min-h-screen ">
      <Navbar />
      <div className="relative bottom-0 justify-center items-center w-full flex-1 pt-22 px-4 md:px-6 custom-scrollbar ">
        <main className="dark:bg-zinc-900/50 mx-auto p-10 bg-zinc-200/50 shadow-black/75 shadow-lg  max-w-7xl h-auto rounded-2xl">
          {children}
        </main>
      </div>
      <Whatsapp/>
      <Footer />
    </div>
  );
}
