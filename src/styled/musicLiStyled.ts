'use client';

import styled from 'styled-components';

export const MusicLiBlock = styled.li`
  margin-bottom: 17px;
  padding-right: 3px;
  width: 100%;

  .i-menu-black {
    font-size: 14px;
    cursor: pointer;
    &::before {
      color: var(--gray-200);
    }
  }

  .music-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .details-box {
    display: flex;
    align-items: center;
  }

  .image {
    width: 50px;
    height: 50px;
    border: 1px solid var(--gray-100);
    border-radius: 2px;
    object-fit: cover;
    cursor: pointer;
  }

  .details {
    width: 100%;
    padding-left: 16px;
    line-height: 1.1rem;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
  }

  .composer {
    color: var(--gray-400);
    font-size: 0.8125rem;
    font-weight: 400;
    cursor: pointer;
  }
`;

export const MoreBox = styled.div`
  position: relative;

  button {
    padding: 5px 0 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
