'use client';

import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import userState from 'src/atom/userState';
import PeopleCircleSvg from '../../../public/peopleCircleSvg.svg';

function MyFriendAndMyPlaylist() {
  const { isAdmin } = useRecoilValue(userState);

  return (
    <MyFriendAndMyPlaylistBlock>
      <li className="list-box">
        <PeopleCircleSvg />
        <p className="list-text">친구 목록</p>
      </li>
      <li className="list-box">
        <i className="i-list-circle" />
        <p className="list-text">내 플레이리스트 목록</p>
      </li>

      {/* andmin 계정일 때 */}
      {isAdmin && (
        <>
          <li className="list-box">
            <StyledLink href="/admin-music">
              <i className="i-plus-circle" />
              <p className="list-text">음악 등록 & 삭제</p>
            </StyledLink>
          </li>
          <li className="list-box">
            <StyledLink href="/admin-awplaylist-editor">
              <i className="i-plus-circle" />
              <p className="list-text">aurawave 플레이리스트 등록</p>
            </StyledLink>
          </li>
        </>
      )}
    </MyFriendAndMyPlaylistBlock>
  );
}

export default MyFriendAndMyPlaylist;

const MyFriendAndMyPlaylistBlock = styled.ul`
  padding: 0 23px 37px 23px;

  .list-box {
    height: 48px;
    border-bottom: 1px solid var(--blue-gray-200);
    display: flex;
    align-items: center;
  }

  .list-text {
    color: var(--dark-blue-800);
    font-size: 0.8125rem;
    padding: 0 0 1.5px 6px;
    cursor: pointer;
  }

  .i-list-circle {
    color: var(--dark-blue-800);
    font-size: 14px;
    cursor: pointer;
  }

  .i-plus-circle {
    font-size: 14px;

    &::before {
      color: var(--dark-blue-800);
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;
