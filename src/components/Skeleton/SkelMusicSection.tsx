'use client';

import styled from 'styled-components';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import SkelMusicLi from 'src/components/Skeleton/SkelMusicLi';

function SkelMusicSection() {
  return (
    <FadeInMotion>
      <SkelMusicSectionBlock className="flex md:gap-[100px]">
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
    </FadeInMotion>
  );
}

export default SkelMusicSection;

const SkelMusicSectionBlock = styled.div`
  padding-left: 20px;
`;
