'use client';

import { useEffect, useState } from 'react';
import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import { auth } from 'src/firebase/config';
import { getUserInfo } from 'src/firebase/user';
import * as S from 'src/styled/searchStyled';
import styled from 'styled-components';
import PlusIcon from 'src/assets/icons/PlusIcon';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MyPlaylistItem from 'src/components/MyPlaylist/MyPlaylistItem';
import Link from 'next/link';
import { UserPlaylistData } from 'src/types/playlistTypes';
import CheckSvg from '@/public/checkSvg.svg';

function MyPlaylist() {
  const [playlists, setPlaylists] = useState<UserPlaylistData[]>([]);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<UserPlaylistData[]>([]);

  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    getUserInfo(user.uid)
      .then((data) => {
        if (!data) return;
        const { playlists } = data;
        if (!playlists) return;
        setPlaylists(playlists);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const find = playlists?.filter((item) => (
      item.playlistTitle.includes(value) || item.description.includes(value)
    ));
    if (find) {
      setSearchData(find);
    }
    setSearch(value);
  };

  return (
    <>
      <GoBackHead title="내 플레이리스트" />
      <div className="pt-[61px] px-[20px]">
        <S.SearchBox>
          <input
            onChange={handleSearch}
            className="search-input"
            type="text"
            placeholder="원하는 플레이리스트를 검색해 보세요"
          />
          <i className="i-search" />
          <S.Bar className="bar" />
        </S.SearchBox>

        <div className="flex justify-between">
          <div className="flex items-center gap-[6px]">
            <CheckSvg /><p className="text-darkBlue600 text-[0.8125rem]">{playlists?.length}개</p>
          </div>
          <Button whileTap={{ scale: 0.9 }} onClick={() => router.push('/playlist-editor')}>
            <PlusIcon />새로 만들기
          </Button>
        </div>

        <ul className="pt-[30px] pb-[100px] flex flex-col gap-[16px]">
          {(search.trim().length !== 0 ? searchData : playlists).map((item) => (
            <Link key={item.uuid} href={`/my-playlist/${item.uuid}`}>
              <MyPlaylistItem item={item} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MyPlaylist;

const Button = styled(motion.button)`
  width: 169px;
  height: 52px;
  color: var(--dark-blue-900);
  font-size: 0.9375rem;
  border: 1px solid var(--gray-100);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
