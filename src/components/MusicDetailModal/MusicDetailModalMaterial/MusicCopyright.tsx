import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import currentTrackState from 'src/atom/currentTrackState';

interface UpdatedLinkData {
  href: string;
  text: string;
}

function MusicCopyright() {
  const [showCopyright, setShowCopyright] = useState(false);
  const [linkData, setLinkData] = useState<UpdatedLinkData[]>([]);
  const { currentMusic } = useRecoilValue(currentTrackState); // 리코일
  const { copyright } = currentMusic;

  useEffect(() => {
    const regex = /<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    const matches = copyright.matchAll(regex);
    const updatedLinkData = [];
    for (const match of matches) {
      const href = match[1];
      const text = match[2];
      updatedLinkData.push({ href, text });
    }
    setLinkData(updatedLinkData);
  }, [copyright]);

  return (
    <MusicCopyrightBlock>
      <button onClick={() => setShowCopyright(!showCopyright)} className="copyright-btn">
        <i className="i-source" />
        <p className="copyright-txt">출처</p>
      </button>
      {showCopyright && (
        <div className="copyright-actual">
          <p className="copyright-actual-txt" dangerouslySetInnerHTML={{ __html: copyright }} />
          {linkData.length > 1 && (
            <p className="copyright-actual-txt">
              Music by{' '}
              <a href={linkData[0].href} target="_blank" rel="noreferrer">
                {linkData[0].text}
              </a>{' '}
              from{' '}
              <a href={linkData[1].href} target="_blank" rel="noreferrer">
                {linkData[1].text}
              </a>
            </p>
          )}
        </div>
      )}
    </MusicCopyrightBlock>
  );
}

export default MusicCopyright;

export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const MusicCopyrightBlock = styled.div`
  padding: 35px 0 9px 0;
  position: relative;
  display: flex;

  .copyright-btn {
    width: 68px;
    height: 29px;
    border: 1px solid var(--gray-100);
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(16, 29, 33, 0.07);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i-source {
    font-size: 11px;
  }

  .copyright-txt {
    color: var(--dark-blue-900);
    font-size: 0.65rem;
    font-weight: 500;
    padding: 1px 0 0 6.62px;
  }

  .copyright-actual {
    min-height: 29px;
    max-width: 268px;
    border: 1px solid var(--gray-100);
    border-radius: 3px;
    padding: 8px 10px 8px 10px;
    box-shadow: 0 2px 8px rgba(16, 29, 33, 0.07);
    animation: ${fadeInRight} 0.15s ease-out;
    position: absolute;
    left: 72px;
    white-space: pre-line;
    word-wrap: break-word;
    background-color: var(--white-100);
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    a {
      color: var(--blue-500);
      text-decoration: none;
    }
  }

  .copyright-actual-txt {
    color: var(--dark-blue-700);
    font-size: 0.58rem;
    font-weight: 500;
    max-width: 248px;
  }
`;
