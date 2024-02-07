'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LandscapeJpg from 'src/assets/jpg-file/landscape.jpg';

function InactiveLandscape() {
  return (
    <LandscapeBlock>
      <div className="landscape">
        <Image
          className="image"
          width={346.2}
          height={165.2}
          src={LandscapeJpg}
          placeholder="blur"
          alt="landscape"
        />
      </div>
    </LandscapeBlock>
  );
}

export default InactiveLandscape;

const LandscapeBlock = styled.div`
  opacity: 0.87;
  display: flex;
  justify-content: center;

  .landscape {
    width: 348px;
    height: 167px;
    border: 1px solid var(--gray-100);
    border-radius: 7px;
    display: flex;
    justify-content: end;
    align-items: end;
  }

  .image {
    border-radius: 6px;
    display: flex;
    justify-content: center;
  }
`;
