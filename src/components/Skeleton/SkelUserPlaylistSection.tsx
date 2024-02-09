'use client';

import React from 'react';
import styled from 'styled-components';
import { sweep } from 'src/styled/frequentlyStyled';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function SkelUserPlaylistSection() {
  return (
    <SkelUserPlaylistSectionBlock>
      {[...Array(5)].map((_, i) => (
        <FadeInMotion key={i}>
          <div className="content">
            <div className="image" />
            <div className="details">
              <div className="title-desc">
                <div className="title" />
                <div className="description" />
              </div>
              <div className="username" />
            </div>
          </div>
        </FadeInMotion>
      ))}
    </SkelUserPlaylistSectionBlock>
  );
}

export default SkelUserPlaylistSection;

const SkelUserPlaylistSectionBlock = styled.div`
  .content {
    height: 129px;
    display: flex;
    align-items: center;
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

    .details {
      height: 77px;
      padding-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .image {
      width: 116px;
      height: 99px;
      border-radius: 15px;
      background-color: var(--gray-100);
    }

    .title {
      width: 110px;
      height: 16px;
      border-radius: 3px;
      background-color: var(--gray-100);
    }

    .description {
      width: 145px;
      height: 13px;
      border-radius: 3px;
      background-color: var(--gray-100);
      margin-top: 6px;
    }

    .username {
      width: 44px;
      height: 13px;
      border-radius: 3px;
      background-color: var(--gray-100);
    }
  }
`;
