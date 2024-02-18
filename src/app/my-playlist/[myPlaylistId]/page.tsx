import React from 'react';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import MyPlaylistDetail from 'src/components/MyPlaylist/MyPlaylistDetail';

function MyPlaylistDetailPage() {
  return (
    <FadeInMotion>
      <MyPlaylistDetail />
    </FadeInMotion>
  );
}

export default MyPlaylistDetailPage;
