'use client';

import React from 'react';
import styled from 'styled-components';
import SkelMusicLi from './SkelMusicLi';

function SkelMusicLi30() {
  return (
    <SkeletonMusicCollectionBlock>
      {[...Array(30)].map((_, i) => (
        <SkelMusicLi key={i} />
      ))}
    </SkeletonMusicCollectionBlock>
  );
}

export default SkelMusicLi30;

const SkeletonMusicCollectionBlock = styled.div`
  padding-left: 21px;
`;
