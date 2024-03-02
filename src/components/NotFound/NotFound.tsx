'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import currentTrackState from 'src/atom/currentTrackState';
import NotFoundLottie from 'src/components/Lottie/NotFoundLottie';
import styled from 'styled-components';

function NotFound() {
  const setCurrentTrack = useSetRecoilState(currentTrackState);

  useEffect(() => {
    setCurrentTrack((data) => ({ ...data, isShow: false }));
  }, []);

  return (
    <div className="flex flex-col items-center w-full pt-32">
      <NotFoundLottie />
      <StyledLink href="/" className="text-[#fff] py-[0.6rem] px-[1.1rem] rounded-[6px] shadow-md bg-gradient-to-r from-[#7ec5ed] to-[#5fc0c0] mt-7 text-sm">홈으로</StyledLink>
    </div>
  );
}

export default NotFound;

const StyledLink = styled(Link)`
  color: #fff;
`;
