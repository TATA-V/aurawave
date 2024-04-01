import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave 플레이리스트',
  description: 'AuraWave 플레이리스트 듣기',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;