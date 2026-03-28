import PublicStore from "./(pagina)/cursos/PublicStore";
import Slider from "./(pagina)/Slider/Slider";
import CoursesPage from "./(pagina)/cursos_online/EnVivo";
import { Catering } from "./(pagina)/serciciosCatering/Catering";
import { SliderComentarios } from "./(pagina)/comentarios/Comentario";
const Home = () => {
  return (
    <>
      <Slider />
      <div className="min-h-screen max-w-7xl justify-center items-center mx-auto">
        <main className="px-4 xl:px-0">
          <CoursesPage />
          <PublicStore />
          <Catering />
          <SliderComentarios />
        </main>
      </div>
    </>
  );
};

export default Home;
