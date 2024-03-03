'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { bubblegum } from 'src/fonts/fonts';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import audioEnhanceState from 'src/atom/audioEnhanceState';
import LandscapeJpg from 'src/assets/jpg-file/landscape.jpg';
import star from 'src/assets/gif/star.gif';
import fire from 'src/assets/gif/fire.gif';
import firefly from 'src/assets/gif/firefly.gif';
import rain from 'src/assets/gif/rain.gif';
import snow from 'src/assets/gif/snow.gif';

function Landscape() {
  const [effectSrc, setEffectSrc] = useState(star);
  const [effectTxt, setEffectTxt] = useState('Star');
  const { bgAudioText } = useRecoilValue(audioEnhanceState);

  useEffect(() => {
    let effect = star;
    let text = 'Star';
    switch(bgAudioText) {
      case 'default' :
        effect = star;
        text= 'Star';
        break;
      case '모닥불' :
        effect = fire;
        text = 'Bonfire';
        break;
      case '시골 여름밤' :
        effect = firefly;
        text = 'Firefly';
        break;
      case '잔잔한 빗소리' :
        effect = rain;
        text = 'Rain';
        break;
      case '펑펑 쏟아지는 함박눈' :
        effect = snow;
        text = 'Snow';
        break;
    }
    setEffectSrc(effect);
    setEffectTxt(text);
  }, [bgAudioText])

  return (
    <LandscapeBlock className="px-[20px]" $effect={bgAudioText}>
      <div className="landscape">
        <Image
          width={539.87}
          height={167}
          className="image"
          src={LandscapeJpg}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACCAQ8DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBQQD/8QAGBABAQEBAQAAAAAAAAAAAAAAAAEREgL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwDmiK0yKgCiKCiAKAAgAIIBWatSglZq1KKzWa1WaDNZrVZoM1KtZopUKiAAoKggoigogDoqzpqstGs6aDWrrOmg1prOroLpqaaC6azpoLqampoLqWpqWgWs2lqWgWs2lrNopWbS1m0Cs2lqWgampqaK1qammoNaM6aDSs6aDWms6ug6Gms6arDWrrGmg3prOmg1q6xpoN6ms6aDWms6mg1qazqaDWpazaloLalqWs2irazalrNoLazalrNoLazalrNorVqazfTPQN6ax0dA3q6+fR0g+mrr59LoN6axpoOjprOmqy3prGmg3prGmg3prGmiN6axpoN6ms6mg1prGpoNalrOpaDVrNrNqWirazalrF9A1azfTNrNoLfTN9M2olajWpqBVAEF01AF1dZAa6OmQHS01nTWnNrTWdNBvTWNNBvU1nTQa01nU0RvU1nU0GtTWdS0GrUtZtZtBq1m1LWbQW1m1LWbUrWYtrOoI2AAAAAAAAAAAA9umpppXNdXWdNUa01kBrTWQGtTUBF1NQA1NEAtZtWs0C1m1axalazC1kBsAAAAAAAAAAAAAB6gGayogVFAWiiBRUUKIAERFQIlZrVZpVjNZrVZouYyKiqAAAAAAAAAAAAAA9IDkiiKAqKoAqoAKCKgCKgqVmtM1FZrNbrFXFxkVFURRUQUEQUBBQEFAABQAHoAcmRQAUFBQUABABVRABKlBFZrFBcaQBRABABQAEABQAAAAAV//9k="
          alt="landscape"
        />
        <Image
          width={539.87}
          height={167}
          className="image effect"
          src={effectSrc}
          alt="effect"
        />
        <p className={`stars-text ${bubblegum.className}`}>{effectTxt}</p>
      </div>
    </LandscapeBlock>
  );
}

export default Landscape;

const LandscapeBlock = styled.div<{ $effect: string }>`
  display: flex;
  justify-content: center;

  .effect {
    position: absolute;
    top: 0;
    left: 0;
    mix-blend-mode: ${({$effect}) => $effect === ('잔잔한 빗소리' || '펑펑 쏟아지는 함박눈') ? 'color-dodge' : 'lighten'};
  }

  .landscape {
    width: 100%;
    height: 167px;
    border: 1px solid var(--gray-100);
    border-radius: 7px;
    display: flex;
    justify-content: end;
    align-items: end;
    position: relative;
    overflow: hidden;
  }

  .stars-text {
    position: absolute;
    margin: 9px 13px 9px 13px;
    color: var(--white-100);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .image {
    width: 100%;
    height: 167px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    object-fit: cover;
    object-position: 15% 50%;
  }
`;
