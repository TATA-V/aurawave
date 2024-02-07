'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

function ProfileLayout({ children } : Props) {
  return (
    <ProfileLayoutBlock>{children}</ProfileLayoutBlock>
  );
}

export default ProfileLayout;

const ProfileLayoutBlock = styled.div`
  min-height: 100vh;
  background: linear-gradient(to top, #f7f7fa, #ffffff);
  position: relative;
  padding-bottom: 50px;
`;
