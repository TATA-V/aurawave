import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';

const defaultData = {
  uuid: '',
  userUuid: '',
  username: '',
  date: '',
  isPublic: false,
  playlistImageUri: '',
  playlistTitle: '',
  description: '',
  musicList: [],
};

const myPlaylistState = atom<DocumentData | undefined>({
  key: 'myPlaylistState',
  default: defaultData,
});

export default myPlaylistState;
