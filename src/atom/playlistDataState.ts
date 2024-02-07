import { PlaylistData } from 'src/types/playlistTypes';
import { atom } from 'recoil';

const DefaultValue: PlaylistData = {
  uuid: '',
  isPublic: false,
  playlistImageUri: '',
  playlistTitle: '',
  description: '',
  musicList: [],
  username: '',
};

const playlistDataState = atom<PlaylistData>({
  key: 'playlistData',
  default: DefaultValue,
});

export default playlistDataState;
