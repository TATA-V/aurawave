import { useRecoilState } from 'recoil';
import currentTrackState from 'src/atom/currentTrackState';
import { MusicData } from 'src/types/musicTypes';

const useMusicPlay = () => {
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { currentTrack, suffleTrack } = currentMusicAndTrack;

  const musicPlay = (el: MusicData) => {
    const isUuidInCurrentTrack = currentTrack.some((track) => track.uuid === el.uuid);

    setCurrentMusicAndTrack((prev) => ({
      ...prev,
      isShow: true,
      isPlaying: true,
      currentMusic: {
        uuid: el.uuid,
        imageUri: el.imageUri,
        musicUri: el.musicUri,
        title: el.title,
        composer: el.composer,
        copyright: el.copyright,
      },
    }));

    // musicTrack배열에 현재 클릭한 음악이 없다면
    if (!isUuidInCurrentTrack) {
      setCurrentMusicAndTrack((prev) => ({
        ...prev,
        currentTrack: [
          ...prev.currentTrack,
          {
            uuid: el.uuid,
            imageUri: el.imageUri,
            musicUri: el.musicUri,
            title: el.title,
            composer: el.composer,
            copyright: el.copyright,
          },
        ],
      }));
      if (suffleTrack.length !== 0) {
        setCurrentMusicAndTrack((prev) => ({
          ...prev,
          suffleTrack: [
            ...prev.suffleTrack,
            {
              uuid: el.uuid,
              imageUri: el.imageUri,
              musicUri: el.musicUri,
              title: el.title,
              composer: el.composer,
              copyright: el.copyright,
            },
          ],
        }));
      }
    }
  };

  return musicPlay;
};

export default useMusicPlay;
