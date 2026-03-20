// app/page.tsx or similar file
import HlsVideoPlayer from './reproductor'

const HomePage: React.FC = () => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    // Add other Video.js options here
  };

  const m3u8Url = 'https://pub-3e305f428cc44fd7ab4903f3ad22cec6.r2.dev/courses/curso-pro-de-nextjs-8-69bba31b4610c/master.m3u8'; // Replace with your actual M3U8 URL

  return (
    <div>
      <h1>Next.js Video.js HLS Player</h1>
      <HlsVideoPlayer src={m3u8Url} />
    </div>
  );
};

export default HomePage;
