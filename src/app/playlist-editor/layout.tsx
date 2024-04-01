import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - 플레이리스트 에디터',
  description: '플레이리스트 에디터',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;