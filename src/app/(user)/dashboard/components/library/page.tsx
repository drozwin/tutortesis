// /app/(user)/library/page.tsx
import { FileDown, ImageIcon, Music, Layout } from "lucide-react";

export default function UserLibrary() {
  const assets = [
    { title: "Abstract Vectors AI", type: "Illustrator", size: "124 MB", icon: <Layout size={20}/> },
    { title: "Dark Synth Presets", type: "Audio", size: "45 MB", icon: <Music size={20}/> },
    { title: "Portfolio Template Ps", type: "Photoshop", size: "210 MB", icon: <ImageIcon size={20}/> },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-2xl font-bold">Mi Librería de Activos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset, i) => (
          <div key={i} className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-all relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
             
             <div className="text-cyan-500 mb-4">{asset.icon}</div>
             <h3 className="font-bold text-lg mb-1">{asset.title}</h3>
             <p className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-6">{asset.type} • {asset.size}</p>
             
             <button className="flex items-center gap-2 text-xs font-bold text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-black transition-all">
               <FileDown size={16} /> Descargar Archivo
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}