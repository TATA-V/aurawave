'use client';

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
  padding: 0 20px 0 20px;

  .landscape {
    width: 100%;
    height: 167px;
    border: 1px solid var(--gray-100);
    border-radius: 7px;
    display: flex;
    justify-content: end;
    align-items: end;
  }

  .image {
    width: 100%;
    height: 167px;
    object-fit: cover;
    border-radius: 6px;
    display: flex;
    justify-content: center;
  }
`;
