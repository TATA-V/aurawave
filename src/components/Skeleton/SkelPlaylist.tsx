'use client';

import React from 'react';
import styled from 'styled-components';
import { sweep } from 'src/styled/frequentlyStyled';

function SkelPlaylist() {
  return (
    <SkelPlaylistBlock>
      <PlaylistItem>
        <PlaylistContent>
          <div className="playlist-content">
            <div className="image" />
            <div className="content-box">
              <div className="content">
                <div className="title" />
                <div className="subtitle" />
              </div>
              <div className="play-box">
                <div className="play" />
              </div>
            </div>
          </div>
        </PlaylistContent>
      </PlaylistItem>
    </SkelPlaylistBlock>
  );
}

export default SkelPlaylist;

const SkelPlaylistBlock = styled.div`
  margin-top: 14px;
  height: 259px;
  position: relative;
`;

const PlaylistItem = styled.div`
  display: flex;
  position: relative;
`;

const PlaylistContent = styled.div`
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    animation: ${sweep} 2s infinite;
    background-image: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.25), transparent);
    transform: rotate(30deg);
  }

  .playlist-content {
    width: 200px;
    height: 243px;
    border: 1px solid var(--gray-100);
    border-radius: 18px;
    padding: 7px 7px 0 7px;
    box-shadow: 0 2px 8px rgba(16, 29, 33, 0.1);
    background-color: var(--white-100);

    display: flex;
    flex-direction: column;
  }

  .content-box {
    display: flex;
    padding-left: 9px;
  }

  .content {
    padding-top: 22px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .image {
    width: 100%;
    height: 158px;
    background-color: var(--gray-100);
    border-radius: 15px;
  }

  .title {
    width: 100px;
    height: 18px;
    background-color: var(--gray-100);
    border-radius: 3px;
  }

  .subtitle {
    width: 128px;
    height: 13px;
    background-color: var(--gray-100);
    border-radius: 3px;
  }

  .play-box {
    width: 100%;
    padding: 15px 0 0 9px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .play {
    width: 25px;
    height: 29px;
    border-radius: 4px;
    background-color: var(--gray-100);
  }
`;
