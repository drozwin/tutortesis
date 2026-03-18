// /app/(dashboard)/dashboard/profile/page.tsx
import { User, Shield, Key, Bell } from 'lucide-react';

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <User className="text-indigo-600" /> Información Personal
        </h2>
        <div className=" border border-slate-900 rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nombre Completo</label>
              <input type="text" className="w-full  border border-slate-900 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input type="email" className="w-full   border border-slate-900 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" defaultValue="john@example.com" />
            </div>
          </div>
          <button className="mt-8  border border-slate-900  px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
            Guardar Cambios
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Shield className="text-indigo-600" /> Seguridad
        </h2>
        <div className=" border border-slate-900 rounded-2xl divide-y divide-slate-900 shadow-sm">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2  border border-slate-900 text-amber-600 rounded-lg"><Key size={20} /></div>
              <div>
                <p className="font-bold text-slate-900">Contraseña</p>
                <p className="text-sm text-slate-500">Último cambio hace 3 meses</p>
              </div>
            </div>
            <button className="text-sm font-bold text-indigo-600 hover:underline">Actualizar</button>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2  border border-slate-900 text-blue-600 rounded-lg"><Bell size={20} /></div>
              <div>
                <p className="font-bold text-slate-900">Notificaciones</p>
                <p className="text-sm text-slate-500">Alertas de nuevas actualizaciones de productos</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
               <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}