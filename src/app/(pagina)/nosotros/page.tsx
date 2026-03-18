import Link from 'next/link';
function Nosotros() {
    return (
        <section className="min-h-screen  py-24 px-6 md:px-20 font-sans">
            {/* Título Principal Estilo Tesla */}
            <div className="my-20 flex flex-col items-center justify-center">
                <h2 className="text-blue-600 tracking-[0.5em] uppercase text-xs font-bold mb-2">
                    Sobre la Compañía
                </h2>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                    Génesis <span className="text-gray-500">Operativa</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                {/* Columna Izquierda: Filosofía */}
                <div className="space-y-12">
                    <div className="group">
                        <h3 className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-blue-500"></span> Propósito
                        </h3>
                        <p className="text-2xl md:text-3xl font-light leading-snug text-gray-200 group-hover:text-white transition-colors">
                            Sintetizar la herencia cultural con la vanguardia tecnológica, devolviendo la <span className="text-blue-500">identidad y potencia</span> al usuario contemporáneo.
                        </p>
                    </div>

                    <div className="group">
                        <h3 className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-blue-500"></span> Proyección
                        </h3>
                        <p className="text-xl text-gray-400 font-light leading-relaxed">
                            Consolidarnos como el laboratorio de referencia en hardware de autor y servicios digitales, donde la <span className="text-white">precisión técnica</span> y el <span className="text-white">arte lítico</span> definan el nuevo estándar de la industria.
                        </p>
                    </div>
                </div>

                {/* Columna Derecha: Conectividad / Nodo Técnico */}
                <div className="bg-white/5 border border-white/10 p-10 rounded-sm relative overflow-hidden">
                    {/* Efecto de luz MSI en la esquina */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-[50px] rounded-full"></div>

                    <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter">Nodos de Conexión</h3>

                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-500 mb-1 font-bold">Línea Directa</span>
                            <a href="tel:+591XXXXXXXX" className="text-xl font-mono hover:text-blue-400 transition-colors">
                                +591 70506060
                            </a>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-500 mb-1 font-bold">Sede Central / Lab</span>
                            <p className="text-lg text-gray-300">
                                El Alto, <br />
                                La Paz, Bolivia.
                            </p>
                        </div>
                        <div className="pt-6">
                            <Link href={'/contactos'} className="">
                                <button className=" cursor-pointer w-full py-4 bg-blue-700 hover:bg-white hover:text-black transition-all duration-500 uppercase text-xs font-bold tracking-[0.3em]">
                                    Iniciar Protocolo de Contacto
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Coordenadas ficticias para efecto visual */}
                    <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 uppercase tracking-widest">
                        LOC: 16.4897° S, 68.1193° W
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Nosotros;