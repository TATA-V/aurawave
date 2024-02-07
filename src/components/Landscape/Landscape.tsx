'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { bubblegum } from 'src/fonts/fonts';

import LandscapeJpg from 'src/assets/jpg-file/landscape.jpg';

function Landscape() {
  return (
    <LandscapeBlock>
      <div className="landscape">
        <Image
          className="image"
          width={346.2}
          height={165.2}
          src={LandscapeJpg}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACCAQ8DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBQQD/8QAGBABAQEBAQAAAAAAAAAAAAAAAAEREgL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwDmiK0yKgCiKCiAKAAgAIIBWatSglZq1KKzWa1WaDNZrVZoM1KtZopUKiAAoKggoigogDoqzpqstGs6aDWrrOmg1prOroLpqaaC6azpoLqampoLqWpqWgWs2lqWgWs2lrNopWbS1m0Cs2lqWgampqaK1qammoNaM6aDSs6aDWms6ug6Gms6arDWrrGmg3prOmg1q6xpoN6ms6aDWms6mg1qazqaDWpazaloLalqWs2irazalrNoLazalrNoLazalrNorVqazfTPQN6ax0dA3q6+fR0g+mrr59LoN6axpoOjprOmqy3prGmg3prGmg3prGmiN6axpoN6ms6mg1prGpoNalrOpaDVrNrNqWirazalrF9A1azfTNrNoLfTN9M2olajWpqBVAEF01AF1dZAa6OmQHS01nTWnNrTWdNBvTWNNBvU1nTQa01nU0RvU1nU0GtTWdS0GrUtZtZtBq1m1LWbQW1m1LWbUrWYtrOoI2AAAAAAAAAAAA9umpppXNdXWdNUa01kBrTWQGtTUBF1NQA1NEAtZtWs0C1m1axalazC1kBsAAAAAAAAAAAAAB6gGayogVFAWiiBRUUKIAERFQIlZrVZpVjNZrVZouYyKiqAAAAAAAAAAAAAA9IDkiiKAqKoAqoAKCKgCKgqVmtM1FZrNbrFXFxkVFURRUQUEQUBBQEFAABQAHoAcmRQAUFBQUABABVRABKlBFZrFBcaQBRABABQAEABQAAAAAV//9k="
          alt="landscape"
        />
        <p className={`stars-text ${bubblegum.className}`}>Stars</p>
      </div>
    </LandscapeBlock>
  );
}

export default Landscape;

const LandscapeBlock = styled.div`
  display: flex;
  justify-content: center;

  .landscape {
    width: 348px;
    height: 167px;
    border: 1px solid var(--gray-100);
    border-radius: 7px;
    display: flex;
    justify-content: end;
    align-items: end;
    position: relative;
  }

  .stars-text {
    position: absolute;
    margin: 9px 13px 9px 13px;
    color: var(--white-100);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .image {
    border-radius: 6px;
    display: flex;
    justify-content: center;
  }
`;
