import styled from 'styled-components';
import Image from 'next/image';
import { AWPlaylistData } from 'src/types/playlistTypes';

interface Props {
  data: AWPlaylistData;
}

function PlaylistDetailInfo({ data } : Props) {
  return (
    <>
      <ImageAndTitle>
        {data.playlistImageUri
          && <Image src={String(data?.playlistImageUri)} width={152} height={130} alt="aw-playlist" className="image" />}
        <div className="pt-[9px]">
          <h2 className="text-base text-darkBlue900 font-medium">듣자마자 반하는</h2>
          <p className="mt-[10px] text-blueGray700 text-sm font-normal">AuraWave</p>
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
  }
`;
