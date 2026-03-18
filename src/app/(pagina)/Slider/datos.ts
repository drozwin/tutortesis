// Tipado básico para el contenido
interface SliderItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

// Simulación de respuesta de backend (10 objetos)
const mockBackendData: SliderItem[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Proyecto Galaxia ${i + 1}`,
  description: "Implementación de protocolos cuánticos para transferencia de datos en tiempo real.",
  category: "SISTEMA-CORE",
  image: `https://picsum.photos/seed/${i + 40}/800/600`,
}));