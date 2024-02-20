import {
  collection,
  deleteDoc,
  doc,
  getDoc,
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
import { MusicData } from 'src/types/musicTypes';
import { auth, firestore } from './config';
import { getUserInfo, updateUserAllPlaylists } from './user';

// 새로운 AuraWave 플레이리스트 정보 등록
// eslint-disable-next-line no-redeclare
export async function setAwPlaylistDoc({ uuid, awplaylistData }: setAwPlaylistDoc) {
  if (uuid && awplaylistData) {
    const musicRef = doc(firestore, 'aw_playlist', uuid);
    await setDoc(musicRef, awplaylistData);
  }
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

// 하나의 플레이리스트 정보 가져오기
export async function getOneAwPlaylist(uuid: string) {
  const awDocRef = doc(firestore, 'aw_playlist', uuid);
  const awDocSnapshot = await getDoc(awDocRef);
  const data = awDocSnapshot.data();
  return data as AWPlaylistData;
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

// 모든 user 플레이리스트 가져오기
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

const user = auth.currentUser;

// 하나의 user 플레이리스트 정보 가져오기
export async function getOneMusicPlaylistInfo(uuid: string) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  const musicDocSnapshot = await getDoc(musicRef);
  const musicData = musicDocSnapshot.data();
  if (!musicData) return;
  return musicData;
}

// 하나의 user 플레이리스트의 musicList 가져오기
export async function getOneMusicPlaylist(uuid: string) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  const musicDocSnapshot = await getDoc(musicRef);
  const musicData = musicDocSnapshot.data();
  if (!musicData) return;
  return musicData.musicList;
}

// user 플레이리스트 삭제
export async function deletePlaylistDoc(uuid: string) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await deleteDoc(musicRef);

  // if (!user) return;
  // const userData = await getUserInfo(user.uid);
  // if (!userData) return;
  // const updatePlaylists = userData.playlists?.filter((el) => el.uuid !== uuid);
  // if (!updatePlaylists) return;
  // await updateUserAllPlaylists({ uuid: user.uid, playlistsData: updatePlaylists });
}

// user 플레이리스트 수정하기
export async function updatePlaylistDoc({ uuid, playlistData }: UpdatePlaylistDoc) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  const data = await getOneMusicPlaylistInfo(uuid);
  await updateDoc(musicRef, { ...data, ...playlistData });

  // if (!user) return;
  // const userData = await getUserInfo(user.uid);
  // if (!userData) return;
  // const updateUserData = userData.playlists?.map((el) => {
  //   if (el.uuid === uuid) {
  //     return playlistData;
  //   }
  //   return el;
  // });
  // if (!updateUserData) return;
  // await updateUserAllPlaylists({ uuid: user.uid, playlistsData: updateUserData });
}

// user 플레이리스트에 하나의 음악 추가
export async function addOneMusicToPlaylist(uuid: string, music: MusicData) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  const musicData = await getOneMusicPlaylist(uuid);
  const exist = musicData.some((item: MusicData) => item.uuid === music.uuid);
  if (!exist) {
    await updateDoc(musicRef, { musicList: [...musicData, music] });
  }

  // if (!user) return;
  // const userData = await getUserInfo(user.uid);
  // if (!userData) return;
  // const updateUserData = userData.playlists?.map((el) => {
  //   if (el.uuid === uuid) {
  //     const musicList = Array.isArray(el.musicList) ? el.musicList : [];
  //     const exist = musicList.some((item) => item.uuid === music.uuid);
  //     if (!exist) {
  //       return { ...el, musicList: [...musicList, music] };
  //     }
  //     return el;
  //   }
  //   return el;
  // });
  // if (!updateUserData) return;
  // await updateUserAllPlaylists({ uuid: user.uid, playlistsData: updateUserData });
  return exist;
}

// user 플레이리스트에 하나의 음악 삭제
export async function deleteOneMusicToPlaylist(uuid: string, music: MusicData) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  const musicData = await getOneMusicPlaylist(uuid);
  if (!musicData) return;
  const updateMusicData = musicData.filter((el: MusicData) => el.uuid !== music.uuid);
  await updateDoc(musicRef, { musicList: updateMusicData });

  // if (!user) return;
  // const userData = await getUserInfo(user.uid);
  // if (!userData) return;
  // const updateUserData = userData.playlists?.map((el) => {
  //   if (el.uuid === uuid) {
  //     return { ...el, musicList: updateMusicData };
  //   }
  //   return el;
  // });
  // if (!updateUserData) return;
  // await updateUserAllPlaylists({ uuid: user.uid, playlistsData: updateUserData });
}
