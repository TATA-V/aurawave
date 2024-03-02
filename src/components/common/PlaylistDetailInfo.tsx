import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  data: DocumentData;
}

function PlaylistDetailInfo({ data } : Props) {
  const pathname = usePathname();
  const path = pathname.split('/');
  const isAwPlaylistPage = path[1] === 'aw-playlist';

  return (
    <>
      <ImageAndTitle>
        {data.playlistImageUri && (
          <div className='w-[152px] h-[130px] rounded-[15px] overflow-hidden'>
            <LazyLoadImage effect="blur" src={String(data?.playlistImageUri)} width={152} height={130} alt="aw-playlist" className="image" />
          </div>)}
        <div className="pt-[9px]">
          <h2 className="text-base text-darkBlue900 font-medium">{data.playlistTitle}</h2>
          <div className="flex flex-col justify-between h-[85px]">
            <p className="mt-[10px] text-blueGray700 text-sm font-normal">{isAwPlaylistPage ? 'AuraWave' : data.description}</p>
            <p className="mt-[5px] text-blueGray500 text-xs font-normal">{(!isAwPlaylistPage && data.username) && data.username}</p>
          </div>
        </div>
      </ImageAndTitle>
      <p className="mt-[21px] text-[0.8125rem] text-blueGray700">{data?.musicList.length}곡</p>
    </>
  );
}

export default PlaylistDetailInfo;

const ImageAndTitle = styled.div`
  display: flex;
  gap: 19px;

  .image {
    width: 152px;
    height: 130px;
    border-radius: 15px;
    border: 1px solid var(--gray-100);
    object-fit: cover;
  }
`;
