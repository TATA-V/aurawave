import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import audioEnhanceState, { audioEnhanceDefault } from 'src/atom/audioEnhance';

const useAudioEnhanceSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(audioEnhanceState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? audioEnhanceDefault: value, setValue] as const;
}

export default useAudioEnhanceSSR;