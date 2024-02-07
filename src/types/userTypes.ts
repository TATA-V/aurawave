import { UserPlaylistData } from './playlistTypes';

export interface SetUserDoc {
  uuid: string;
  userData: {
    uuid: string;
    email: string;
    username: string;
    photoURL?: string;
  };
}

export interface UserData {
  uuid: string;
  email: string;
  username: string;
  photoURL?: string;
  playlists?: UserPlaylistData[];
}

export interface UpdateUserDoc {
  uuid: string;
  photoURL: string;
}

export interface UpdateUserName {
  uuid: string;
  username: string;
}

export interface UpdateUserPlaylists {
  uuid: string;
  playlistData: UserPlaylistData;
}
