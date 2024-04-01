import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - 내 플레이리스트',
  description: '내 플레이리스트 보러가기',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;