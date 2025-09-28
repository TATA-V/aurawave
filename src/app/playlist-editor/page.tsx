'use client';

import dynamic from 'next/dynamic';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

const PlaylistEditor = dynamic(() => import('src/components/PlaylistEditor/PlaylistEditor'), {
  loading: () => <div className="w-full h-[194px]" />,
  ssr: false,
});

function CreatePlaylistPage() {
  return (
    <FadeInMotion>
      <PlaylistEditor />
    </FadeInMotion>
  );
}

export default CreatePlaylistPage;
