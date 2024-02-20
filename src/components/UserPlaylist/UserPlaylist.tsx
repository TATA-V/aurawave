'use client';

import * as S from 'src/styled/searchStyled';
import { useEffect, useState } from 'react';
import GoBackHead from 'src/components/GoBackHead/GoBackHead';
import { getAllPlaylistDocs } from 'src/firebase/playlist';
import { PlaylistData } from 'src/types/playlistTypes';
import UserPlaylistItem from 'src/components/UserPlaylist/UserPlaylistItem';
import Link from 'next/link';

function UserPlaylist() {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<PlaylistData[]>([]);

  useEffect(() => {
    getAllPlaylistDocs()
      .then((data) => {
        const find = data.filter((item) => item.isPublic === true);
        setPlaylists(find);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const find = playlists?.filter((item) => (
      item.playlistTitle.includes(value) || item.description.includes(value) || item.username.includes(value)
    ));
    if (find) {
      setSearchData(find);
    }
    setSearch(value);
  };

  return (
    <>
      <GoBackHead title="다른 유저의 플레이리스트" />
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

        <ul className="pt-[10px] pb-[100px] flex flex-col gap-[16px]">
          {(search.trim().length !== 0 ? searchData : playlists).map((item) => (
            <Link key={item.uuid} href={`/user-playlist/${item.uuid}`}>
              <UserPlaylistItem item={item} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UserPlaylist;
