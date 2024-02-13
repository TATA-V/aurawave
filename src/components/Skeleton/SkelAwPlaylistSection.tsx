'use client';

import styled from 'styled-components';
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import SkelAwPlaylistItem from 'src/components/Skeleton/SkelAwPlaylistItem';

function SkelAwPlaylistSection() {
  return (
    <FadeInMotion>
      <SkelAwPlaylistSectionBlock>
        {[...Array(3)].map((_, idx) => (
          <div className="w-[168px] min-w540:w-[193px] flex-shrink-0" key={idx}><SkelAwPlaylistItem /></div>
        ))}
      </SkelAwPlaylistSectionBlock>
    </FadeInMotion>
  );
}

export default SkelAwPlaylistSection;

const SkelAwPlaylistSectionBlock = styled.div`
  display: flex;
  padding: 0 20px 0 20px;
  gap: 11px
`;
