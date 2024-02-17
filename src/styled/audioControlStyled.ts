'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HasBottomTab {
  $hasBottomTab: boolean;
}

interface ProgressBarWidth {
  $progressBarWidth: number;
}

interface CurrentTimeWidth {
  $currentTimeWidth: number;
}

const fadeInUp = keyframes`
  from {
    opacity: 0.8;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

export const StyledAudio = styled.audio`
  display: none;
`;

export const AudioControlBarBlock = styled.div<HasBottomTab>`
  animation: ${fadeInUp} 0.2s ease-out;
  width: 100%;
  max-width: 540px;
  height: ${({ $hasBottomTab }) => ($hasBottomTab ? '60px' : '71px')};
  border-radius: 10px 10px 0 0;
  background: linear-gradient(to right, #648b8b, #e38989);
  position: fixed;
  bottom: ${({ $hasBottomTab }) => ($hasBottomTab ? '55px' : '0')};
  z-index: 1;

  @media all and (max-width: 539px) {
    bottom: ${({ $hasBottomTab }) => ($hasBottomTab ? '50px' : '0')};
  }
`;

export const ProgressBarBox = styled.div<CurrentTimeWidth>`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 540px;
  height: 10px;
  border-radius: 50px 50px 0 0;
  overflow: hidden;
`;

export const ProgressBarAndTime = styled.div<CurrentTimeWidth>`
  position: relative;

  .hover-time {
    width: 42px;
    height: 22px;
    color: var(--white-100);
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 2px;
    background-color: #648b8b;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 8px;
    /* left: ${({ $currentTimeWidth }) => $currentTimeWidth - 12}%; */
    left: ${({ $currentTimeWidth }) => $currentTimeWidth - 9}%;
    z-index: 1;
  }
`;

export const ProgressBar = styled.div<ProgressBarWidth>`
  width: 100%;
  height: 2px;
  background-color: var(--gray-70);
  position: relative;
  cursor: pointer;

  &:hover::before,
  &:hover::after {
    height: 5px;
    transition: height 0.25s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    height: 2px;
    z-index: 1;
    width: ${({ $progressBarWidth }) => $progressBarWidth}%;
    transition: width 0.1s ease;
    background-color: var(--dark-green-700);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    height: 2px;
    width: 100%;
    z-index: 1;
    background-color: var(--gray-70);
  }
`;

export const BottomTabMusicPlayer = styled.div`
  padding: 1.2px 16px 12px 16px;
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LeftBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .image {
    width: 38px;
    height: 38px;
    border-radius: 2px;
    object-fit: cover;
    cursor: pointer;
  }

  .details {
    width: 100%;
    padding-left: 13px;
    height: 33px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .title {
    width: calc(100% - 20px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--white-100);
    font-size: 0.9375rem;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
  }

  .composer {
    color: var(--blue-gray-400);
    font-size: 0.8125rem;
    font-weight: 400;
    cursor: pointer;
  }
`;

export const RightBox = styled.div`
  width: 101px;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .i-play {
    font-size: 21px;
  }
  .i-next-play {
    font-size: 18px;
  }
  .i-menu {
    font-size: 13px;
  }
`;

export const SimpleMusicPlayer = styled.div`
  padding: 8px 19px 16px 19px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .image {
    width: 38px;
    height: 38px;
    border-radius: 2px;
    object-fit: cover;
    cursor: pointer;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Controls = styled.div`
  width: 171px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .i-back-music {
    font-size: 21px;
  }

  .i-play {
    font-size: 32px;
    padding-left: 5px;
  }

  .i-next-play {
    font-size: 21px;
  }
`;

export const Option = styled.div`
  position: relative;

  .i-setting {
    font-size: 22px;
    padding-right: 1px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// PlayModeModal
interface PlayMode {
  $playMode: string;
}

interface IsLoop {
  $isLoop: boolean;
}

export const PlayModeModalBlock = styled(motion.ul)<PlayMode & IsLoop>`
  position: absolute;
  bottom: 32px;
  right: 0;
  width: 89px;
  height: 63px;
  border: 1px solid var(--gray-100);
  border-radius: 4px;
  padding: 4px 10px 3px 10px;
  background-color: var(--white-100);
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .option-box {
    width: 67px;
    height: 28px;
    padding-left: 3px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .border-bottom {
    border-bottom: 1px solid var(--gray-50);
  }

  .option-txt {
    font-size: 0.6rem;
    font-weight: 500;
    padding-left: 6px;
    cursor: pointer;
  }

  .loop {
    color: ${({ $isLoop }) => ($isLoop ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
  }

  .shuffle {
    color: ${({ $playMode }) => ($playMode === 'shuffle' ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
  }

  .i-loop {
    font-size: 9.5px;

    &::before {
      color: ${({ $isLoop }) => ($isLoop ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
    }
  }

  .i-shuffle {
    font-size: 9.5px;

    &::before {
      color: ${({ $playMode }) => ($playMode === 'shuffle' ? 'var(--sky-blue-500)' : 'var(--dark-blue-700)')};
    }
  }
`;
