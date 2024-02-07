import HomeHead from 'src/components/Home/HomeHead';
import HelloText from 'src/components/Home/HelloText';
import BottomTab from 'src/components/BottomTab//BottomTab';
import Landscape from 'src/components/Landscape/Landscape';
import RecommendPlaylist from 'src/components/Home/RecommendPlaylist';
import NewMusic from 'src/components/Home/NewMusic';
import RecommendMusic from 'src/components/Home/RecommendMusic';

export default function HomePage() {
  return (
    <>
      <HomeHead />
      <HelloText />
      <Landscape />
      <RecommendPlaylist />
      <NewMusic />
      <RecommendMusic />
      <BottomTab />
    </>
  );
}
