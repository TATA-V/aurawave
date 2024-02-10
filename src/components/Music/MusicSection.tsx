'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { getMusicDocs } from 'src/firebase/music';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import { MusicData } from 'src/types/musicTypes';
import 'swiper/css';

import SkelMusicSection from 'src/components/Skeleton/SkelMusicSection';
import SectionMusicLi from 'src/components/Music/SectionMusicLi';

function MusicSection() {
  const [data, setData] = useState<MusicData[]>([]);
  const [swiperIdx, setSwiperIdx] = useState<number>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 최근에 추가한 음악 15개를 가져오기
    getMusicDocs({ limitNum: 15, orderByField: 'timestamp', orderByDirection: 'desc' })
      .then((data) => {
        setData(data);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(false);
      });
  }, []);

  const handleSlideChange = (idx: number) => {
    setSwiperIdx(idx);
  };

  return (
    <section>
      <TopBox>
        <p className="music-collection">음악 컬렉션</p>
        <Link href="/music-collection" className="all-txt">
          전체보기
        </Link>
      </TopBox>
      {/* 스켈레톤 => SkelMusicSection 컴포넌트 */}
      {!loaded && <FadeInMotion><SkelMusicSection /></FadeInMotion>}

      {loaded && (
        <StyledSwiper
          slidesPerView={1}
          breakpoints={{
            539: {
              slidesPerView: 1,
            },
            540: {
              slidesPerView: 1.15,
            },
          }}
          onSlideChange={(e) => handleSlideChange(e.activeIndex)}
          allowSlideNext={swiperIdx !== 2}
        >
          <FadeInMotion>
            <SwiperSlide>
              <ul>
                {data.slice(0, 5).map((el) => (
                  <SectionMusicLi key={el.uuid} el={el} />
                ))}
              </ul>
            </SwiperSlide>
            <SwiperSlide>
              <ul>
                {data.slice(5, 10).map((el) => (
                  <SectionMusicLi key={el.uuid} el={el} />
                ))}
              </ul>
            </SwiperSlide>
            <SwiperSlide>
              <ul>
                {data.slice(10, 15).map((el) => (
                  <SectionMusicLi key={el.uuid} el={el} />
                ))}
              </ul>
            </SwiperSlide>
            <SwiperSlide>
              <div />
            </SwiperSlide>
          </FadeInMotion>
        </StyledSwiper>
      )}
    </section>
  );
}

export default MusicSection;

const TopBox = styled.div`
  width: 100%;
  padding: 20px 0 18px 20px;
  display: flex;
  justify-content: space-between;

  .music-collection {
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
  padding: 0 20px 0 20px;
`;
