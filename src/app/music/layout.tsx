import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - 음악',
  description: '음악 들으러 가기',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;