'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

function MusicLayout({ children }: Props) {
  return (
    <MusicLayoutBlock>{children}</MusicLayoutBlock>
  );
}

export default MusicLayout;

const MusicLayoutBlock = styled.div`
  padding-bottom: 75px;
`;
