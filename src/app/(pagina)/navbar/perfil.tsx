export const Perfil = () => {
    return (
        <div>
            <div className="items-center rounded-2xl bg-white/50 shadow-lg dark:bg-zinc-950/50 backdrop-blur-lg absolute right-8 left-8 top-[500px] z-20  h-96">
                <div className='flex justify-center'>

                    <div className='max-w-7xl w-full'>
                        {/* Avatar redondo */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                            {/* Contenedor relativo con overflow-hidden */}
                            <div className='absolute bg-black rounded-full w-34 h-34'></div>
                            <div className="relative w-34 h-34 rounded-full overflow-hidden">
                                {/* Luz neón girando */}

                                <div className="luzneon absolute z-10 -top-8 left-1/2 -translate-x-1/2">
                                </div>

                                {/* Avatar redondo */}
                                <div className='w-34 h-34 absolute rounded-full z-20 flex items-center justify-center'>
                                    <div className='w-32 h-32 rounded-full flex items-center justify-center overflow-hidden'>
                                        <img
                                            width={500}
                                            height={500}
                                            src="/assets/img/logo.jpg"
                                            alt=""
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Contenido del perfil */}
                        <div className="mt-20 flex flex-col text-center">
                            <div className='text-center'>
                                <h1 className="text-3xl font-bold mt-4">Nombre de mi empresa</h1>
                                {/* Descripción */}
                                <div className='flex justify-center'>
                                    <p className="text-center flex justify-center max-w-3xl mt-6 text-gray-600 p-3">
                                        An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based
                                        Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel
                                        with a solid groove structure.
                                    </p>
                                </div>
                            </div>


                            {/* Botones de acción */}
                            <div className="flex justify-center space-x-8 mt-8 mb-8">
                                <button className="flex flex-col items-center justify-center p-4 bg-purple-600 text-white rounded-md w-24 h-24">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-aperture"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" x2="20.05" y1="8" y2="17.94"></line><line x1="9.69" x2="21.17" y1="8" y2="8"></line><line x1="7.38" x2="13.12" y1="12" y2="2.06"></line><line x1="9.69" x2="3.95" y1="16" y2="6.06"></line><line x1="14.31" x2="2.83" y1="16" y2="16"></line><line x1="16.62" x2="10.88" y1="12" y2="21.94"></line></svg>
                                    <span className="mt-2 uppercase text-xs font-medium">STUDIO</span>
                                </button>

                                <button className="flex flex-col items-center justify-center p-4 bg-gray-200 text-gray-700 rounded-md w-24 h-24">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>
                                    <span className="mt-2 uppercase text-xs font-medium">WORK</span>
                                </button>

                                <button className="flex flex-col items-center justify-center p-4 bg-gray-200 text-gray-700 rounded-md w-24 h-24">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                                    <span className="mt-2 uppercase text-xs font-medium">FAVORITE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
