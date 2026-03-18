const services = [
    { title: "Diseño Gráfico", desc: "Identidad visual con alma y precisión técnica.", icon: "🎨" },
    { title: "Servicio Técnico", desc: "Optimización de alto nivel para estaciones de trabajo.", icon: "🛠️" },
    { title: "Hardware Store", desc: "Componentes premium para entusiastas del gaming.", icon: "🖥️" },
];

export function Services() {
    return (
        <section className="py-24 grid grid-cols-1 md:grid-cols-3 gap-1 px-1 md:px-10">
            {services.map((s, i) => (
                <div key={i} className="group bg-gray-900 relative p-12  border border-white/5 hover:border-orange-900/50 transition-all duration-500">
                    <div className="text-4xl mb-6">{s.icon}</div>
                    <h3 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">{s.title}</h3>
                    <p className="text-gray-500 group-hover:text-gray-300 transition-colors">{s.desc}</p>
                    {/* Acento geométrico tipo Tiwanaku en la esquina */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-900 opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>
            ))}
        </section>
    );
}