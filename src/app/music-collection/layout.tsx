import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - 음악 컬렉션',
  description: '음악 컬렉션 보러가기',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;