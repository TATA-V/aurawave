'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { getUserInfo } from 'src/firebase/user';
import { UserPlaylistData } from 'src/types/playlistTypes';
import { auth } from 'src/firebase/config';
import userState from 'src/atom/userState';

function MyPlaylistSection() {
  const [myPlaylist, setMyPlaylist] = useState<UserPlaylistData[]>();
  const { isLoggedIn } = useRecoilValue(userState);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      getUserInfo(user.uid)
        .then((data) => {
          setMyPlaylist(data.playlists as UserPlaylistData[]);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      {isLoggedIn && myPlaylist && (
        <SectionBlock>
          <TopBox>
            <p className="my-playlist">내 플레이리스트</p>
            <Link href={`/my-playlist/${user?.uid}`} className="all-txt">
              전체보기
            </Link>
          </TopBox>

          <Ul>
            {myPlaylist?.slice(0, 3).map((el) => (
              <MyPlaylistLi className="li" key={el.uuid}>
                <Image
                  className="image"
                  width={68}
                  height={58}
                  src={String(el.playlistImageUri)}
                  alt="playlist image"
                />
                <div className="details">
                  <span className="title">{el.playlistTitle}</span>
                  <span className="description">{el.description}</span>
                </div>
                <i className="i-down" />
              </MyPlaylistLi>
            ))}
          </Ul>
        </SectionBlock>
      )}
    </>
  );
}

export default MyPlaylistSection;

const SectionBlock = styled.section`
  padding: 62px 18px 0 21px;
`;

const TopBox = styled.div`
  width: 100%;
  padding-bottom: 18px;
  display: flex;
  justify-content: space-between;

  .my-playlist {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
    padding-bottom: 18px;
  }

  .all-txt {
    color: var(--gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
  }
`;

const MyPlaylistLi = styled.li`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  margin-bottom: 17px;

  .image {
    object-fit: cover;
    border: 1px solid var(--gray-100);
    border-radius: 8px;
  }

  .details {
    width: 253px;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 500;
  }

  .description {
    color: var(--dark-blue-700);
    font-size: 0.7rem;
    font-weight: 400;
    padding-top: 8px;
  }

  .i-down {
    font-size: 9px;
    transform: rotate(-90deg);

    &::before {
      color: var(--blue-gray-650);
    }
  }
`;

const Ul = styled.ul`
  li:last-child {
    margin-bottom: 0;
  }
`;
