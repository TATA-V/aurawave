import { atom } from 'recoil';

interface AudioEnhanceState {
  mode: string[];
  volume: number;
}

const defaultValue = {
  mode: ['default', 'linear-gradient(145deg, #8ECECE 10%, #DDC4C8, #FF99A7)'],
  volume: 0.5,
};

const audioEnhanceState = atom<AudioEnhanceState>({
  key: 'audioEnhanceState',
  default: defaultValue,
});

export default audioEnhanceState;
