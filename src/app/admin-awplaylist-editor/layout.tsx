import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'AuraWave - admin editor',
  description: 'admin editor',
};

function layout({children}: Props) {
  return (
    <>{children}</>
  )
}

export default layout;