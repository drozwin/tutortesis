// /app/(user)/layout.tsx
"use client";
import { Navbar } from "../(pagina)/navbar/Navbar";
import { Footer } from "../(pagina)/Footer";
export default function PaginaLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="">
      <Navbar/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
}