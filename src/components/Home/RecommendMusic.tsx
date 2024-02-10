'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import LoadingLottie from 'src/components/Lottie/LoadingLottie';
import MusicLi from 'src/components/MusicLi/MusicLi';
import { End } from 'src/styled/frequentlyStyled';
import { MusicData } from 'src/types/musicTypes';
import { getAllMusicDocs } from 'src/firebase/music';
import useInfiniteScroll from 'src/hook/useInfiniteScroll';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import SkelMusicLi8 from 'src/components/Skeleton/SkelMusicLi8';

function RecommendMusic() {
  const [loaded, setLoaded] = useState(false);
  const [allRandomData, setAllRandomData] = useState<MusicData[]>([]);
  const [data, setData] = useState<MusicData[]>([]);
  const [sliceNum, setSliceNum] = useState(8);

  const endRef = useRef(null);
  const { loading } = useInfiniteScroll({
    allData: allRandomData,
    data,
    setData,
    sliceNum,
    setSliceNum,
    endRef,
  }); // hook

  // 배열 데이터를 랜덤으로
  const shuffle = (array: MusicData[]) => {
    const arr = [...array];
    return arr.sort(() => Math.random() - 0.5);
  };

  // 모든 음악 데이터 가져오기
  useEffect(() => {
    getAllMusicDocs()
      .then((data) => {
        const randomData = shuffle(data); // 배열 데이터를 랜덤으로
        setAllRandomData(randomData);
        const initialData = randomData.slice(0, 8); // 처음 데이터 지정
        setData(initialData);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(false);
      });
  }, []);

  return (
    <section className="px-[20px] pb-[70px]">
      <TopBox>
        <h2 className="section-heading">추천 음악</h2>
        <Link href="/music-collection" className="view-all-btn">
          전체보기
        </Link>
      </TopBox>
      {/* 스켈레톤 => SkeletonRecommendMusic 컴포넌트 */}
      {!loaded && <FadeInMotion><SkelMusicLi8 /></FadeInMotion>}

      <ul>
        {/* 음악 => MusicLi 컴포넌트 */}
        {data.map((el) => (
          <FadeInMotion key={el.uuid}>
            <MusicLi el={el} />
          </FadeInMotion>
        ))}
      </ul>

      {loading && <LoadingLottie />}
      <End ref={endRef} />
    </section>
  );
}

export default RecommendMusic;

const TopBox = styled.div`
  padding-bottom: 14px;
  display: flex;
  justify-content: space-between;

  .section-heading {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
  }

  .view-all-btn {
    color: var(--gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
  }
`;
