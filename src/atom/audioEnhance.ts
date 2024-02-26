import { atom } from 'recoil';

interface AudioEnhanceState {
  volume: number;
}

const defaultValue = {
  volume: 0.5,
};

const audioEnhanceState = atom<AudioEnhanceState>({
  key: 'audioEnhanceState',
  default: defaultValue,
});

export default audioEnhanceState;
