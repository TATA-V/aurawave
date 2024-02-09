'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import currentTrackState, { CurrentMusic } from 'src/atom/currentTrackState';
import { Reorder } from 'framer-motion';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import SoundtrackMusicLi from 'src/components/Soundtrack/SoundtrackMusicLi';
import SkelMusicLi from 'src/components/Skeleton/SkelMusicLi';
import CheckSvg from '../../../public/checkSvg.svg';

function Soundtrack() {
  const [loaded, setLoaded] = useState(false);
  const [musicTrack, setMusicTrack] = useState<CurrentMusic[]>([]);
  // 리코일
  const resetCurrentMusicAndTrack = useResetRecoilState(currentTrackState);
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState);
  const { playMode, currentTrack, suffleTrack } = currentMusicAndTrack;
  const router = useRouter();

  useEffect(() => {
    const track = playMode === 'shuffle' ? suffleTrack : currentTrack;
    const trackTxt = playMode === 'shuffle' ? 'suffleTrack' : 'currentTrack';
    setMusicTrack(track);
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

        <Reorder.Group axis="y" values={musicTrack} onReorder={setMusicTrack}>
          {musicTrack.map((track) => (
            <SoundtrackMusicLi key={track.uuid} el={track} />
          ))}
        </Reorder.Group>
      </SoundtrackBlock>
    </>
  );
}

export default Soundtrack;

const SoundtrackBlock = styled.div`
  padding: 0 20px 0 20px;
`;

const TrackCount = styled.div`
  display: flex;
  align-items: center;
  padding: 74px 0 19px 0;

  .track-count-txt {
    color: var(--dark-blue-600);
    font-size: 0.8125rem;
    padding-left: 6px;
  }
`;
