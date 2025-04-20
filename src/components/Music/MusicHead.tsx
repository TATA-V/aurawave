'use client';

import styled from 'styled-components';

function MusicHead() {
  return (
    <MusicHeadBlock>
      <p className="music-txt">Music</p>
    </MusicHeadBlock>
  );
}

export default MusicHead;

const MusicHeadBlock = styled.div`
  width: 100%;
  max-width: 600px;
  height: 61px;
  padding-left: 21px;
  background-color: var(--white-100);

  display: flex;
  align-items: center;

  .music-txt {
    color: var(--dark-blue-900);
    font-size: 1.6875rem;
    font-weight: 500;
  }
`;
