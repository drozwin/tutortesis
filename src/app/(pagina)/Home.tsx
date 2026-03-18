import PublicStore from "./cursos/PublicStore";
import Slider from "./Slider/Slider";
import CoursesPage from './cursos_online/EnVivo'
const Home = () => {
  return (
    <>
      <Slider />
      <div className="min-h-screen max-w-7xl justify-center items-center mx-auto">
        <main className="px-4 xl:px-0">
          <CoursesPage/>
          <PublicStore />
        </main>
      </div>
    </>
  );
};

export default Home;
