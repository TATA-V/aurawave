import MusicLayout from 'src/components/Layout/MusicLayout';
import BottomTab from 'src/components/BottomTab/BottomTab';
import MusicHead from 'src/components/Music/MusicHead';
import MusicSection from 'src/components/Music/MusicSection';
import AwPlaylistSection from 'src/components/Music/AwPlaylistSection';
import MyPlaylistSection from 'src/components/Music/MyPlaylistSection';
import UserPlaylistSection from 'src/components/Music/UserPlaylistSection';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function MusicPage() {
  return (
    <FadeInMotion>
      <MusicLayout>
        <MusicHead />
        <MusicSection />
        <AwPlaylistSection />
        <MyPlaylistSection />
        <UserPlaylistSection />
      </MusicLayout>
    </FadeInMotion>
  );
}

export default MusicPage;
