import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MyPLEditDeleteModal from 'src/components/MyPlaylist/MyPLEditDeleteModal';

function MyPlaylistHead() {
  const router = useRouter();

  return (
    <GoBackHeadBlok>
      <motion.div whileTap={{ scale: 0.9 }} onClick={() => router.back()} role="button" className="back-btn">
        <i className="i-back" />
      </motion.div>

      <MyPLEditDeleteModal />
    </GoBackHeadBlok>
  );
}

export default MyPlaylistHead;

const GoBackHeadBlok = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  height: 61px;
  background-color: var(--white-100);
  
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .back-btn {
    width: 63px;
    height: 61px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .i-back {
    font-size: 18;
    &::before {
      color: var(--dark-blue-900);
    }
  }
`;
