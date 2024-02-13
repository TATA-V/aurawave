'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getOneAwPlaylist } from 'src/firebase/playlist';
import { AWPlaylistData } from 'src/types/playlistTypes';
import { End } from 'src/styled/frequentlyStyled';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import useInfiniteScroll from 'src/hook/useInfiniteScroll';
import { MusicData } from 'src/types/musicTypes';
import LoadingLottie from 'src/components/Lottie/LoadingLottie';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import PlaylistDetailInfo from 'src/components/common/PlaylistDetailInfo';
import PlayAndShuffleBtn from 'src/components/AwPlaylist/PlayAndShuffleBtn';
import SkelMusicLi8 from 'src/components/Skeleton/SkelMusicLi8';
import MusicLi from 'src/components/MusicLi/MusicLi';

function AwPlaylistDetail() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<AWPlaylistData>({ uuid: '', playlistImageUri: '', playlistTitle: '', description: '', musicList: [] });
  const [playlist, setplaylist] = useState<MusicData[]>([]);
  const [sliceNum, setSliceNum] = useState(8);
  const { awPlaylistId } = useParams();

  const endRef = useRef(null);
  const { loading } = useInfiniteScroll({
    allData: data.musicList,
    data: playlist,
    setData: setplaylist,
    sliceNum,
    setSliceNum,
    endRef,
  }); // hook

  useEffect(() => {
    getOneAwPlaylist(awPlaylistId as string).then((data) => {
      setData(data);
      setLoaded(true);
      setplaylist(data.musicList.slice(0, 8));
    }).catch(() => {
      setLoaded(false);
    });
  }, []);

  return (
    <>
      <GoBackHead />
      <div className="px-[20px] pt-[74px] pb-[70px]">
        <PlaylistDetailInfo data={data} />
        <PlayAndShuffleBtn data={data} />

        {!loaded && <FadeInMotion><SkelMusicLi8 /></FadeInMotion>}
        <ul>
          {data && data.musicList.map((el) => (
            <FadeInMotion key={el.uuid}>
              <MusicLi el={el} />
            </FadeInMotion>
          ))}
        </ul>
        {loading && <LoadingLottie />}
        <End ref={endRef} />
      </div>
    </>
  );
}

export default AwPlaylistDetail;
