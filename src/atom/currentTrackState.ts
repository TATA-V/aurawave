import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface CurrentMusic {
  uuid: string;
  imageUri: string;
  musicUri: string;
  title: string;
  composer: string;
  copyright: string;
}

export interface CurrentTrackState {
  isShow: boolean;
  isPlaying: boolean;
  isLoop: boolean;
  playMode: string;
  showMusicDetail: boolean;
  currentMusic: CurrentMusic;
  currentTrack: CurrentMusic[];
  suffleTrack: CurrentMusic[];
}

export const currentTrackDefault: CurrentTrackState = {
  isShow: false,
  isPlaying: false,
  isLoop: false,
  playMode: '',
  showMusicDetail: false,
  currentMusic: {
    uuid: '',
    imageUri: '',
    musicUri: '',
    title: '',
    composer: '',
    copyright: '',
  },
  currentTrack: [],
  suffleTrack: [],
};

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({ key: 'currentTrack', storage: sessionStorage });

const currentTrackState = atom<CurrentTrackState>({
  key: 'currentTrackState',
  default: currentTrackDefault,
  effects_UNSTABLE: [persistAtom],
});

export default currentTrackState;
