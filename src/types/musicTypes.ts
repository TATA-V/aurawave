import { FieldValue, OrderByDirection } from 'firebase/firestore';

export interface MusicData {
  uuid: string;
  imageUri: string;
  musicUri: string;
  title: string;
  composer: string;
  copyright: string;
  timestamp?: FieldValue;
}

export interface SetMusicDoc {
  uuid: string;
  musicData: MusicData;
}

export interface DeleteMudicDoc {
  uuid: string;
}

export interface GetMusicDocs {
  limitNum: number;
  orderByField: string;
  orderByDirection: OrderByDirection;
}

export interface UpdateMusicPhoto {
  uuid: string;
  imageUri: string;
}
