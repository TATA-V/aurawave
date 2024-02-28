'use client';

import styled from 'styled-components';
import TentIcon from 'src/assets/icons/TentIcon';
import XIcon from 'src/assets/icons/XIcon';
import { useState } from 'react';
import VolumeModal from 'src/components/AudioEnhancer/VolumeModal';
import BackdropModal from 'src/components/AudioEnhancer/BackdropModal';
import { useRecoilState } from 'recoil';
import audioEnhanceState from 'src/atom/audioEnhance';

function AudioEnhancer() {
  const [{ mode }, setAudioEnhance ] = useRecoilState(audioEnhanceState)
  const [openVolumeModal, setOpenVolumeModal] = useState(false);
  const [openBackdropModal, setOpenBackdropModal] = useState(false);
  const backdropModalProps = { open: openBackdropModal, setOpen: setOpenBackdropModal };
  const volumeModalProps = { open: openVolumeModal, setOpen: setOpenVolumeModal };

  const handleClick = () => {
    let temp: string[];
    switch (mode[0]) {
      case 'default':
        temp = ['backdrop', 'linear-gradient(145deg, #ACACAC, #D7DADB)'];
        setOpenBackdropModal(true);
        break;
      case 'backdrop':
        temp = ['volume', 'linear-gradient(145deg, #78999A, #D2B2B7)'];
        setOpenVolumeModal(true);
        break;
      case 'volume':
        temp = ['default', 'linear-gradient(145deg, #8ECECE 10%, #DDC4C8, #FF99A7)'];
        break;
      default:
        temp = ['default', 'linear-gradient(145deg, #8ECECE 10%, #DDC4C8, #FF99A7)'];
    }
    setAudioEnhance((prev) => ({...prev, mode: temp}));
  };

  return (
    <div className="relative h-0">
      <AudioEnhancerBtn onClick={handleClick} $mode={mode}>
        <div className="audio-enhance absolute top-[-66px] right-[16px] rounded-full w-[53px] h-[53px] z-100 bg-gray500 flex justify-center items-center">
          <div className="relative">
            <TentIcon />
            <div className={`${mode[0] !== 'default' && 'rotate-[45deg]'} origin-[50%_45%] transition-all duration-200 ease-in-out w-[24px] h-[24px] absolute top-[-7px] right-[-8px]`}>
              <XIcon strokeWidth={1.3} />
            </div>
            <div className={`${mode[0] !== 'default' && 'rotate-[45deg]'} origin-[50%_45%] transition-all duration-200 ease-in-out w-[20px] h-[20px] absolute top-[5px] left-[-10px]`}>
              <XIcon strokeWidth={1} />
            </div>
            <div className={`${mode[0] !== 'default' && 'rotate-[45deg]'} origin-[50%_45%] origin-[50% 50%] transition-all duration-200 ease-in-out w-[15px] h-[15px] absolute bottom-[-7px] left-[18px]`}>
              <XIcon strokeWidth={1} />
            </div>
          </div>
        </div>
      </AudioEnhancerBtn>
      <BackdropModal {...backdropModalProps} />
      <VolumeModal {...volumeModalProps} />
    </div>
  );
}

export default AudioEnhancer;

const AudioEnhancerBtn = styled.button<{ $mode: string[] }>`
  .audio-enhance {
    background: ${({ $mode }) => $mode[1]};
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
    }
    transition: background-size 0.5s ease;
    background-size: 100% 100%;
    background-position: 100% 100%;
    &:hover {
      background-size: 200% 200%;
    }
  }
`;
