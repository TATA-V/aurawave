'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { getMusicDocs } from 'src/firebase/music';
import { MusicData } from 'src/types/musicTypes';
import useMusicPlay from 'src/hook/useMusicPlay';

import SkelNewMusic from '../Skeleton/SkelNewMusic';

function NewMusic() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<MusicData[]>([]);
  const musicPlay = useMusicPlay(); // hook

  useEffect(() => {
    // 최근에 추가한 음악 10개를 가져오기
    getMusicDocs({ limitNum: 10, orderByField: 'timestamp', orderByDirection: 'desc' })
      .then((data) => {
        setData(data);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(false);
      });
  }, []);

  const handleMusicPlay = (el: MusicData) => {
    musicPlay(el);
  };

  return (
    <NewMusicSection>
      <h2 className="section-heading">최신 음악</h2>
      {/* 스켈레톤 => SkelNewMusic 컴포넌트 */}
      {!loaded && (
        <SkelNewMusicBlock>
          {[...Array(4)].map((_, i) => (
            <SkelNewMusic key={i} />
          ))}
        </SkelNewMusicBlock>
      )}

      {loaded && (
        <StyledSwiper spaceBetween={15} slidesPerView={3.1}>
          {data.map((el) => (
            <SwiperSlide key={el.uuid}>
              <NewMusicLi>
                <div className="music-content">
                  <Image
                    onClick={() => handleMusicPlay(el)}
                    className="image"
                    width={95}
                    height={95}
                    src={el.imageUri}
                    alt="new music"
                  />
                  <div className="details">
                    <p onClick={() => handleMusicPlay(el)} className="title">
                      {el.title}
                    </p>
                    <p onClick={() => handleMusicPlay(el)} className="composer">
                      {el.composer}
                    </p>
                  </div>
                </div>
              </NewMusicLi>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
    </NewMusicSection>
  );
}

export default NewMusic;

const SkelNewMusicBlock = styled.div`
  padding: 14px 21px 0 21px;
  display: flex;
`;

const NewMusicSection = styled.section`
  padding-bottom: 50px;

  .section-heading {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
    padding-left: 21px;
  }
`;

const StyledSwiper = styled(Swiper)`
  padding: 14px 21px 0 21px;
`;

const NewMusicLi = styled.li`
  .music-content {
    width: 95px;
    height: 133px;
  }

  .image {
    width: 95px;
    height: 96px;
    border: 1px solid var(--gray-100);
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;
  }

  .details {
    padding-top: 9px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    width: 95px;
    height: 16px;
    color: var(--dark-blue-900);
    font-size: 0.68rem;
    font-weight: 500;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }

  .composer {
    width: 95px;
    height: 12px;
    color: var(--gray-400);
    font-size: 0.6rem;
    font-weight: 400;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
`;
