'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getOneAwPlaylist } from 'src/firebase/playlist';
import { AWPlaylistData } from 'src/types/playlistTypes';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import PlaylistDetail from 'src/components/common/PlaylistDetail';

function AwPlaylistDetail() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<AWPlaylistData>({ uuid: '', playlistImageUri: '', playlistTitle: '', description: '', musicList: [] });
  const { awPlaylistId } = useParams();

  useEffect(() => {
    getOneAwPlaylist(awPlaylistId as string).then((data) => {
      setData(data);
      setLoaded(true);
    }).catch(() => {
      setLoaded(false);
    });
  }, []);

  return (
    <>
      <GoBackHead />
      <PlaylistDetail loaded={loaded} data={data} />
    </>
  );
}

export default AwPlaylistDetail;
