'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { getOneMusicPlaylistInfo } from 'src/firebase/playlist';
import PlaylistDetail from 'src/components/common/PlaylistDetail';
import MyPlaylistHead from 'src/components/MyPlaylist/MyPlaylistHead';

function MyPlaylistDetail() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<DocumentData>();
  const { myPlaylistId } = useParams();

  useEffect(() => {
    getOneMusicPlaylistInfo(String(myPlaylistId))
      .then((data) => {
        setData(data);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(false);
      });
  }, []);

  return (
    <>
      <MyPlaylistHead />
      {data && <PlaylistDetail loaded={loaded} data={data} />}
    </>
  );
}

export default MyPlaylistDetail;
