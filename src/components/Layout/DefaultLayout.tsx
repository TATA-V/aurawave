'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import useAuthentication from 'src/hook/useAuthentication';
import formatDateToYYYYMMDD from 'src/utils/formatDateToYYYYMMDD';
import playlistDataState from 'src/atom/playlistDataState';
import { usePathname } from 'next/navigation';
import AudioControlBar from 'src/components/AudioControlBar/AudioControlBar';
import BottomTab from 'src/components/BottomTab/BottomTab';
import useCurrentTrackSSR from 'src/hook/useCurrentTrackSSR';

interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  const [{ isShow, showMusicDetail }, _] = useCurrentTrackSSR();
  const setPlaylistData = useSetRecoilState(playlistDataState);
  const pathname = usePathname();
  const HideBottomTab = showMusicDetail || ['/soundtrack', '/login', '/signup', '/music-collection'].includes(pathname);

  useAuthentication();

  useEffect(() => {
    const id = uuidv4(); // uuid 생성
    const formattedDate = formatDateToYYYYMMDD(); // 현재 날짜
    setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
  }, [setPlaylistData]);

  return (
    <LayoutBlock>
      <LayoutStyle $isShow={isShow}>
        {children}
        {isShow && <AudioControlBar />}
        {!HideBottomTab && <BottomTab />}
      </LayoutStyle>
    </LayoutBlock>
  );
}

export default DefaultLayout;

interface IsShow {
  $isShow: boolean;
}

const LayoutBlock = styled.div`
  min-height: 100vh;
  background-color: rgb(233, 236, 239);
  font-family: 'Noto Sans KR', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutStyle = styled.div<IsShow>`
  width: 540px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  padding-bottom: ${({ $isShow }) => ($isShow ? '61px' : '0')};

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
