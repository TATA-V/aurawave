'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import a2hsBg from '@/public/png/a2hs-bg.png';
import CustomModal from '../CustomModal/CustomModal';

function AddToHomeScreen() {
  const [openModal, setOpenModal] = useState(false);
  const modalProps = { open: openModal, setOpen: setOpenModal, type: 'A2HS' };

  return (
    <>
      <AddToHomeScreenBlock onClick={() => setOpenModal(!openModal)} className="px-[20px] pb-[15px] cursor-pointer">
        <div className="relative bg-[#505A5D] overflow-hidden w-full rounded-[8px] h-[70px]">
          <Image placeholder="blur" className="w-full h-[71px] rounded-[8px] object-cover absolute top-0 left-0" src={a2hsBg} alt="a2hs-bg" layout="fill" objectFit="cover" />
          <div className="h-full w-full flex items-center px-[20px]">
            <p className="font-light text-[#fff] text-base">
              지금 바로 AuraWave를 <span className="font-medium">홈 화면에 추가</span>하세요
            </p>
            <div className="text-white rotate-[-90deg] mt-[1.5px] ml-[10px] flex items-center h-full">
              <i className="i-down text-[9px] text-white" />
            </div>
          </div>
        </div>
      </AddToHomeScreenBlock>
      <CustomModal {...modalProps} />
    </>
  );
}

export default AddToHomeScreen;

const AddToHomeScreenBlock = styled.div`
  .i-down::before {
    color: white;
  }
`;
