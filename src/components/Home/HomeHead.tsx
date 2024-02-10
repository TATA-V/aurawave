'use client';

import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import userState from 'src/atom/userState';
import defaultProfileJpg from 'src/assets/jpg-file/default-profile.jpg';
import { motion } from 'framer-motion';
import LogoMoonSvg from '../../../public/logoMoonSvg.svg';
import LogoSvg from '../../../public/logoSvg.svg';

function HomeHead() {
  const { photoURL, isLoggedIn } = useRecoilValue(userState);

  return (
    <HomeHeadBlock>
      <LeftBox>
        <LogoMoonSvg />
        <div className="w-[108px] h-[22px]">
          <LogoSvg />
        </div>
      </LeftBox>

      <RightBox whileTap={{ scale: 0.9 }}>
        <Link href="/profile">
          <Image
            className="image"
            width={33}
            height={33}
            alt="user profile"
            src={isLoggedIn && photoURL !== null ? photoURL : defaultProfileJpg}
          />
        </Link>
      </RightBox>
    </HomeHeadBlock>
  );
}

export default HomeHead;

const HomeHeadBlock = styled.header`
  height: 61px;
  padding: 14px 20px 14px 20px;
  background-color: var(--white-100);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 135px;
  display: flex;
  justify-content: space-between;
  align-items: 'center';
  user-select: none;

  .logo-text {
    color: var(--dark-blue-900);
    font-size: 1.75rem;
    display: flex;
    align-items: center;
  }
`;

const RightBox = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .i-bell {
    color: var(--dark-blue-900);
    font-size: 21px;
    display: flex;
  }

  .image {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    object-fit: cover;
    display: flex;
  }
`;
