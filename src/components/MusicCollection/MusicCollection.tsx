'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as S from 'src/styled/searchStyled';
import { End } from 'src/styled/frequentlyStyled';
import useInfiniteScroll from 'src/hook/useInfiniteScroll';
import { getAllMusicDocs } from 'src/firebase/music';
import { MusicData } from 'src/types/musicTypes';

import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import MusicLi from 'src/components/MusicLi/MusicLi';
import LoadingLottie from 'src/components/Lottie/LoadingLottie';
import SkelMusicLi30 from 'src/components/Skeleton/SkelMusicLi30';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function MusicCollection() {
  const [loaded, setLoded] = useState(false);
  // search 음악
  const [searchText, setSearchText] = useState('');
  const [findSearchData, setFindSearchData] = useState<MusicData[]>([]);
  // all 음악
  const [allData, setAllData] = useState<MusicData[]>([]);
  const [data, setData] = useState<MusicData[]>([]);
  const [sliceNum, setSliceNum] = useState(30);
  const endRef = useRef(null);
  const { loading } = useInfiniteScroll({
    allData,
    data,
    setData,
    sliceNum,
    setSliceNum,
    endRef,
  }); // hook

  useEffect(() => {
    // 모든 데이터 가져오기
    getAllMusicDocs()
      .then((data) => {
        setAllData(data);
        const initialData = data.slice(0, 30); // 처음 데이터 지정
        setData(initialData);
        setLoded(true);
      })
      .catch((error) => {
        setLoded(false);
      });
  }, []);

  // 검색
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    const searchResult = allData.filter((music) => (music.title && music.title.toLowerCase().includes(searchText))
    || (music.composer && music.composer.toLowerCase().includes(searchText)));
    setFindSearchData(searchResult);
    setSearchText(e.target.value);
  };

  return (
    <>
      {/* 뒤로가기 => GoBackHead 컴포넌트 */}
      <GoBackHead title="음악 컬렉션" />

      {/* 검색창 */}
      <MusicCollectionBlock>
        <S.SearchBox>
          <input
            onChange={handleSearch}
            className="search-input"
            type="text"
            placeholder="원하는 곡을 검색해 보세요"
          />
          <i className="i-search" />
          <S.Bar className="bar" />
        </S.SearchBox>
        {/* 스켈레톤 => SkeletonMusicCollection 컴포넌트 */}
        {!loaded && <SkelMusicLi30 />}

        {/* 모든 음악 */}
        <ul>
          {(searchText.trim() !== '' ? findSearchData : data).map((el) => (
            <FadeInMotion key={el.uuid}>
              <MusicLi el={el} />
            </FadeInMotion>
          ))}
        </ul>
      </MusicCollectionBlock>
      {loading && <LoadingLottie />}
      <End ref={endRef} />
    </>
  );
}

export default MusicCollection;

const MusicCollectionBlock = styled.div`
  padding: 61px 20px 0 20px;
`;
