'use client';

import { useEffect, useState } from 'react';
import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import { getAllAwPlaylistDocs } from 'src/firebase/playlist';
import { AWPlaylistData } from 'src/types/playlistTypes';
import AwPlaylistItem from 'src/components/common/AwPlaylistItem';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import SkelAwPlaylistItem from 'src/components/Skeleton/SkelAwPlaylistItem';
import Link from 'next/link';

function AwPlaylist() {
  const [loaded, setLoaded] = useState(false);
  const [playlists, setPlaylists] = useState<AWPlaylistData[]>();

  useEffect(() => {
    getAllAwPlaylistDocs()
      .then((data) => {
        setPlaylists(data);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(false);
      });
  }, []);

  return (
    <>
      <GoBackHead title="플레이리스트" />
      <div className="px-[20px] pt-[74px] pb-[50px]">
        <FadeInMotion>
          <ul className="grid grid-cols-2 gap-x-[12px] gap-y-[30px]">
            {playlists?.map((el) => (
              <Link href={`/aw-playlist/${el.uuid}`} key={el.uuid}>
                <AwPlaylistItem el={el} />
              </Link>
            ))}
          </ul>
        </FadeInMotion>
        <FadeInMotion>
          <div className="grid grid-cols-2 gap-x-[12px] gap-y-[30px]">
            {!loaded && [...Array(3)].map((_, idx) => <SkelAwPlaylistItem key={idx} />) }
          </div>
        </FadeInMotion>
      </div>
    </>
  );
}

export default AwPlaylist;
