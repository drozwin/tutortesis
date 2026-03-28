// /app/(user)/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Zap, ShieldCheck, Cpu, Activity } from "lucide-react";

export const Home = () => {
  // Obtener la cookie timezone
  const [timeLeft, setTimeLeft] = useState<string>("");

  function getCookie(name: string) {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    if (!cookie) return null;
    return decodeURIComponent(cookie.split("=")[1]);
  }

  useEffect(() => {
    const encodedTime = getCookie("timezone");

    if (!encodedTime) {
      setTimeLeft("No existe cookie");
      return;
    }

    const localTime = atob(encodedTime); // decodificar base64
    const loginDate = new Date(localTime);

    // ejemplo: sesión dura 7200 segundos (2 horas)
    const expiresInSeconds = 7200;

    const expireDate = new Date(loginDate.getTime() + expiresInSeconds * 1000);

    function updateTimer() {
      const now = new Date();
      const diff = expireDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Sesión expirada");
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`Faltan ${minutes} minutos y ${seconds} segundos`);
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 flex-1 w-full rounded-2xl animate-in fade-in duration-700">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Estado Operativo
        </h1>
        <p className="text-gray-500 text-sm italic font-mono">{timeLeft}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Visitas a la web"
          value="24"
          delta="TOTAL"
          color="text-cyan-400"
        />
        <StatCard
          title="Usuarios registrados"
          value="180"
          delta="TOTAL"
          color="text-purple-400"
        />
        <StatCard
          title="cursos adquiridos"
          value="50"
          delta="TOTAL"
          color="text-orange-500"
        />
        <StatCard
          title="ingresos"
          value="bs 500"
          delta="TOTAL"
          color="text-green-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2  rounded-2xl p-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
            Logs de Actividad
          </h3>
          <div className="space-y-4">
            <ActivityRow
              label="Descarga: Photoshop_Master_Pack.zip"
              time="Hace 2 min"
              status="Completo"
            />
            <ActivityRow
              label="Acceso al sistema detectado"
              time="Hace 1 hora"
              status="Seguro"
            />
            <ActivityRow
              label="Nueva compra: 808_Sub_Pack"
              time="Ayer"
              status="Completo"
            />
          </div>
        </div>

        <div className="bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <Cpu className="text-cyan-500 mb-4" size={32} />
            <h4 className="font-bold text-lg">Próxima Actualización</h4>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Nuevas plantillas de Illustrator llegarán el 15 de marzo.
            </p>
          </div>
          <button className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-xs font-bold transition-all uppercase tracking-widest mt-6">
            Ver Roadmap
          </button>
        </div>
        <div className="bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <Cpu className="text-cyan-500 mb-4" size={32} />
            <h4 className="font-bold text-lg">Próxima Actualización</h4>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Nuevas plantillas de Illustrator llegarán el 15 de marzo.
            </p>
          </div>
          <button className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-xs font-bold transition-all uppercase tracking-widest mt-6">
            Ver Roadmap
          </button>
        </div>
        <div className="bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <Cpu className="text-cyan-500 mb-4" size={32} />
            <h4 className="font-bold text-lg">Próxima Actualización</h4>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Nuevas plantillas de Illustrator llegarán el 15 de marzo.
            </p>
          </div>
          <button className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-xs font-bold transition-all uppercase tracking-widest mt-6">
            Ver Roadmap
          </button>
        </div>
        <div className="bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <Cpu className="text-cyan-500 mb-4" size={32} />
            <h4 className="font-bold text-lg">Próxima Actualización</h4>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Nuevas plantillas de Illustrator llegarán el 15 de marzo.
            </p>
          </div>
          <button className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-xs font-bold transition-all uppercase tracking-widest mt-6">
            Ver Roadmap
          </button>
        </div>
        <div className="bg-linear-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <Cpu className="text-cyan-500 mb-4" size={32} />
            <h4 className="font-bold text-lg">Próxima Actualización</h4>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Nuevas plantillas de Illustrator llegarán el 15 de marzo.
            </p>
          </div>
          <button className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-xs font-bold transition-all uppercase tracking-widest mt-6">
            Ver Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

function StatCard({ title, value, delta, color }: any) {
  return (
    <div className="p-6 bg-black/10  rounded-2xl hover:border-cyan-500/30 transition-all">
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">
        {title}
      </p>
      <div className="flex items-baseline justify-between">
        <h4 className={`text-3xl font-bold ${color}`}>{value}</h4>
        <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">
          {delta}
        </span>
      </div>
    </div>
  );
}

function ActivityRow({ label, time, status }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[10px] text-gray-500">{time}</p>
      </div>
      <span className="text-[10px] text-cyan-500 font-mono tracking-tighter uppercase">
        {status}
      </span>
    </div>
  );
}
