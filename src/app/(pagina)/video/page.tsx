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

  // const m3u8Url = 'https://8ca5e6ed9ee9482066fb6a4c5f6d2a47.r2.cloudflarestorage.com/private/courses/eiusmod-elit-omnis-69c72cc3b73ba/master.m3u8?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=1cc4818324d5f5a1d06bade262bdd83b%2F20260328%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260328T013141Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Signature=8517dd874861f0cfa927ef83d4fc4f17d40e15a1f8683e5741a75a2a462bc280'

  return (
    <div>
      <h1>Next.js Video.js HLS Player</h1>
      <HlsVideoPlayer src="http://localhost:8000/api/video/courses/mi-video/master.m3u8" />
    </div>
  );
};

export default HomePage;
