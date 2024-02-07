'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import userState from 'src/atom/userState';

function HelloText() {
  const { username, isLoggedIn } = useRecoilValue(userState);

  return (
    <HelloTextBlock>
      <p className="hello-text">Hello{isLoggedIn && ` ${username}`}👋</p>
    </HelloTextBlock>
  );
}

export default HelloText;

const HelloTextBlock = styled.div`
  padding: 26px 21px 8px 21px;

  .hello-text {
    color: var(--sky-blue-600);
    font-size: 15;
    font-weight: 400;
    padding-left: 1;
  }
`;
