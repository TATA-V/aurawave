import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - 회원가입',
  description: '회원가입하러 가기',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout