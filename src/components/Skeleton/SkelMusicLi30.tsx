'use client';

import styled from 'styled-components';
import SkelMusicLi from 'src/components/Skeleton/SkelMusicLi';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function SkelMusicLi30() {
  return (
    <FadeInMotion>
      <SkeletonMusicCollectionBlock>
        {[...Array(30)].map((_, i) => (
          <SkelMusicLi key={i} />
        ))}
      </SkeletonMusicCollectionBlock>
    </FadeInMotion>
  );
}

export default SkelMusicLi30;

const SkeletonMusicCollectionBlock = styled.div`
  padding-left: 21px;
`;
