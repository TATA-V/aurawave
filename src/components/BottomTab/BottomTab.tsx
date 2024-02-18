'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import currentTrackState from 'src/atom/currentTrackState';
import MoonBlueSvg from '../../../public/moonBlueSvg.svg';
import MoonGraySvg from '../../../public/moonGraySvg.svg';
import MusicBlueSvg from '../../../public/musicBlueSvg.svg';
import MusicGraySvg from '../../../public/musicGraySvg.svg';
import PeopleBlueSvg from '../../../public/peopleBlueSvg.svg';
import PeopleGraySvg from '../../../public/peopleGraySvg.svg';

function BottomTab() {
  const { isShow } = useRecoilValue(currentTrackState);
  const pathname = usePathname();

  const paths = [
    { id: 1, path: '/', defaultSvg: <MoonGraySvg />, focusSvg: <MoonBlueSvg /> },
    { id: 2, path: '/music', defaultSvg: <MusicGraySvg />, focusSvg: <MusicBlueSvg /> },
    { id: 3, path: '/profile', defaultSvg: <PeopleGraySvg />, focusSvg: <PeopleBlueSvg /> },
  ];

  return (
    <BottomTabNav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="h-[50px] min-w540:h-[55px] px-[45px] min-w540:px-[60px] py-[14px]"
      $isShow={isShow}
    >
      <div className="svg-box">
        {paths.map(({ id, path, defaultSvg, focusSvg }) => (
          <motion.div key={id} whileTap={{ scale: 0.90 }}>
            <Link href={path}>{pathname === path ? focusSvg : defaultSvg}</Link>
          </motion.div>
        ))}
      </div>
    </BottomTabNav>
  );
}

export default BottomTab;

interface IsShow {
  $isShow: boolean;
}

export const BottomTabNav = styled(motion.nav)<IsShow>`
  width: 100%;
  max-width: 540px;
  background-color: var(--white-100);
  box-shadow: ${({ $isShow }) => ($isShow ? null : '0 0 7px rgba(0, 0, 0, 0.12)')};
  position: fixed;
  bottom: 0;
  z-index: 1;

  .svg-box {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
