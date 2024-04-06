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
  description: '소리로 그리는 풍경, 음악으로 힐링하는 공간',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: ['https://firebasestorage.googleapis.com/v0/b/aurawave-nextjs-cd0c8.appspot.com/o/common%2Fshare.png?alt=media&token=0235fbe2-a237-4598-b9f0-a202f70034b7']
  },
  alternates: {
    canonical: 'https://www.aurawave.site',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification': `${process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}`,
    }
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
