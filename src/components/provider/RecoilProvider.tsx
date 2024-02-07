'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface Props {
  children: ReactNode;
}

function RecoilProvider({ children }: Props) {
  return (
    <RecoilRoot>{children}</RecoilRoot>
  );
}

export default RecoilProvider;
