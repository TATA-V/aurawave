'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import currentTrackState, { CurrentMusic } from 'src/atom/currentTrackState';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import SoundtrackMusicLi from 'src/components/Soundtrack/SoundtrackMusicLi';
import SkelMusicLi from 'src/components/Skeleton/SkelMusicLi';
import CheckSvg from '../../../public/checkSvg.svg';

function Soundtrack() {
  const [loaded, setLoaded] = useState(false);
  const [musicTrack, setMusicTrack] = useState<CurrentMusic[]>([]);
  const [musicTrackTxt, setMusicTrackTxt] = useState('');
  // MusicLi 드래그
  const [dragItemIdx, setDragItemIdx] = useState(0);
  const [dragOverItemIdx, setDragOverItemIdx] = useState(0);
  // 리코일
  const resetCurrentMusicAndTrack = useResetRecoilState(currentTrackState);
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState);
  const { playMode, currentTrack, suffleTrack } = currentMusicAndTrack;
  const router = useRouter();

  useEffect(() => {
    const track = playMode === 'shuffle' ? suffleTrack : currentTrack;
    const trackTxt = playMode === 'shuffle' ? 'suffleTrack' : 'currentTrack';
    setMusicTrack(track);
    setMusicTrackTxt(trackTxt);
  }, [playMode, currentTrack, suffleTrack]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // 재생목록에 노래가 하나도 없다면
  useEffect(() => {
    if (currentTrack.length === 0) {
      resetCurrentMusicAndTrack();
      router.back();
    }
  }, [currentTrack.length, resetCurrentMusicAndTrack, router]);

  // 드래그 시작
  const handleDragStart = (position: number) => {
    setDragItemIdx(position);
  };

  // 드래그 중에 다른 요소 위로 들어갈 때
  const handelDragEnter = (position: number) => {
    setDragOverItemIdx(position);
  };

  // 드래그 작업이 끝났을 때 (마우스 뗐을 때)
  const handleDragEnd = () => {
    const newMusicTrack = [...musicTrack];
    const dragItemValue = newMusicTrack[dragItemIdx];
    newMusicTrack.splice(dragItemIdx, 1);
    newMusicTrack.splice(dragOverItemIdx, 0, dragItemValue);
    setDragItemIdx(0);
    setDragOverItemIdx(0);

    setCurrentMusicAndTrack((prev) => ({
      ...prev,
      [musicTrackTxt]: newMusicTrack,
    }));
  };

  return (
    <>
      <GoBackHead title="재생목록" />

      <SoundtrackBlock>
        <TrackCount>
          <CheckSvg />
          <span className="track-count-txt">{musicTrack.length}곡</span>
        </TrackCount>
        {/* 스켈레톤 => SkelMusicLi 컴포넌트 */}
        {!loaded && [...Array(musicTrack.length)].map((_, i) => <SkelMusicLi key={i} />)}

        <ul>
          {musicTrack.map((track, idx) => (
            <SoundtrackMusicLi
              key={track.uuid}
              el={track}
              idx={idx}
              handleDragStart={handleDragStart}
              handelDragEnter={handelDragEnter}
              handleDragEnd={handleDragEnd}
            />
          ))}
        </ul>
      </SoundtrackBlock>
    </>
  );
}

export default Soundtrack;

const SoundtrackBlock = styled.div`
  padding-left: 21px;
`;

const TrackCount = styled.div`
  padding: 74px 0 19px 0;

  .track-count-txt {
    color: var(--dark-blue-600);
    font-size: 0.8125rem;
    padding-left: 6px;
  }
`;
