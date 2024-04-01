import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - 프로필',
  description: '프로필 보러가기',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;