
"use client"
import Home from "./Home"
import { Navbar } from "./(pagina)/navbar/Navbar";
import { Footer } from "./(pagina)/Footer";
import {Whatsapp} from '@/components/Whatsapp'
export default function PageMain() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Home/>
      </main>
      <Whatsapp/>
      <Footer />
    </div>
  );
}