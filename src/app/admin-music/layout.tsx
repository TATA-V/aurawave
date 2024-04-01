import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - admin music',
  description: 'admin music',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;