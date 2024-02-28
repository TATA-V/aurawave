import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface AudioEnhanceState {
  mode: string[];
  volume: number;
  volumeValues: number[];
  bgVolumeValues: number[];
}

export const audioEnhanceDefault = {
  mode: ['default', 'linear-gradient(145deg, #8ECECE 10%, #DDC4C8, #FF99A7)'],
  volume: 0.5,
  volumeValues: [0, 50],
  bgVolumeValues: [50, 100],
};

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({ key: 'audioEnhance', storage: sessionStorage });

const audioEnhanceState = atom<AudioEnhanceState>({
  key: 'audioEnhanceState',
  default: audioEnhanceDefault,
  effects_UNSTABLE: [persistAtom],
});

export default audioEnhanceState;
