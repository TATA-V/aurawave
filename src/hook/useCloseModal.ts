import React, { useEffect } from 'react';

interface Props {
  modalRef: React.RefObject<any>;
  state: boolean;
  setState: React.Dispatch<any>;
}

const useCloseModal = ({ modalRef, state, setState }: Props) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (state && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setState(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [modalRef, state, setState]);
};

export default useCloseModal;
