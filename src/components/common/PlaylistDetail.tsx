'use client';

import { useEffect, useRef, useState } from 'react';
import { End } from 'src/styled/frequentlyStyled';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import useInfiniteScroll from 'src/hook/useInfiniteScroll';
import { MusicData } from 'src/types/musicTypes';
import { DocumentData } from 'firebase/firestore';
import LoadingLottie from 'src/components/Lottie/LoadingLottie';

import PlaylistDetailInfo from 'src/components/common/PlaylistDetailInfo';
import PlayAndShuffleBtn from 'src/components/common/PlayAndShuffleBtn';
import SkelMusicLi8 from 'src/components/Skeleton/SkelMusicLi8';
import MusicLi from 'src/components/MusicLi/MusicLi';

interface Props {
  loaded: boolean;
  data: DocumentData;
}

function PlaylistDetail({ loaded, data }: Props) {
  const [playlist, setplaylist] = useState<MusicData[]>([]);
  const [sliceNum, setSliceNum] = useState(8);

  useEffect(() => {
    setplaylist(data.musicList.slice(0, 8));
  }, []);

  const endRef = useRef(null);
  const { loading } = useInfiniteScroll({
    allData: data.musicList,
    data: playlist,
    setData: setplaylist,
    sliceNum,
    setSliceNum,
    endRef,
  }); // hook

  return (
    <>
      <div className="px-[20px] pt-[74px] pb-[70px]">
        <PlaylistDetailInfo data={data} />
        <PlayAndShuffleBtn data={data} />

        {!loaded && <FadeInMotion><SkelMusicLi8 /></FadeInMotion>}
        <ul>
          {data && data.musicList.map((el: any) => (
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

export default PlaylistDetail;
