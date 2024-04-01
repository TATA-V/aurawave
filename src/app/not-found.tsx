import type { Metadata } from "next";
import FadeInMotion from 'src/components/Layout/FadeInMotion';
import NotFound from 'src/components/NotFound/NotFound';

export const metadata: Metadata = {
  title: 'AuraWave :: 페이지를 찾을 수 없습니다',
  description: '페이지를 찾을 수 없습니다',
};

function NotFoundPage() {
  return (
    <FadeInMotion>
      <NotFound />
    </FadeInMotion>
  );
}

export default NotFoundPage;
