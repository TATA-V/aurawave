import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { SetStateAction } from 'react';
import { auth, storage } from './config';

/**
 * // 이미지 파일 업로드
  const handleUploadImage = () => {
    const props = {
        file: imageFile,
        setState: setImageUri,
        path: 'music_image',
        uuid,
      };
    uploadImage(props);
  };
 */

interface Props {
  file: File | null;
  setState: React.Dispatch<SetStateAction<string>>;
  path: string;
  uuid: string;
}

const uploadImage = ({ file, setState, path, uuid }: Props) => {
  const user = auth.currentUser;
  if (user && file) {
    const metadata = { contentType: file.type };

    const uploadTask = uploadBytesResumable(
      ref(storage, `${path}/${uuid}`), // 저장 경로
      file, // 이미지 파일
      metadata, // 파일 타입
    );

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            // console.log('Upload is paused');
            break;
          case 'running':
            // console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;

          default:
            break;
        }
      },
      () => {
        // 업로드가 성공적으로 완료
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setState(downloadURL);
        });
      },
    );
  }
};

export default uploadImage;
