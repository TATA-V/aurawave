import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - 재생목록',
  description: '현재 재생목록 듣기',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;