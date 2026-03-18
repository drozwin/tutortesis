// /app/(dashboard)/dashboard/purchases/page.tsx
import { DownloadCloud, FileText } from "lucide-react";

export default function UserPurchases() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Mis Adquisiciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-cyan-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-cyan-500 border border-white/5">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Pack de Vectores AI - Vol.{i}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Illustrator • 450MB</p>
              </div>
            </div>
            <button className="p-3 bg-white/5 rounded-full text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all">
              <DownloadCloud size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}