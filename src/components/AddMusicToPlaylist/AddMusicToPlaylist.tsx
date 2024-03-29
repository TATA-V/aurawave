'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as S from 'src/styled/searchStyled';
import { getAllMusicDocs } from 'src/firebase/music';
import { MusicData } from 'src/types/musicTypes';
import useInfiniteScroll from 'src/hook/useInfiniteScroll';

import LoadingLottie from 'src/components/Lottie/LoadingLottie';
import SkelMusicLi30 from 'src/components/Skeleton/SkelMusicLi30';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import PlaylistGoBackHead from 'src/components/GoBackHead/PlaylistGoBackHead';
import AddMusicAWMusicLi from 'src/components/AddMusicToPlaylist/AddMusicMusicLi';

function AddMusicToPlaylist() {
  const [loaded, setLoded] = useState(false);
  // search 음악
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<MusicData[]>([]);
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const find = allData.filter((music) => (music.title && music.title.toLowerCase().includes(value))
    || (music.composer && music.composer.toLowerCase().includes(value)));
    setSearchData(find);
    setSearch(value);
  };

  return (
    <>
      <Suspense fallback={<div className="w-full h-[61px]" />}>
        <PlaylistGoBackHead />
      </Suspense>

      <AddMusicPlaylistblock>
        {/* 검색창 */}
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

        {/* 모든 음악들 */}
        <ul>
          {(search.trim().length !== 0 ? searchData : data).map((el) => (
            <FadeInMotion key={el.uuid}>
              <AddMusicAWMusicLi el={el} />
            </FadeInMotion>
          ))}
        </ul>
        {loading && <LoadingLottie />}
      </AddMusicPlaylistblock>
    </>
  );
}

export default AddMusicToPlaylist;

const AddMusicPlaylistblock = styled.div`
  padding: 61px 20px 70px 20px;
`;
