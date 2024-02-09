import AddMusicToPlaylist from 'src/components/AddMusicToPlaylist/AddMusicToPlaylist';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

function AddMusicPage() {
  return (
    <FadeInMotion>
      <AddMusicToPlaylist />
    </FadeInMotion>
  );
}

export default AddMusicPage;
