'use client';

import styled from 'styled-components';
import { sweep } from 'src/styled/frequentlyStyled';

function SkelMusicLi() {
  return (
    <SkelMusicLiBlock>
      <div className="details-box">
        <div className="image" />
        <div className="details">
          <div className="title" />
          <div className="composer" />
        </div>
      </div>
    </SkelMusicLiBlock>
  );
}
export default SkelMusicLi;

const SkelMusicLiBlock = styled.div`
  width: 346.12px;
  padding-bottom: 17px;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

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

  .details-box {
    display: flex;
    align-items: center;
  }

  .image {
    width: 49px;
    height: 49px;
    border-radius: 2px;
    background-color: var(--gray-100);
  }

  .details {
    width: 225px;
    padding-left: 16px;
  }

  .title {
    width: 195px;
    height: 15px;
    border-radius: 3px;
    background-color: var(--gray-100);
  }

  .composer {
    width: 97px;
    height: 15px;
    border-radius: 3px;
    margin-top: 6px;
    background-color: var(--gray-100);
  }
`;
