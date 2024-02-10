import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import currentTrackState, { currentTrackDefault } from 'src/atom/currentTrackState';

const useCurrentTrackSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(currentTrackState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? currentTrackDefault : value, setValue] as const;
};

export default useCurrentTrackSSR;
