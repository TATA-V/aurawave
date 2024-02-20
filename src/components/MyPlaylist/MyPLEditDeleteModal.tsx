import styled from 'styled-components';
import { motion } from 'framer-motion';
import PencilIcon from 'src/assets/icons/PencilIcon';
import { useRef, useState } from 'react';
import { useClickOutside } from '@reactuses/core';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useParams, useRouter } from 'next/navigation';

function MyPLEditDeleteModal() {
  const [openPL, setOpenPL] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState('');
  const modalRef = useRef<HTMLUListElement>(null);
  useClickOutside(modalRef, () => {
    setOpenPL(false);
  });

  const router = useRouter();
  const { myPlaylistId } = useParams();
  const handleEdit = () => {
    router.push(`/playlist-editor?id=${myPlaylistId}`);
  };

  const handleDelete = async () => {
    setType('플레이리스트삭제');
    setOpenPL(false);
    setOpenModal(true);
  };

  return (
    <>
      <PlaylistModalBlock>
        <motion.button onClick={() => setOpenPL(!openPL)} whileTap={{ scale: 0.9 }} className="pr-[23px]">
          <PencilIcon />
        </motion.button>
        {openPL
          && (
            <motion.ul
              ref={modalRef}
              initial={{ opacity: 0, scale: 0, transformOrigin: '100% 0%' }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="edit-modal text-xs px-[11px] min-w-[130px] flex flex-col justify-center items-center"
            >
              <li>
                <motion.button onClick={handleEdit} whileTap={{ scale: 0.9 }} className="h-[40px] flex justify-center items-center flex-shrink-0">
                  플레이리스트 수정
                </motion.button>
              </li>
              <li>
                <motion.button onClick={handleDelete} whileTap={{ scale: 0.9 }} className="border-top h-[40px] flex justify-center items-center flex-shrink-0">
                  플레이리스트 삭제
                </motion.button>
              </li>
            </motion.ul>
          )}
      </PlaylistModalBlock>
      <CustomModal type={type} open={openModal} setOpen={setOpenModal} />
    </>
  );
}

export default MyPLEditDeleteModal;

const PlaylistModalBlock = styled.div`
  position: relative;
  .edit-modal {
    position: absolute;
    top: 30px;
    right: 20px;
    background-color: #fff;
    border: 1px solid var(--gray-100);
    border-radius: 4px;
  }
  .border-top {
    border-top: 1px solid var(--gray-100);
  }
`;
