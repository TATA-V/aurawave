import { PlaylistData } from 'src/types/playlistTypes';
import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';

type DefaultValue = PlaylistData & { isEdit: boolean };

const defaultValue: DefaultValue = {
  uuid: '',
  isPublic: false,
  playlistImageUri: '',
  playlistTitle: '',
  description: '',
  musicList: [],
  username: '',
  isEdit: false,
};

const playlistDataState = atom<DefaultValue | DocumentData>({
  key: 'playlistData',
  default: defaultValue,
});

export default playlistDataState;
