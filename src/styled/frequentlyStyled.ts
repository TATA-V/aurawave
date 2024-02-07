'use client';

import styled, { keyframes } from 'styled-components';

export const End = styled.div`
  width: 100%;
  height: 5px;
  background-color: var(--white-100);
`;

export const sweep = keyframes`
  0% {
      transform: translateX(-100%);
  }
  50% {
      transform: translateX(150%);
  }
  100% {
      transform: translateX(-100%);
  }
`;
