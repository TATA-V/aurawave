'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AWPlaylistData } from 'src/types/playlistTypes';
import { bubblegum } from 'src/fonts/fonts';
import { getAwPlaylistDocs } from 'src/firebase/playlist';
import SkelAwPlaylistSection from 'src/components/Skeleton/SkelAwPlaylistSection';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import AwPlaylistItem from 'src/components/common/AwPlaylistItem';
import 'swiper/css';

function AwPlaylistSection() {
  const [loaded, setLoaded] = useState(false);
  const [playlistData, setPlaylistData] = useState<AWPlaylistData[]>([]);

  useEffect(() => {
    // AuraWave 플레이리스트 가져오기
    getAwPlaylistDocs({ limitNum: 3, orderByField: 'timestamp', orderByDirection: 'asc' })
      .then((data) => {
        setPlaylistData(data);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(false);
      });
  }, []);

  return (
    <section>
      <TopBox>
        <p className="aw-playlist">
          <span className={`aw ${bubblegum.className}`}>AuraWave</span> 플레이리스트
        </p>
        <Link href="/aw-playlist" className="all-txt">
          전체보기
        </Link>
      </TopBox>
      {!loaded && <SkelAwPlaylistSection />}

      {loaded && (
        <StyledSwiper
          spaceBetween={11}
          slidesPerView={2}
          breakpoints={{
            539: {
              slidesPerView: 2,
            },
            540: {
              slidesPerView: 2.5,
            },
          }}
        >
          <ul>
            {playlistData.map((el) => (
              <SwiperSlide key={el.uuid}>
                <FadeInMotion>
                  <AwPlaylistItem key={el.uuid} el={el} />
                </FadeInMotion>
              </SwiperSlide>
            ))}
          </ul>
        </StyledSwiper>
      )}
    </section>
  );
}

export default AwPlaylistSection;

const TopBox = styled.div`
  width: 100%;
  padding: 40px 0 18px 20px;
  display: flex;
  justify-content: space-between;

  .aw {
    font-size: 1.1875rem;
    font-weight: 400;
  }

  .aw-playlist {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
  }

  .all-txt {
    color: var(--gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    padding-right: 18px;
    text-decoration: none;
  }
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  padding: 0 21px 0 21px;
`;
