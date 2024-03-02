import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import RecoilProvider from 'src/components/provider/RecoilProvider';
import StyledComponentsRegistry from 'src/components/provider/StyledComponentsRegistry';
import DefaultLayout from 'src/components/Layout/DefaultLayout';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-range-slider-input/dist/style.css';
import './iconfonts.css';
import './globals.css';
import './reset.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'AuraWave - 음악에 감성 한 스푼🥄',
  description: '음악에 곁들어 듣는 힐링 배경음🍃',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: ['/share.png']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilProvider>
      <StyledComponentsRegistry>
        <html lang="ko">
          <body className={inter.className}>
            <DefaultLayout>
              {children}
            </DefaultLayout>
            <Toaster />
          </body>
        </html>
      </StyledComponentsRegistry>
    </RecoilProvider>
  );
}
