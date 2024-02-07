'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AWPlaylistData } from 'src/types/playlistTypes';
import { getAwPlaylistDocs } from 'src/firebase/playlist';
import currentTrackState from 'src/atom/currentTrackState';
import PlayBlue from '../../../public/playBlueSvg.svg';
import 'swiper/css';

import SkelPlaylist from '../Skeleton/SkelPlaylist';

function RecommendPlaylist() {
  const [loaded, setLoaded] = useState(false);
  const [playlistData, setPlaylistData] = useState<AWPlaylistData[]>([]);
  // 리코일
  const setCurrentMusicAndPlaylistData = useSetRecoilState(currentTrackState);
  const resetCurrentTrackState = useResetRecoilState(currentTrackState);

  useEffect(() => {
    getAwPlaylistDocs({ limitNum: 3, orderByField: 'timestamp', orderByDirection: 'desc' })
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
        <SkelPlaylistBlock>
          <SkelPlaylist />
          <SkelPlaylist />
        </SkelPlaylistBlock>
      )}

      {loaded && (
        <StyledSwiper spaceBetween={22} slidesPerView={1.7}>
          {playlistData.map((el, idx) => (
            <SwiperSlide key={el.uuid}>
              <PlaylistItem>
                <div className="playlist-content">
                  <div className="image-box">
                    <Image
                      className="image"
                      width={186}
                      height={158}
                      src={String(el.playlistImageUri)}
                      alt="recommended playlist"
                    />
                  </div>
                  <div className="details">
                    <div className="des">
                      <p className="title">{el.playlistTitle}</p>
                      <p className="description">{el.description}</p>
                    </div>
                    <PlayBlue onClick={() => handlePlay(idx)} className="paly-blue" />
                  </div>
                </div>
              </PlaylistItem>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
    </PlaylistSection>
  );
}

export default RecommendPlaylist;

const SkelPlaylistBlock = styled.div`
  width: 439px;
  padding-left: 21px;
  display: flex;
  justify-content: space-between;
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
  padding: 0 21px 0 21px;
  height: 259px;
`;

const PlaylistItem = styled.div`
  .playlist-content {
    width: 200px;
    height: 243px;
    border: 1px solid var(--gray-100);
    border-radius: 18px;
    padding: 7px 7px 0 7px;
    box-shadow: 0 2px 8px rgba(16, 29, 33, 0.1);
    background-color: var(--white-100);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-box {
    width: 186px;
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
    width: 168px;
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 16px 0 16px;
  }

  .image {
    border-radius: 15px;
    cursor: pointer;
  }

  .des {
    width: 160px;
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
