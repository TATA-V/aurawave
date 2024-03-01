import { AWPlaylistData } from 'src/types/playlistTypes';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  el: AWPlaylistData;
}

function AwPlaylistItem({ el } : Props) {
  return (
    <PlaylistItem key={el.uuid}>
      <Image
        className="image"
        width={143}
        height={143}
        src={String(el.playlistImageUri)}
        alt="aurawave playlist"
      />
      <div className="details">
        <span className="title">{el.playlistTitle}</span>
        <span className="description">{el.description}</span>
      </div>
    </PlaylistItem>
  );
}

export default AwPlaylistItem;

const PlaylistItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .image {
    width: 100%;
    height: 143px;
    border: 1px solid var(--gray-100);
    border-radius: 15px;
    object-fit: cover;
  }

  .details {
    height: 33px;
    margin: 11px 0 0 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 500;
  }

  .description {
    height: 12px;
    color: var(--dark-blue-700);
    font-size: 0.6875rem;
    font-weight: 400;
  }
`;
