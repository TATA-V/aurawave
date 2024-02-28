'use client';

import styled from 'styled-components';
import Landscape from 'src/components/Landscape/Landscape';

function InactiveLandscape() {
  return (
    <LandscapeBlock>
      <Landscape />
    </LandscapeBlock>
  );
}

export default InactiveLandscape;

const LandscapeBlock = styled.div`
  opacity: 0.87;
  display: flex;
  justify-content: center;
`;
