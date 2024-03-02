'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import useAuthentication from 'src/hook/useAuthentication';
import formatDateToYYYYMMDD from 'src/utils/formatDateToYYYYMMDD';
import playlistDataState from 'src/atom/playlistDataState';
import { usePathname } from 'next/navigation';
import useCurrentTrackSSR from 'src/hook/useCurrentTrackSSR';
import useAudioEnhanceSSR from 'src/hook/useAudioEnhanceSSR';
import AudioControlBar from 'src/components/AudioControlBar/AudioControlBar';
import BottomTab from 'src/components/BottomTab/BottomTab';
import RecWeatherToast from 'src/components/RecWeatherToast/RecWeatherToast';
import useGetWeather from 'src/hook/useGetWeather';
import recWeatherState from 'src/atom/recWeatherState';
import audioEnhanceState from 'src/atom/audioEnhanceState';

interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  const [{ isShow, showMusicDetail, isPlaying }, setCurrentTrack] = useCurrentTrackSSR();
  useAudioEnhanceSSR();
  const setPlaylistData = useSetRecoilState(playlistDataState);
  const [showRecWeather, setShowRecWeather] = useState(false);
  const { weather } = useGetWeather();

  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const hideBottomTab = showMusicDetail || ['soundtrack', 'login', 'signup', 'music-collection', 'playlist-editor'].includes(pathnameArr[1]);

  useAuthentication();
  useEffect(() => {
    if (!weather || !weather.weather[0].description) return;
    setShowRecWeather(true);
    setTimeout(() => {
      setShowRecWeather(false);
    }, 5000)
  }, [weather])

  useEffect(() => {
    const id = uuidv4(); // uuid 생성
    const formattedDate = formatDateToYYYYMMDD(); // 현재 날짜
    setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
  }, [setPlaylistData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setCurrentTrack((prev) => ({...prev, isPlaying: !isPlaying }));
      }
    };
    window.addEventListener('keydown', handleKeyDown); 
    return () => {
      window.removeEventListener('keydown', handleKeyDown); 
    };
  }, [isPlaying]);

  // audio
  const [{ recEffect }, setRecWeather] = useRecoilState(recWeatherState);
  const setAudioEnhance = useSetRecoilState(audioEnhanceState);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current;
  const getAudioSrc = (value: string) => {
    if (!audio) return;
    switch (value) {
      case '모닥불':
        audio.src = 'https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F1_%E1%84%86%E1%85%A9%E1%84%83%E1%85%A1%E1%86%A8%E1%84%87%E1%85%AE%E1%86%AF.mp3?alt=media&token=6a5a134f-ed5a-45ba-b487-7ac71c5bfea8';
        break;
      case '시골 여름 밤':
        audio.src ='https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F2_%E1%84%89%E1%85%B5%E1%84%80%E1%85%A9%E1%86%AF%20%E1%84%8B%E1%85%A7%E1%84%85%E1%85%B3%E1%86%B7%20%E1%84%87%E1%85%A1%E1%86%B7.mp3?alt=media&token=d7563feb-0d1c-420a-a3c5-5e06fc6ad642';
        break;
      case '잔잔한 빗소리':
        audio.src = 'https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F3_%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%87%E1%85%B5%E1%86%BA%E1%84%89%E1%85%A9%E1%84%85%E1%85%B5.mp3?alt=media&token=4d12637e-cba5-4d60-85a4-f1a7465d3717';
        break;
      case '펑펑 쏟아지는 함박눈':
        audio.src = 'https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F4_%E1%84%91%E1%85%A5%E1%86%BC%E1%84%91%E1%85%A5%E1%86%BC%20%E1%84%8A%E1%85%A9%E1%86%AE%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%92%E1%85%A1%E1%86%B7%E1%84%87%E1%85%A1%E1%86%A8%E1%84%82%E1%85%AE%E1%86%AB.mp3?alt=media&token=7e284eff-0ba1-4edd-8c4d-c58da448e4dd';
        break;
    }
    audio.play();
  }

  const handlePlay = (bgAudioText: string) => {
    getAudioSrc(bgAudioText);
    setRecWeather((prev) => ({ ...prev, recEffect: bgAudioText }))
    setAudioEnhance((prev) => ({ ...prev, bgAudioText }))
  }
  const handleEnded = () => {
    if (!recEffect) return;
    getAudioSrc(recEffect);
  }
  useEffect(() => {
    if (!audio) return;
    if (recEffect !== '') return;
    audio.pause();
    audio.currentTime = 0;
  }, [recEffect])

  return (
    <LayoutBlock>
      <LayoutStyle $isShow={isShow}>
        <audio onEnded={handleEnded} ref={audioRef} controls className='hidden'><source /></audio>
        <RecWeatherToast open={showRecWeather} handlePlay={handlePlay} />
        {children}
        {isShow && <AudioControlBar />}
        {!hideBottomTab && <BottomTab />}
      </LayoutStyle>
    </LayoutBlock>
  );
}

export default DefaultLayout;

interface IsShow {
  $isShow: boolean;
}

const LayoutBlock = styled.div`
  min-height: 100vh;
  background-color: rgb(233, 236, 239);
  font-family: 'Noto Sans KR', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutStyle = styled.div<IsShow>`
  width: 540px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  padding-bottom: ${({ $isShow }) => ($isShow ? '61px' : '0')};

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
