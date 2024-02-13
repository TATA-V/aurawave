'use client';

import styled from 'styled-components';
import Link from 'next/link';

export const InputBox = styled.div`
  position: relative;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 100%;
    height: 50px;
    padding-right: 23px;
    border-bottom: 1px solid var(--dark-blue-500);
    line-height: 50px;
    vertical-align: middle;

    &:focus {
      outline: none;
    }
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 1.09375rem;
    font-weight: 500;
    &::placeholder {
      color: var(--gray-200);
    }
  }

  .i-delete-thin {
    font-size: 16px;
    position: absolute;
    right: 3px;
    top: 17px;
  }

  .margin-top {
    margin-top: 15px;
  }

  .description {
    color: var(--dark-blue-900);
    font-size: 0.8125rem;
    font-weight: 400;

    &::placeholder {
      color: var(--gray-200);
    }
  }
`;

export const AddNewMusic = styled.div`
  padding: 43px 0 60px 0;
  display: flex;
  align-items: center;

  .plus-icon {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    background-color: var(--sky-blue-400);

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.07);
    }
  }

  .i-plus-small {
    font-size: 10px;
  }

  .add-music {
    color: var(--sky-blue-400);
    font-size: 1rem;
    font-weight: 400;
    margin-left: 19px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

// 플레이리스트 이미지

export const PlaylistImageBlock = styled.div`
  padding: 12px 0 24px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  .image-box {
    width: 186px;
    height: 158px;
    position: relative;
  }

  .image {
    width: 186px;
    height: 158px;
    border-radius: 15px;
    object-fit: cover;
  }

  .camera-btn {
    width: 35px;
    height: 35px;
    border: 1px solid rgba(78, 89, 97, 0.5);
    border-radius: 50%;
    background-color: rgba(16, 29, 33, 0.5);
    position: absolute;
    right: 10px;
    top: 114px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i-camera {
    font-size: 17.1px;
    transform: translateY(-0.75px);
  }

  input {
    display: none;
  }
`;

// 토글 버튼(공개 설정)

interface IsPublic {
  $isPublic: boolean;
}
export const PublicOrPrivate = styled.div`
  height: 51px;
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .public-setting {
    display: flex;
    align-items: center;
  }

  .desc-txt {
    color: var(--gray-200);
    font-size: 0.8125rem;
    font-weight: 400;
  }

  .public-txt {
    color: var(--dark-blue-800);
    font-size: 1.09375rem;
    font-weight: 400;
  }
`;

export const ToggleBtn = styled.button<IsPublic>`
  width: 31px;
  height: 15px;
  border-radius: 50px;
  margin-left: 15px;
  background-color: ${({ $isPublic }) => ($isPublic ? 'var(--sky-blue-600)' : 'var(--gray-200)')};
  transition: background-color 0.1s ease;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.07);
  position: relative;

  .circle {
    width: 21px;
    height: 21px;
    border-radius: 50%;
    outline: 0 solid rgba(0, 0, 0, 0);
    background: ${({ $isPublic }) => ($isPublic ? 'linear-gradient(-225deg, #8ecece 10%, #efd9dd 54%, #ff99a7 100%)' : '#E5E5E5')};
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.07);
    position: absolute;
    top: -2.9px;
    left: ${({ $isPublic }) => ($isPublic ? '12.8px' : '-2.8px')};
    transition: left 0.1s ease, outline 0.1s ease;

    &:hover {
      outline: 6px solid rgba(0, 0, 0, 0.05);
    }
  }
`;
