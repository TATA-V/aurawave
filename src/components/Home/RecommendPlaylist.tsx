'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AWPlaylistData } from 'src/types/playlistTypes';
import { getAwPlaylistDocs } from 'src/firebase/playlist';
import { motion } from 'framer-motion';
import currentTrackState from 'src/atom/currentTrackState';
import SkelPlaylist from 'src/components/Skeleton/SkelPlaylist';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import Link from 'next/link';
import Image from 'next/image';
import PlayBlue from '../../../public/playBlueSvg.svg';
import 'swiper/css';

function RecommendPlaylist() {
  const [loaded, setLoaded] = useState(false);
  const [playlistData, setPlaylistData] = useState<AWPlaylistData[]>([]);
  // 리코일
  const setCurrentMusicAndPlaylistData = useSetRecoilState(currentTrackState);
  const resetCurrentTrackState = useResetRecoilState(currentTrackState);

  useEffect(() => {
    getAwPlaylistDocs({ limitNum: 3, orderByField: 'timestamp', orderByDirection: 'asc' })
      .then((data) => {
        setPlaylistData(data);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(false);
      });
  }, []);

  // 플레이리스트 재생
  const handlePlay = (idx: number) => {
    // 클릭한 현재 플레이리스트
    const clickedPlaylist = playlistData[idx];
    // 재생목록 리셋
    resetCurrentTrackState();
    setCurrentMusicAndPlaylistData((prev) => ({
      ...prev,
      isShow: true,
      isPlaying: true,
      currentMusic: clickedPlaylist.musicList[0], // 현재 재생 중인 음악 설정
      currentTrack: clickedPlaylist.musicList, // 재생목록 설정
    }));
  };

  return (
    <PlaylistSection>
      <h2 className="section-heading">추천 플레이리스트</h2>
      {/* 스켈레톤 => SkelPlaylist 컴포넌트 */}
      {!loaded && (
        <FadeInMotion>
          <SkelPlaylistBlock>
            {[...Array(3)].map((_, idx) => (<SkelPlaylist key={idx} />))}
          </SkelPlaylistBlock>
        </FadeInMotion>
      )}

      {loaded && (
        <StyledSwiper
          spaceBetween={22}
          slidesPerView={1.7}
          breakpoints={{
            539: {
              slidesPerView: 1.7,
            },
            540: {
              slidesPerView: 2.3,
            },
          }}
        >
          {playlistData.map((el, idx) => (
            <SwiperSlide key={el.uuid}>
              <FadeInMotion>
                <PlaylistItem>
                  <div className="playlist-content">
                    <Link href={`/aw-playlist/${el.uuid}`} className="image-box">
                      <Image
                        className="image"
                        width={186}
                        height={158}
                        src={String(el.playlistImageUri)}
                        alt="recommended playlist"
                      />
                    </Link>
                    <div className="details">
                      <div className="des">
                        <Link href={`/aw-playlist/${el.uuid}`} className="title truncate">{el.playlistTitle}</Link>
                        <Link href={`/aw-playlist/${el.uuid}`} className="description truncate">{el.description}</Link>
                      </div>
                      <motion.div
                        onClick={() => handlePlay(idx)}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                      >
                        <PlayBlue className="play-blue" />
                      </motion.div>
                    </div>
                  </div>
                </PlaylistItem>
              </FadeInMotion>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
    </PlaylistSection>
  );
}

export default RecommendPlaylist;

const SkelPlaylistBlock = styled.div`
  width: 100%;
  padding-left: 20px;
  display: flex;
  gap: 18px;
`;

const PlaylistSection = styled.section`
  padding: 50px 0 45px 0;

  .section-heading {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
    padding-left: 21px;
  }
`;

const StyledSwiper = styled(Swiper)`
  margin-top: 14px;
  padding: 0 20px 0 20px;
  height: 259px;
`;

const PlaylistItem = styled.div`
  width: 100%;
  .playlist-content {
    width: 100%;
    height: 243px;
    border: 1px solid var(--gray-100);
    border-radius: 18px;
    padding: 7px 7px 0 7px;
    background-color: var(--white-100);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-box {
    width: 100%;
    height: 158px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      pointer-events: none;
    }
  }

  .details {
    width: 100%;
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 7px 0 7px;
  }

  .image {
    width: 100%;
    height: 158px;
    object-fit: cover;
    border-radius: 15px;
    cursor: pointer;
  }

  .des {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  .description {
    color: var(--dark-blue-800);
    font-size: 0.625rem;
    font-weight: 400;
    cursor: pointer;
  }

  .paly-blue {
    cursor: pointer;
    transform: translate(2.5px, 1px);
  }
`;
