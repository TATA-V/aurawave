'use client';

import Image from 'next/image';
import { MusicData } from 'src/types/musicTypes';
import useMusicPlay from 'src/hook/useMusicPlay';
import * as S from 'src/styled/musicLiStyled';
import { usePathname } from 'next/navigation';
import { Reorder } from 'framer-motion';

interface Props {
  el: MusicData;
  handleDragEnd: () => void;
}
function SoundtrackMusicLi({ el, handleDragEnd }: Props) {
  const { imageUri, title, composer } = el;
  const musicPlay = useMusicPlay(); // hook
  const pathname = usePathname();
  const isSoundTrackPage = pathname === '/soundtrack';

  const handleMusicPlay = (el: MusicData) => {
    musicPlay(el);
  };

  return (
    <Reorder.Item onDragEnd={handleDragEnd} id={el.uuid} value={el}>
      <S.MusicLiBlock>
        <div className="music-content">
          <div className="details-box">
            <Image
              onClick={() => handleMusicPlay(el)}
              className="image"
              width={50}
              height={50}
              src={imageUri}
              alt="recommended music"
            />
            <p className="details">
              <span onClick={() => handleMusicPlay(el)} className="title">
                {title}
              </span>
              <br />
              <span onClick={() => handleMusicPlay(el)} className="composer">
                {composer}
              </span>
            </p>
          </div>

          {isSoundTrackPage && (
            <button className="p-2">
              <i className="i-menu-black" />
            </button>
          )}
        </div>
      </S.MusicLiBlock>
    </Reorder.Item>
  );
}

export default SoundtrackMusicLi;
