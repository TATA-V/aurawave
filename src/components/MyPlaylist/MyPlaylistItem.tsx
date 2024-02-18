import Image from 'next/image';
import LockIcon from 'src/assets/icons/LockIcon';
import { UserPlaylistData } from 'src/types/playlistTypes';
import styled from 'styled-components';

interface Props {
  item: UserPlaylistData;
}

function MyPlaylistItem({ item } : Props) {
  return (
    <div className="w-full flex gap-[20px] h-[80px]">
      <StyledImage width={95} height={80} src={String(item.playlistImageUri)} alt="album" className="rounded-[15px] object-cover" />
      <div className="w-full flex justify-between items-center pr-[4px]">
        <div className="flex flex-col justify-center">
          <h3 className="font-medium textbase text-darkBlue900">{item.playlistTitle}</h3>
          <p className="my-[9px] text-blueGray700 text-[0.8125rem]">{item.description}</p>
          <span className="text-blueGray500 text-xs mt-[2px]">{item.date}</span>
        </div>
        <LockIcon />
      </div>
    </div>
  );
}

export default MyPlaylistItem;

const StyledImage = styled(Image)`
border: 1px solid var(--gray-100)
`;
