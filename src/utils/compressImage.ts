import imageCompression from 'browser-image-compression';

const compressImage = (file: File) => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  return imageCompression(file, options);
};

export default compressImage;
