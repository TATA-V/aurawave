import Image from 'next/image';
import React from 'react';
import { PlaylistData } from 'src/types/playlistTypes';

interface Props {
  item: PlaylistData;
}

function UserPlatlistItem({ item }: Props) {
  return (
    <div className="w-full flex gap-[20px] h-[80px]">
      <Image width={95} height={80} src={String(item.playlistImageUri)} alt="album" className="border-[1px] border-gray100 rounded-[15px] object-cover" />
      <div className="flex flex-col justify-center">
        <h3 className="font-medium textbase text-darkBlue900">{item.playlistTitle}</h3>
        <p className="my-[9px] text-blueGray700 text-[0.8125rem]">{item.description}</p>
        <span className="text-blueGray500 text-xs">{item.username}</span>
      </div>
    </div>
  );
}

export default UserPlatlistItem;
