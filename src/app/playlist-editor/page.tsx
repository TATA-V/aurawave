import dynamic from 'next/dynamic';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function CreatePlaylistPage() {
  const PlaylistEditor = dynamic(() => import('src/components/PlaylistEditor/PlaylistEditor'), {
    loading: () => <div className="w-full h-[194px]" />,
    ssr: false,
  });

  return (
    <FadeInMotion>
      <PlaylistEditor />
    </FadeInMotion>
  );
}

export default CreatePlaylistPage;
