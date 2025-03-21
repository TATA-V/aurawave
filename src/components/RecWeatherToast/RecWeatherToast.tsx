'use client';

import { SetStateAction, useEffect, useState, Dispatch } from 'react';
import useGetWeather from 'src/hook/useGetWeather';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handlePlay: (bgAudioText: string) => void;
}

function RecWeatherToast({ open, setOpen, handlePlay }: Props) {
  const [bgAudioText, setBgAudioText] = useState('');
  const { weather } = useGetWeather();
  const description = weather?.weather[0].description;
  const descArr = description?.split(' ');

  let temp = '';
  const list = ['모닥불', '시골 여름밤', '잔잔한 빗소리', '펑펑 쏟아지는 함박눈'];
  useEffect(() => {
    if (!descArr) return;
    if (descArr.includes('맑음')) {
      temp = '모닥불';
    } else if (descArr.includes('튼구름') || descArr.includes('구름')) {
      temp = '모닥불';
    } else if (descArr.includes('온흐림') || descArr.includes('흐림')) {
      temp = '모닥불';
    } else if (descArr.includes('비')) {
      temp = '잔잔한 빗소리';
    } else if (descArr.includes('눈')) {
      temp = '펑펑 쏟아지는 함박눈';
    } else {
      temp = list[Math.floor(Math.random() * list.length)];
    }
    setBgAudioText(temp);
  }, [weather]);

  const handleAddBackMusic = () => {
    setOpen(false);
    handlePlay(bgAudioText);
  };

  return (
    <AnimatePresence>
      {open && description && (
        <>
          <div className="fixed z-10 top-[3.5rem] ml-[20px] md:w-[600px] overflow-hidden">
            <RecWeatherToastBlock
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, x: -120 }}
              className="flex flex-col justify-center items-center bg-[#fff]"
            >
              <p className="font-light text-center leading-[1.5rem] text-sm text-darkBlue900">
                오늘 날씨는  <span className="font-semibold">{`${description}`}</span>이에요.<br />
                배경음으로 <span className="font-semibold text-skyBlue400">{`${bgAudioText}`}</span>은 어떠신가요?
              </p>
              <button onClick={handleAddBackMusic} className="text-[#fff] w-full text-xs py-[0.6rem] px-[1.1rem] rounded-[6px] bg-gradient-to-r from-[#7ec5ed] to-[#5fc0c0] mt-[1.2rem]">
                배경음 추가
              </button>
            </RecWeatherToastBlock>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default RecWeatherToast;

const RecWeatherToastBlock = styled(motion.div)`
  padding: 20px 30px;
  border: 1px solid var(--gray-100);
  border-radius: 15px;

  @media all and (max-width: 530px) {
    max-width: 270px;
  }
`;
