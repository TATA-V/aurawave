import HomeHead from 'src/components/Home/HomeHead';
import HelloText from 'src/components/Home/HelloText';
import Landscape from 'src/components/Landscape/Landscape';
import RecommendPlaylist from 'src/components/Home/RecommendPlaylist';
import NewMusic from 'src/components/Home/NewMusic';
import RecommendMusic from 'src/components/Home/RecommendMusic';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

export default function HomePage() {
  return (
    <FadeInMotion>
      <HomeHead />
      <HelloText />
      <Landscape />
      <RecommendPlaylist />
      <NewMusic />
      <RecommendMusic />
    </FadeInMotion>
  );
}
