'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import currentTrackState, { CurrentMusic } from 'src/atom/currentTrackState';
import { Reorder, motion } from 'framer-motion';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import SoundtrackMusicLi from 'src/components/Soundtrack/SoundtrackMusicLi';
import SkelMusicLi from 'src/components/Skeleton/SkelMusicLi';
import CheckSvg from '@/public/checkSvg.svg';

function Soundtrack() {
  const [loaded, setLoaded] = useState(false);
  const [musicTrack, setMusicTrack] = useState<CurrentMusic[]>([]);
  // 리코일
  const resetCurrentMusicAndTrack = useResetRecoilState(currentTrackState);
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState);
  const { playMode, currentTrack, suffleTrack, currentMusic } = currentMusicAndTrack;
  const router = useRouter();

  useEffect(() => {
    const track = playMode === 'shuffle' ? suffleTrack : currentTrack;
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

  const handleDragEnd = () => {
    if (playMode === 'shuffle') {
      setCurrentMusicAndTrack((prev) => ({ ...prev, suffleTrack: musicTrack }));
      return;
    }
    setCurrentMusicAndTrack((prev) => ({ ...prev, currentTrack: musicTrack }));
  };

  const isChecked = () => {
    const isCurrentMusicIsChecked = musicTrack.some((item) => item.uuid === currentMusic.uuid && item.isChecked);
    return isCurrentMusicIsChecked;
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, uuid: string) => {
    const isCurrentMusicIsChecked = isChecked();
    const updateCheckedCurrent = currentTrack.map((item) => (item.uuid === uuid ? { ...item, isChecked: e.target.checked } : item));
    const updateCheckedSuffle = suffleTrack.map((item) => (item.uuid === uuid ? { ...item, isChecked: e.target.checked } : item));
    setCurrentMusicAndTrack((prev) => ({ ...prev, currentTrack: updateCheckedCurrent, suffleTrack: updateCheckedSuffle }));

    if (isCurrentMusicIsChecked) {
      setCurrentMusicAndTrack((prev) => ({ ...prev, currentMusic: { ...prev.currentMusic, isChecked: true } }));
    }
  };

  const handleDelete = () => {
    const isCurrentMusicIsChecked = isChecked();
    const delMusicFromSuffleTrack = suffleTrack.filter((item) => !item.isChecked);
    const delMusicFromCurrentTrack = currentTrack.filter((item) => !item.isChecked);
    setCurrentMusicAndTrack((prev) => ({ ...prev, suffleTrack: delMusicFromSuffleTrack }));
    setCurrentMusicAndTrack((prev) => ({ ...prev, currentTrack: delMusicFromCurrentTrack }));

    if (isCurrentMusicIsChecked) {
      const track = playMode === 'shuffle' ? delMusicFromSuffleTrack : delMusicFromCurrentTrack;
      setCurrentMusicAndTrack((prev) => ({ ...prev, currentMusic: track[0] }));
    }
  };

  return (
    <>
      <GoBackHead title="재생목록" />

      <SoundtrackBlock>
        <TrackCount>
          <div className="flex items-center">
            <CheckSvg />
            <span className="track-count-txt">{musicTrack.length}곡</span>
          </div>
          <motion.button onClick={handleDelete} whileTap={{ scale: 0.9 }} className="text-[0.8125rem] text-[#658B8B] px-2">삭제</motion.button>
        </TrackCount>
        {/* 스켈레톤 => SkelMusicLi 컴포넌트 */}
        {!loaded && [...Array(musicTrack.length)].map((_, i) => <SkelMusicLi key={i} />)}

        <Reorder.Group axis="y" values={musicTrack} onReorder={setMusicTrack}>
          {musicTrack.map((track) => (
            <SoundtrackMusicLi key={track.uuid} handleDragEnd={handleDragEnd} handleCheckboxChange={handleCheckboxChange} el={track} />
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
  justify-content: space-between;
  padding: 74px 0 19px 0;

  .track-count-txt {
    color: var(--dark-blue-600);
    font-size: 0.8125rem;
    padding-left: 6px;
  }
`;
