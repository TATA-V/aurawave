import toast from 'react-hot-toast';
import ErrorIcon from 'src/assets/icons/ErrorIcon';
import SuccessIcon from 'src/assets/icons/SuccessIcon';

const useToast = () => {
  const successToast = (message: string) => {
    toast(message, { position: 'top-center', icon: <SuccessIcon /> });
  };

  const errorToast = (message: string) => {
    toast(message, { position: 'top-center', icon: <ErrorIcon /> });
  };

  return {
    successToast,
    errorToast,
  };
};

export default useToast;
