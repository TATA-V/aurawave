import styled from 'styled-components';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useClickOutside } from '@reactuses/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import currentTrackState from 'src/atom/currentTrackState';
import audioEnhanceState from 'src/atom/audioEnhance';
import CustomRangeSlider from '../common/CustomRangeSlider';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function VolumeModal({ open, setOpen } : Props) {
  const setAudioEnhance = useSetRecoilState(audioEnhanceState);
  const resetCurrentTrack = useResetRecoilState(currentTrackState);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => {
    setOpen(false);
  });
  const handleRange = (values: number[]) => {
    const volume = values[1] / 100;
    setAudioEnhance((prev) => ({ ...prev, volume }));
  };

  return (
    <AnimatePresence>
      {open
      && (
        <VolumeModalBlock
          initial={{ opacity: 0, scale: 0.5, transformOrigin: '100% 100%' }}
          animate={{ opacity: 1, scale: 1, transition: { type: 'spring', duration: 0.35 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          ref={modalRef}
          className="bottom-[75px] right-[16px] w-[105px] px-[5px]"
        >
          <p className="h-[33px] w-full flex items-center justify-center font-medium text-[0.6rem] text-darkBlue800">
            현재 음악 음량 조절
          </p>
          <div className="range h-[45px] flex justify-center items-center">
            <CustomRangeSlider handleRange={handleRange} />
          </div>
          <button onClick={resetCurrentTrack} className="h-[33px] w-full flex gap-[4px] items-center justify-center font-medium text-[0.55rem] text-pink500">
            <i className="i-delete" />음악 재생 창 닫기
          </button>
        </VolumeModalBlock>
      )}
    </AnimatePresence>
  );
}

export default VolumeModal;

const VolumeModalBlock = styled(motion.div)`
  position: absolute;
  background-color: #fff;
  border: 1px solid var(--gray-100);
  border-radius: 4px;
  .range {
    border-top: 1px solid var(--gray-50);
    border-bottom: 1px solid var(--gray-50);
  }
  .i-delete {
    font-size: 0.4rem;
    &::before {
      color: var(--pink-500);
    }
  }
`;
