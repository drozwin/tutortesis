
"use client"
import Home from "./(pagina)/Home"
import { Navbar } from "./(pagina)/navbar/Navbar";
import { Footer } from "./(pagina)/Footer";
export default function PageMain() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Home/>
      </main>
      <Footer />
    </div>
  );
}