'use client';

import React from 'react';
import styled from 'styled-components';
import SkelMusicLi from './SkelMusicLi';

function SkelMusicSection() {
  return (
    <SkelMusicSectionBlock>
      <div className="first">
        {[...Array(5)].map((_, i) => (
          <SkelMusicLi key={i} />
        ))}
      </div>
      <div className="second">
        {[...Array(5)].map((_, i) => (
          <SkelMusicLi key={i} />
        ))}
      </div>
    </SkelMusicSectionBlock>
  );
}

export default SkelMusicSection;

const SkelMusicSectionBlock = styled.div`
  padding-left: 21px;

  display: flex;
`;
