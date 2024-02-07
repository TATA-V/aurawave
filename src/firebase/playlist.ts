import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  AWPlaylistData,
  DeleteAWPlaylistDoc,
  GetAwPlaylistDocs,
  PlaylistData,
  SetUserPlaylistDoc,
  UpdateAWPlaylistDoc,
  setAwPlaylistDoc,
  UpdatePlaylistDoc,
  GetPlaylistDocs,
} from 'src/types/playlistTypes';
import { firestore } from './config';

// 새로운 AuraWave 플레이리스트 정보 등록
// eslint-disable-next-line no-redeclare
export async function setAwPlaylistDoc({ uuid, awplaylistData }: setAwPlaylistDoc) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await setDoc(musicRef, awplaylistData);
}

// AuraWave 플레이리스트 삭제
export async function deleteAwPlaylistDoc({ uuid }: DeleteAWPlaylistDoc) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await deleteDoc(musicRef);
}

// AuraWave 플레이리스트 수정하기
export async function updateAwPlaylistDoc({ uuid, awplaylistData }: UpdateAWPlaylistDoc) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await updateDoc(musicRef, { data: awplaylistData });
}

// AuraWave 플레이리스트 collection 가져오기
const awPlaylistCol = collection(firestore, 'aw_playlist');

// 모든 AuraWave 플레이리스트 가져오기
export async function getAllAwPlaylistDocs() {
  const playlistArr: AWPlaylistData[] = [];

  const querySanpshot = await getDocs(query(awPlaylistCol, orderBy('timestamp', 'desc')));

  querySanpshot.forEach((doc) => {
    playlistArr.push(doc.data() as AWPlaylistData);
  });
  return playlistArr;
}

// AuraWave 플레이리스트 n개를 orderBy에 맞게 가져오기
export async function getAwPlaylistDocs({
  limitNum,
  orderByField,
  orderByDirection,
}: GetAwPlaylistDocs) {
  const playlistArr: AWPlaylistData[] = [];

  const querySanpshot = await getDocs(
    query(awPlaylistCol, orderBy(orderByField, orderByDirection), limit(limitNum)),
  );

  querySanpshot.forEach((doc) => {
    playlistArr.push(doc.data() as AWPlaylistData);
  });
  return playlistArr;
}

// ---------------------------
// ---------------------------

// 새로운 user 플레이리스트 정보 등록
export async function setUserPlaylistDoc({ uuid, playlistData }: SetUserPlaylistDoc) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await setDoc(musicRef, playlistData);
  await updateDoc(musicRef, {
    timestamp: serverTimestamp(),
  });
}

// user 플레이리스트 collection 가져오기
const playlistCol = collection(firestore, 'user_playlist');

// 모든 AuraWave 플레이리스트 가져오기
export async function getAllPlaylistDocs() {
  const playlistArr: PlaylistData[] = [];

  const querySanpshot = await getDocs(query(playlistCol, orderBy('timestamp', 'desc')));

  querySanpshot.forEach((doc) => {
    playlistArr.push(doc.data() as PlaylistData);
  });
  return playlistArr;
}

// user 플레이리스트 n개를 orderBy에 맞게 가져오기
export async function getPlaylistDocs({
  limitNum,
  orderByField,
  orderByDirection,
}: GetPlaylistDocs) {
  const playlistArr: PlaylistData[] = [];

  const querySanpshot = await getDocs(
    query(playlistCol, orderBy(orderByField, orderByDirection), limit(limitNum)),
  );

  querySanpshot.forEach((doc) => {
    playlistArr.push(doc.data() as PlaylistData);
  });

  return playlistArr;
}

// user 플레이리스트 삭제
export async function deletePlaylistDoc(uuid: string) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await deleteDoc(musicRef);
}

// user 플레이리스트 수정하기
export async function updatePlaylistDoc({ uuid, playlistData }: UpdatePlaylistDoc) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await updateDoc(musicRef, { data: playlistData });
}
