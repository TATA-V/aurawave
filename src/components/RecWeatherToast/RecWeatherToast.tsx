'use client'

import { useEffect, useState } from "react";
import useGetWeather from "src/hook/useGetWeather";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  handlePlay: (bgAudioText: string) => void;
}

function RecWeatherToast({ open, handlePlay }: Props) {
  const [bgAudioText, setBgAudioText] = useState('');
  const { weather } = useGetWeather();
  const description = weather?.weather[0].description;

  let temp = '';
  const list = ['모닥불', '시골 여름 밤', '잔잔한 빗소리', '펑펑 쏟아지는 함박눈'];
  useEffect(() => {
    switch(description) {
      case '맑음':
        temp = '모닥불'
        break;
      case '튼구름':
        temp = '모닥불'
        break;
      case '온흐림':
        temp = '시골 여름 밤'
        break;
      case '비':
        temp = '잔잔한 빗소리'
        break;
      case '눈':
        temp = '펑펑 쏟아지는 함박눈'
        break;
        default:
          temp = list[Math.floor(Math.random() * list.length)];
          break;
    }
    setBgAudioText(temp);
  }, [weather])

  return (
    <AnimatePresence>
      {open && description && (
        <>
          <div className="fixed z-10 top-[3.5rem] ml-[20px] md:w-[540px] overflow-hidden">
            <RecWeatherToastBlock
              initial={{ opacity: 0, x: -120  }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, x: -120 }}
              className='flex flex-col justify-center items-center bg-[#fff]'>
                <p className="font-light text-center leading-[1.5rem] text-sm text-darkBlue900">
                  오늘 날씨는  <span className="font-semibold">{`${description}`}</span>이에요.<br/>
                  배경음으로 <span className='font-semibold text-skyBlue400'>{`${bgAudioText}`}</span>은 어떠신가요?
                </p>
                <button onClick={() => handlePlay(bgAudioText)} className="text-[#fff] w-full text-xs py-[0.6rem] px-[1.1rem] rounded-[6px] bg-gradient-to-r from-[#7ec5ed] to-[#5fc0c0] mt-[1.2rem]">배경음 추가</button>
            </RecWeatherToastBlock>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default RecWeatherToast;

const RecWeatherToastBlock = styled(motion.div)`
  padding: 20px 30px;
  border: 1px solid var(--gray-100);
  border-radius: 15px;
`