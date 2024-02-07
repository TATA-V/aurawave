'use client';

import React from 'react';
import styled from 'styled-components';
import { sweep } from 'src/styled/frequentlyStyled';

function SkelNewMusic() {
  return (
    <SkelNewMusicBlock>
      <div className="wrapper">
        <div className="image" />
        <div className="content">
          <div className="title" />
          <div className="composer" />
        </div>
      </div>
    </SkelNewMusicBlock>
  );
}

export default SkelNewMusic;

const SkelNewMusicBlock = styled.div`
  padding-right: 21px;
  .wrapper {
    width: 95px;
    height: 133px;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      animation: ${sweep} 2s infinite;
      background-image: linear-gradient(
        to left,
        transparent,
        rgba(255, 255, 255, 0.25),
        transparent
      );
      transform: rotate(30deg);
    }
  }

  .image {
    width: 95px;
    height: 95px;
    border-radius: 4px;
    background-color: var(--gray-100);
  }

  .content {
    padding: 9px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .title {
    width: 55px;
    height: 12px;
    border-radius: 3px;
    background-color: var(--gray-100);
  }

  .composer {
    width: 32px;
    height: 10px;
    border-radius: 3px;
    margin-top: 3px;
    background-color: var(--gray-100);
  }
`;
