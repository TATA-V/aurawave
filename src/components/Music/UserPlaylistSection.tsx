'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { PlaylistData } from 'src/types/playlistTypes';
import { getPlaylistDocs } from 'src/firebase/playlist';
import userState from 'src/atom/userState';
import SkelUserPlaylistSection from 'src/components/Skeleton/SkelUserPlaylistSection';

function UserPlaylistSection() {
  const [loaded, setLoaded] = useState(false);
  const [playlistData, setPlaylistData] = useState<PlaylistData[]>([]);
  const { isLoggedIn, username } = useRecoilValue(userState);

  useEffect(() => {
    getPlaylistDocs({ limitNum: 10, orderByField: 'timestamp', orderByDirection: 'asc' })
      .then((data) => {
        const filteredPlaylist = data.filter((playlist) => {
          if (isLoggedIn) {
            return playlist.isPublic && playlist.username !== username;
          }
          return playlist.isPublic && playlist.username;
        });
        setPlaylistData(filteredPlaylist);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(false);
      });
  }, [isLoggedIn, username]);

  return (
    <SectionBlock>
      <TopBox>
        <p className="user-playlist">다른 유저의 플레이리스트</p>
        <Link href="/playlist/" className="all-txt">
          전체보기
        </Link>
      </TopBox>
      {/* 스켈레톤 => SkelUserPlaylistSection 컴포넌트 */}
      {!loaded && <SkelUserPlaylistSection />}

      {loaded && (
        <Ul>
          {playlistData.slice(0, 5).map((el) => (
            <UserPlaylistLi key={el.uuid}>
              <div className="flex items-center">
                <Image
                  className="image"
                  width={116}
                  height={99}
                  src={String(el.playlistImageUri)}
                  alt="playlist image"
                />
                <div className="details">
                  <p className="title-desc">
                    <span className="title">{el.playlistTitle}</span>
                    <span className="description">{el.description}</span>
                  </p>
                  <span className="username">{el.username}</span>
                </div>
              </div>
              <div className="i-down-box">
                <i className="i-down" />
              </div>
            </UserPlaylistLi>
          ))}
        </Ul>
      )}
    </SectionBlock>
  );
}

export default UserPlaylistSection;

const SectionBlock = styled.section`
  padding: 57px 20px 0 20px;
`;

const TopBox = styled.div`
  width: 100%;
  padding-bottom: 6px;
  display: flex;
  justify-content: space-between;

  .user-playlist {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
  }

  .all-txt {
    color: var(--gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
  }
`;

const UserPlaylistLi = styled.li`
  height: 129px;
  border-bottom: 1px solid var(--gray-60);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .image {
    width: 116px;
    height: 99px;
    border: 1px solid var(--gray-100);
    border-radius: 15px;
    object-fit: cover;
  }

  .details {
    width: 208px;
    height: 77px;
    margin-left: 11px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title-desc {
    height: 37px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 500;
  }

  .description {
    color: var(--blue-gray-800);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .username {
    color: var(--blue-gray-700);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .i-down-box {
    font-size: 11px;
    transform: rotate(-90deg);

    .i-down::before {
      color: var(--blue-gray-650);
    }
  }
`;

const Ul = styled.ul`
  li:last-child {
    border-bottom: none;
  }
`;
