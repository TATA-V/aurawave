interface Props {
  e: React.MouseEvent<HTMLDivElement>;
  type: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setProgressBarWidth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTimeWidth: React.Dispatch<React.SetStateAction<number>>;
}

// ProgressBar를 클릭하면 클릭한 위치에서 음악을 재생(onClick)
// ProgressBar위에 마우스 올리면 해당 위치의 음악 시간 표시(onMouseMove)
const updateProgressBarWidth = ({
  e,
  type,
  audioRef,
  setProgressBarWidth,
  setCurrentTime,
  setCurrentTimeWidth,
}: Props) => {
  const audio = audioRef.current;
  if (audio) {
    const progressBar = e.currentTarget;
    const clickPositionX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const newTime = (clickPositionX / progressBarWidth) * audio.duration;

    if (type === 'click') {
      audio.currentTime = newTime;
      const newProgressBarWidth = (newTime / audio.duration) * 100;
      setProgressBarWidth(newProgressBarWidth);
    }
    if (type === 'hover') {
      setCurrentTime(newTime);
      const newProgressBarWidth = (newTime / audio.duration) * 100;
      setCurrentTimeWidth(newProgressBarWidth);
    }
  }
};

export default updateProgressBarWidth;
