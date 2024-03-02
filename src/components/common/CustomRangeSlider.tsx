'use client';

import RangeSlider from 'react-range-slider-input';
import { useRecoilValue } from 'recoil';
import audioEnhanceState from 'src/atom/audioEnhanceState';
import styled from 'styled-components';

interface Props {
  handleRange: (values: number[]) => void;
  mode?: 'horizontal' | 'vertical';
}

function CustomRangeSlider({ handleRange, mode = 'horizontal' } : Props) {
  const { volumeValues, bgVolumeValues } = useRecoilValue(audioEnhanceState)

  return (
    <>
      {mode === 'horizontal' && (
        <HorizontalRange>
          <RangeSlider
            defaultValue={volumeValues}
            thumbsDisabled={[true, false]}
            rangeSlideDisabled
            onInput={handleRange}
          />
        </HorizontalRange>
      )}
      {mode === 'vertical' && (
        <VerticalRange>
          <RangeSlider
            orientation="vertical"
            defaultValue={bgVolumeValues}
            thumbsDisabled={[false, true]}
            rangeSlideDisabled
            onInput={handleRange}
          />
        </VerticalRange>
      )}

    </>
  );
}

export default CustomRangeSlider;

const HorizontalRange = styled.div`
  .single-thumb .range-slider__thumb[data-lower] {
    width: 0;
  }
  .range-slider {
    width: 70px;
    height: 5px;
  }
  .range-slider__range {
    width: 50%;
    background: linear-gradient(to bottom, #7A99A4, #2F7381);
    border-radius: 30px 0px 0px 30px;
  }
  .range-slider__thumb {
    width: 13px;
    height: 13px;
    border-radius: 50%;
  }
  .range-slider__thumb[data-lower] {
    width: 0;
    display: none;
  }
  .range-slider__thumb[data-upper] {
    background: radial-gradient(#7A99A4, #2F7381)
  }
`;

const VerticalRange = styled.div`
  .single-thumb .range-slider__thumb[data-upper] {
    height: 0;
  }
  .range-slider {
    width: 3.8px;
    height: 85px;
  }
  .range-slider__range {
    height: 50%;
    background: linear-gradient(to bottom, #7A99A4, #2F7381);
    border-radius: 0 0 30px 30px;
  }
  .range-slider__thumb {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  .range-slider__thumb[data-upper] {
    height: 0;
    display: none;
  }
  .range-slider__thumb[data-lower] {
    background: radial-gradient(#7A99A4, #2F7381)
  }
`;
