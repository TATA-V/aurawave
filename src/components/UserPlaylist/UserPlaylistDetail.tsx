'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import { getOneMusicPlaylistInfo } from 'src/firebase/playlist';
import { DocumentData } from 'firebase/firestore';
import PlaylistDetail from '../common/PlaylistDetail';

function UserPlaylistDetail() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<DocumentData>();
  const { userPlaylistId } = useParams();

  useEffect(() => {
    getOneMusicPlaylistInfo(String(userPlaylistId))
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
      <GoBackHead />
      {data && <PlaylistDetail loaded={loaded} data={data} />}
    </>
  );
}

export default UserPlaylistDetail;
