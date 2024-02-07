'use client';

import React from 'react';
import SkelMusicLi from './SkelMusicLi';

function SkelMusicLi8() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <SkelMusicLi key={i} />
      ))}
    </>
  );
}

export default SkelMusicLi8;
