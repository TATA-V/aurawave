import React from 'react';
import styled from 'styled-components';
import { sweep } from 'src/styled/frequentlyStyled';

function SkelAwPlaylistItem() {
  return (
    <SkelAwPlaylistItemBlock>
      <div className="content ">
        <div className="image" />
        <div className="title" />
        <div className="description" />
      </div>
    </SkelAwPlaylistItemBlock>
  );
}

export default SkelAwPlaylistItem;

const SkelAwPlaylistItemBlock = styled.div`
  width: 100%;
  display: flex;
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
    background-image: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.25), transparent);
    transform: rotate(30deg);
  }

  .content {
    width: 100%;
    height: 189px;
  }

  .image {
    width: 100%;
    height: 143px;
    border-radius: 15px;
    background-color: var(--gray-100);
  }

  .title {
    width: 115px;
    height: 16px;
    border-radius: 4px;
    margin: 10px 0 0 2px;
    background-color: var(--gray-100);
  }

  .description {
    width: 148px;
    height: 13px;
    margin: 7px 0 3px 2px;
    border-radius: 4px;
    background-color: var(--gray-100);
  }

  .margin-left {
    margin-left: 11px;
  }
`;
