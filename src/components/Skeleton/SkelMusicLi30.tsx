'use client';

import SkelMusicLi from 'src/components/Skeleton/SkelMusicLi';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function SkelMusicLi30() {
  return (
    <FadeInMotion>
      <div>
        {[...Array(30)].map((_, i) => (
          <SkelMusicLi key={i} />
        ))}
      </div>
    </FadeInMotion>
  );
}

export default SkelMusicLi30;
