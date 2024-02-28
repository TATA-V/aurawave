import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import CustomRangeSlider from 'src/components/common/CustomRangeSlider';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useClickOutside } from '@reactuses/core';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function BackdropModal({ open, setOpen }: Props) {
  const [bgAudioText, setBgAudioText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current;

  const options = [
    { id: 1, icon: <i className="i-bonfire" />, value: '모닥불' },
    { id: 2, icon: <i className="i-moon-line" />, value: '시골 여름 밤' },
    { id: 3, icon: <i className="i-cloud-rain" />, value: '잔잔한 빗소리' },
    { id: 4, icon: <i className="i-snow" />, value: '펑펑 쏟아지는 함박눈' },
  ];
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => {
    setOpen(false);
  });
  const handleRange = (values: number[]) => {
    if (!audio) return;
    const volume = (100 - values[0]) / 100;
    audio.volume = volume;
  };

  const audioSrc = (value: string) => {
    if (!audio) return;
    console.log('bgAudioText:', bgAudioText)
    switch (value) {
      case '모닥불':
        audio.src = 'https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F1_%E1%84%86%E1%85%A9%E1%84%83%E1%85%A1%E1%86%A8%E1%84%87%E1%85%AE%E1%86%AF.mp3?alt=media&token=6a5a134f-ed5a-45ba-b487-7ac71c5bfea8';
        break;
      case '시골 여름 밤':
        audio.src ='https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F2_%E1%84%89%E1%85%B5%E1%84%80%E1%85%A9%E1%86%AF%20%E1%84%8B%E1%85%A7%E1%84%85%E1%85%B3%E1%86%B7%20%E1%84%87%E1%85%A1%E1%86%B7.mp3?alt=media&token=d7563feb-0d1c-420a-a3c5-5e06fc6ad642';
        break;
      case '잔잔한 빗소리':
        audio.src = 'https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F3_%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%87%E1%85%B5%E1%86%BA%E1%84%89%E1%85%A9%E1%84%85%E1%85%B5.mp3?alt=media&token=4d12637e-cba5-4d60-85a4-f1a7465d3717';
        break;
      case '펑펑 쏟아지는 함박눈':
        audio.src = 'https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/background_music%2F4_%E1%84%91%E1%85%A5%E1%86%BC%E1%84%91%E1%85%A5%E1%86%BC%20%E1%84%8A%E1%85%A9%E1%86%AE%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%92%E1%85%A1%E1%86%B7%E1%84%87%E1%85%A1%E1%86%A8%E1%84%82%E1%85%AE%E1%86%AB.mp3?alt=media&token=7e284eff-0ba1-4edd-8c4d-c58da448e4dd';
        break;
    }
    audio.play();
  }

  const handleOptionClick = (value: string) => {
    if (!audio) return;
    if (bgAudioText === value) {
      setBgAudioText('');
      audio.pause();
      audio.currentTime = 0;
      return;
    }
    setBgAudioText(value);
    audioSrc(value);
  };

  const handleEnded = () => {
    audioSrc(bgAudioText);
  }

  return (
    <AnimatePresence>
      <audio onEnded={handleEnded} ref={audioRef} controls className='hidden'><source /></audio>

      {open
        && (
          <BackdropModalBlock
            ref={modalRef}
            initial={{ opacity: 0, scale:0.5, transformOrigin: '100% 100%' }}
            animate={{ opacity: 1, scale: 1, transition: { type: 'spring', duration: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="flex bottom-[75px] right-[16px] w-[131px] pl-[5px]"
            $mode={bgAudioText}
          >
            <div>
              <p className="title h-[33px] pl-[6px] w-[105px] flex items-center font-medium text-[0.6rem] text-darkBlue800">
                노래에 배경음 추가
              </p>
              <div className="px-[4px] pt-[2px] pb-[3px]">
                {options.map(({ id, icon, value }) => (
                  <button key={id} onClick={() => handleOptionClick(value)} className={`${bgAudioText === value ? 'text-skyBlue500' : 'text-darkBlue700'} ${options.length !== id && 'option'} pl-[3px] w-full h-[28px] text-[0.55rem] flex items-center gap-[4.5px]`}>
                    {icon} {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-[33px] w-[24px] flex justify-center items-center">
              <CustomRangeSlider handleRange={handleRange} mode="vertical" />
            </div>
          </BackdropModalBlock>
        )}
    </AnimatePresence>
  );
}

export default BackdropModal;

const BackdropModalBlock = styled(motion.div)<{ $mode: string }>`
  position: absolute;
  background-color: #fff;
  border: 1px solid var(--gray-100);
  border-radius: 4px;
  .title {
    border-bottom: 1px solid var(--gray-50);
  }
  .option {
    border-bottom: 1px solid var(--gray-50);
  }
  .i-bonfire {
    font-size: 10.5px;
    &::before {
      color: ${({ $mode }) => ($mode === '모닥불' ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
    }
  }
  .i-moon-line::before {
    color: ${({ $mode }) => ($mode === '시골 여름 밤' ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
  }
  .i-cloud-rain::before {
    color: ${({ $mode }) => ($mode === '잔잔한 빗소리' ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
  }
  .i-snow::before {
    color: ${({ $mode }) => ($mode === '펑펑 쏟아지는 함박눈' ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
  }
`;
