import Image from 'next/image';
import React from 'react';
import { PlaylistData } from 'src/types/playlistTypes';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  item: PlaylistData;
}

function UserPlaylistItem({ item }: Props) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full flex gap-[20px] h-[80px]"
    >
      <StyledImage width={95} height={80} src={String(item.playlistImageUri)} alt="album" className="rounded-[15px] object-cover" />
      <div className="flex flex-col justify-center">
        <h3 className="font-medium textbase text-darkBlue900">{item.playlistTitle}</h3>
        <p className="my-[9px] text-blueGray700 text-[0.8125rem]">{item.description}</p>
        <span className="text-blueGray500 text-xs">{item.username}</span>
      </div>
    </motion.li>
  );
}

export default UserPlaylistItem;

const StyledImage = styled(Image)`
  border: 1px solid var(--gary-100)
`;
