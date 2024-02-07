import { useRecoilState } from 'recoil';
import currentTrackState, { CurrentMusic } from 'src/atom/currentTrackState';

// const handleLoop = useMusicLoop();
export const useMusicLoop = () => {
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState);
  const { isLoop } = currentMusicAndTrack;

  const handleLoop = () => {
    if (isLoop) {
      setCurrentMusicAndTrack((prev) => ({ ...prev, isLoop: false }));
    } else {
      setCurrentMusicAndTrack((prev) => ({ ...prev, isLoop: true }));
    }
  };

  return handleLoop;
};

// const handleShuffle = useMusicShuffle();
export const useMusicShuffle = () => {
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState);
  const { playMode, currentMusic, currentTrack } = currentMusicAndTrack;

  const shuffle = (array: CurrentMusic[]) => {
    const arr = [...array];
    return arr.sort(() => Math.random() - 0.5);
  };

  const handleShuffle = () => {
    if (playMode === 'shuffle') {
      setCurrentMusicAndTrack((prev) => ({ ...prev, playMode: '', suffleTrack: [] }));
    } else {
      const randomData = shuffle(currentTrack);
      const randomTrack = randomData.filter((track) => track.uuid !== currentMusic.uuid);
      setCurrentMusicAndTrack((prev) => ({
        ...prev,
        playMode: 'shuffle',
        suffleTrack: [...prev.suffleTrack, currentMusic, ...randomTrack],
      }));
    }
  };

  return handleShuffle;
};
